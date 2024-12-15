import { createServer } from "http";
import { app } from "./express";
import { SocketServer } from "./socket/Socket";
import { ENV } from "./utils/env.util";

const httpServer = createServer(app);

SocketServer.setServer(httpServer);

httpServer.listen(ENV.port);
