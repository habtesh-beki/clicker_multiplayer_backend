import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { onConnection } from "./events/listeners/onConnection";
import { setGlobals } from "./middleware/setGlobals";

class SocketServer extends Server {
  private static server: SocketServer | null = null;

  private constructor(httpServer: HttpServer) {
    super(httpServer, {
      cors: {
        origin: "*",
      },
    });

    this.use(setGlobals);

    this.on("connection", onConnection);
  }

  public static setServer(httpServer: HttpServer): SocketServer {
    if (SocketServer.server === null) {
      SocketServer.server = new SocketServer(httpServer);
    }

    return SocketServer.server;
  }

  public static getServer(): SocketServer | undefined {
    if (SocketServer.server) {
      return SocketServer.server;
    } else {
      return;
    }
  }
}

export { SocketServer };
