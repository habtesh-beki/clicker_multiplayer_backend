import { socketGlobals } from "../../global/socket.global";
import { GameStatus } from "../../../shared/types/gameStatus";
import { SocketServer } from "../../Socket";

export const gameStatusEmitter = (gameStatus: GameStatus, gameID: string) => {
  const server = SocketServer.getServer();

  if (!server) return;

  server.to(gameID).emit("player_click_activated", { gameStatus });
};
