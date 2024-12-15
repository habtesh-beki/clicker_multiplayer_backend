import { socketGlobals } from "../../global/socket.global";

export const errorEmitter = (message: string, userId?: string) => {
  if (!userId) return console.log(message);
  const socket = socketGlobals.sockets.get(userId);

  if (!socket) return;

  socket.emit("error", { message: message });
};
