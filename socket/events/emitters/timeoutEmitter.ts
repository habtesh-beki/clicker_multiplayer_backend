import { SocketServer } from "../../Socket";

export const timeoutEmitter = (gameID: string) => {
  const server = SocketServer.getServer();

  if (!server) return;

  server.to(gameID).emit("game_timedout");
};
