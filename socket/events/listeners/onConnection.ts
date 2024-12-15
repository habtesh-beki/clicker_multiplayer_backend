import { Socket } from "socket.io";
import { onSomething } from "./onSomething";
import { successEmitter } from "../emitters/successEmitter";

export const onConnection = (socket: Socket) => {
  successEmitter(socket.id);
  socket.on("something", onSomething);
};
