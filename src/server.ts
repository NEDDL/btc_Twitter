import http from "http";
import config from "./config";

import Debug from "debug";
const debug = Debug("server:debug");

import app from "./api/v1/server";
import useMongo from "./database";
import cronJob from "./bot";

// Initialize server
useMongo();
cronJob.start();

// HTTP Server
const httpServer = http.createServer(app);
const port = config.server.port;
httpServer.listen(port, () =>
  debug(`Server is running ${config.server.hostname}:${config.server.port}`)
);
