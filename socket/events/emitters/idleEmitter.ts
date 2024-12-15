import { SocketServer } from "../../Socket";

export const idleEmitter = (gameID: string) => {
  const server = SocketServer.getServer();

  if (!server) return;

  server.to(gameID).emit("game_idle_limit");
};
