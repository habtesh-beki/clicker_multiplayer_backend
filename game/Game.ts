import { GameStatus } from "../shared/types/gameStatus";
import { idleEmitter } from "../socket/events/emitters/idleEmitter";
import { timeoutEmitter } from "../socket/events/emitters/timeoutEmitter";
import { games } from "../socket/global/app.global";
import { PlayerClickedReturn } from "./types/playerClickedReturn";

export class Game {
  name: string = "";
  idleTime: number = 20000;
  gameTimeout: NodeJS.Timeout = setTimeout(this.timeoutHandler, 3600000);
  idleRemoverTimeout!: NodeJS.Timeout;
  players!: GameStatus;

  constructor(player1Id: string, player2Id: string) {
    this.name = `${player1Id}-${player2Id}`;
    this.players.set(player1Id, { playerId: player1Id, playerProgress: 50 });
    this.players.set(player2Id, { playerId: player2Id, playerProgress: 50 });
    this.idleRemoverTimeout = setTimeout(this.idleHandler, this.idleTime);
  }

  timeoutHandler() {
    timeoutEmitter(this.name);
    this.endGame();
  }

  idleHandler() {
    idleEmitter(this.name);
    this.endGame();
  }

  endGame() {
    clearTimeout(this.gameTimeout);
    clearTimeout(this.idleRemoverTimeout);
    games.delete(this.name);
  }

  playerClicked(playerId: string): PlayerClickedReturn | undefined {
    clearTimeout(this.idleRemoverTimeout);
    this.idleRemoverTimeout = setTimeout(this.endGame, this.idleTime);

    const clickedPlayer = this.players.get(playerId);
    if (!clickedPlayer) return;
    clickedPlayer.playerProgress = clickedPlayer.playerProgress + 10;

    const notClicked = Array.from(this.players.keys()).filter((key) => key !== clickedPlayer.playerId)[0];

    const notClickedPlayer = this.players.get(notClicked);

    if (!notClickedPlayer) return;

    notClickedPlayer.playerProgress = notClickedPlayer.playerProgress - 10;

    if (clickedPlayer.playerProgress === 100) {
      return {
        gameStatus: this.players,
        winnerId: clickedPlayer.playerId,
        looserId: notClickedPlayer.playerId,
      };
    } else {
      return {
        gameStatus: this.players,
        winnerId: undefined,
        looserId: undefined,
      };
    }
  }
}
