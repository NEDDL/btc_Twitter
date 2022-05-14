import { tweetModel } from "../models/";
import Debug from "debug";
const debug = Debug("server:debug");
import moment from "moment";

import config from "../../config";
const { latestTweetsDays } = config.settings;

const getTweets = async () => {
  try {
    return await tweetModel.find().exec();
  } catch (err: any) {
    throw Error(`Error returning all tweets: ${err.message}`);
  }
};

const addTweets = (tweets: any[]) => {
  tweets.forEach(async (_tweet) => {
    try {
      // Check if tweet._id already in the database if (true) return
      const document = await tweetModel.findById(_tweet._id).exec();
      debug("addTweets: ", document);
      if (document !== null) return;
      // Post the tweet to the database
      const tweet = new tweetModel(_tweet);
      tweet.save();
    } catch (err: any) {
      throw Error(`Error while adding tweets: ${err.message}`);
    }
  });
};

const latestTweets = async () => {
  try {
    const tweets: any[] = await tweetModel
      .find({
        createdAt: {
          $gte: moment().subtract(latestTweetsDays, "days").toString(),
          $lt: new Date()
        }
      })
      .sort([["relevance", "descending"]]);
    return tweets;
  } catch (err: any) {
    throw Error(`Error returning latest tweets: ${err.message}`);
  }
};

const setPublishedTrue = async (id: any) => {
  try {
    const updatedTweet = await tweetModel.updateOne(
      { _id: id },
      { $set: { isPublished: true } }
    );
    return updatedTweet;
  } catch (err: any) {
    debug(`Error updating tweet (${id}): ${err.message}`);
  }
};

export default { getTweets, addTweets, latestTweets, setPublishedTrue };
