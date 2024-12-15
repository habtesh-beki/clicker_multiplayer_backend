import { ExtendedError, Socket } from "socket.io";
import { onlinePlayers } from "../global/player.global";
import { SocketPlayer } from "../types/player";
import { socketGlobals } from "../global/socket.global";

export const setGlobals = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const userId = socket.id ?? "";
  socketGlobals.sockets.set(userId, socket);
  socketGlobals.socketIDs.push(userId);
  const player = onlinePlayers.get(userId);

  if (!player) {
    const newPlayer: SocketPlayer = {
      id: userId,
      gameId: undefined,
      progress: undefined,
    };
    onlinePlayers.set(userId, newPlayer);
  }

  return next();
};
