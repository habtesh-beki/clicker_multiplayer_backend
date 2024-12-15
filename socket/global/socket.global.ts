import { Socket } from "socket.io";

interface SocketGlobals {
  sockets: Map<string, Socket>;
  socketIDs: Array<string>;
}
export const socketGlobals: SocketGlobals = { sockets: new Map<string, Socket>(), socketIDs: [] };
