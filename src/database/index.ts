import morgan from "morgan";
import Debug from "debug";
const debug = Debug("server:debug");
import mongoose from "mongoose";
import config from "../config";

const useMongo = async () => {
  try {
    debug("Connection to MongoDB is initialized...");
    await mongoose.connect(config.mongo.url, config.mongo.options);
    debug("Connection to MongoDB is successful...");
  } catch (err) {
    debug("Error connecting to MongoDB: ", err);
  }
};

export default useMongo;
