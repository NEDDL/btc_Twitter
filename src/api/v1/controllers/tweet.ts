import { NextFunction, Request, Response } from "express";
import { tweetRepository } from "../../../database/repositories/";
const { getTweets } = tweetRepository;
import Debug from "debug";
const debug = Debug("app:debug");

const getAllTweets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    debug("Database connection started...");
    const result: any = await getTweets();
    return res
      .status(200)
      .json({ result: result, count: result.length, status: 200 });
  } catch (err) {
    debug("Error: ", debug);
  }
};

export default { getAllTweets };
