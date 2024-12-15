import { socketGlobals } from "../../global/socket.global";

export const tokenEmitter = (token: string, userId: string) => {
  const socket = socketGlobals.sockets.get(userId);
  socket?.emit("token", { token });
};
