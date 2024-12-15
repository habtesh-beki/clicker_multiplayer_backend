import { socketGlobals } from "../../global/socket.global";

export const resultEmitter = (
  result: "lost" | "won",
  message: "You have lost." | "You have won.",
  userId: string,
  winnerId: string
) => {
  const socket = socketGlobals.sockets.get(userId);

  if (!socket) return;

  if (result === "lost") return socket.emit(result, { message: message + " " + "Winner ID: " + winnerId });

  socket.emit(result, message);
};
