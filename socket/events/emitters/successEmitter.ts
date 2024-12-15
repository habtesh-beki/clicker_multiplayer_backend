import { socketGlobals } from "../../global/socket.global";

export const successEmitter = (userId: string) => {
  const socket = socketGlobals.sockets.get(userId);

  if (!socket) return;

  socket.emit("connection_success", { connected: true });
};
