import { games } from "../../global/app.global";
import { onlinePlayers } from "../../global/player.global";
import { SocketPlayer } from "../../types/player";
import { errorEmitter } from "../emitters/errorEmitter";
import { gameStatusEmitter } from "../emitters/gameStatusEmitter";
import { resultEmitter } from "../emitters/resultEmitter";

export const onClick = (player: SocketPlayer) => {
  if (!player.id) return errorEmitter("No player id found.");

  if (!player.gameId) return errorEmitter("You seem not to be in a game.", player.id);

  const game = games.get(player.gameId);

  if (!game) {
    player.gameId = undefined;
    onlinePlayers.set(player.id, player);
    return errorEmitter("Your game seems to have been terminated.", player.id);
  }

  const playerClickedReturn = game.playerClicked(player.id);
  if (!playerClickedReturn) return errorEmitter("Your click has been ignored", player.id);

  const { gameStatus, winnerId, looserId } = playerClickedReturn;

  gameStatusEmitter(gameStatus, game.name);

  if (!winnerId || !looserId) return;

  resultEmitter("won", "You have won.", winnerId, winnerId);
  resultEmitter("lost", "You have lost.", looserId, looserId);
};
