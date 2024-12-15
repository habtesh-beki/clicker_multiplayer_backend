import { Game } from "../../../game/Game";
import { games } from "../../global/app.global";
import { onlinePlayers } from "../../global/player.global";
import { socketGlobals } from "../../global/socket.global";
import { SocketPlayer } from "../../types/player";
import { errorEmitter } from "../emitters/errorEmitter";

export const onPlay = (player: SocketPlayer) => {
  // if player id is missing ignore request
  if (!player.id) return errorEmitter("Player id is missing.");

  // if player is already in another game
  if (player.gameId) return errorEmitter("Already in another game.", player.id);

  const socketIDsLength = socketGlobals.socketIDs.length;
  if (socketIDsLength === 1) return errorEmitter("You are the only one online at the moment.", player.id);

  let anotherPlayer: SocketPlayer | undefined;

  for (let id of socketGlobals.socketIDs) {
    if (id === player.id) continue;

    const player2 = onlinePlayers.get(id);
    if (!player2) return;

    if (player2.gameId) continue;

    anotherPlayer = player2;
  }

  if (!anotherPlayer) return errorEmitter("No other available players found.", player.id);

  const player1Socket = socketGlobals.sockets.get(player.id);
  if (!player1Socket) return errorEmitter("Couldn't find your socket.", player.id);

  const player2Socket = socketGlobals.sockets.get(anotherPlayer.id);
  if (!player2Socket) return errorEmitter("Couldn't find your socket.", anotherPlayer.id);

  const gameRoom = new Game(player.id, anotherPlayer.id);

  player.gameId = gameRoom.name;
  player.progress = gameRoom.players.get(player.id)?.playerProgress ?? 50;
  player1Socket.join(gameRoom.name);

  onlinePlayers.set(player.id, player);

  anotherPlayer.gameId = gameRoom.name;
  anotherPlayer.progress = gameRoom.players.get(anotherPlayer.id)?.playerProgress ?? 50;
  player2Socket.join(gameRoom.name);

  onlinePlayers.set(anotherPlayer.id, anotherPlayer);

  games.set(gameRoom.name, gameRoom);
};
