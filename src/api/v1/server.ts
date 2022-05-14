// Express
import express from "express";
const app = express();

// Routes
import { tweets, error } from "./routes";

// Debug
import morgan from "morgan";
import Debug from "debug";
const debug = Debug("server:debug");
const debugRequest = Debug("server:request");

// Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(helmet()); // To secure HTML with header
debug(`Server is initializing in ${app.get("env")} environment...`);
if (app.get("env") === "development") {
  app.use(morgan("tiny", { stream: { write: (msg) => debugRequest(msg) } }));
  debug("Morgan enabled...");
}

// End points
app.use("/api/v1/tweets", tweets);
app.use(error);

export default app;
