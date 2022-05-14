import moment from "moment";
import { tweetRepository } from "../../../database/repositories/";
const { latestTweets } = tweetRepository;

import Debug from "debug";
const debug = Debug("server:debug");

import config from "../../../config";
const { minShareFrequency, fetchFrequency } = config.settings;

const shareNow = async (lastShared: any, lastFetched: any) => {
  try {
    debug("Deciding if the tweet should be posted now...");
    const tweets: any = await latestTweets();
    const awaitingTweets: any = await tweets.filter(
      (tweet: any) => tweet.isPublished !== true
    );
    const length = await awaitingTweets.length;
    debug(`Tweets length: `, length);

    const fetchFrequencyInMinutes = fetchFrequency * 60; // example: 1920 minutes 32 hours
    const fetchDifference = moment(moment()).diff(lastFetched, "minutes"); // example 1440 minutes 24 hours
    const shareBaseTime = fetchFrequencyInMinutes - fetchDifference;

    const shareFrequency = Math.floor(shareBaseTime / length); // 26 mins (example)
    debug(`Decided to share every ${shareFrequency} mins`);

    const now = moment();
    const shareDifference = moment(now).diff(moment(lastShared), "minutes");
    debug(`Difference in minutes now ${shareDifference}`);

    if (
      shareDifference >= shareFrequency &&
      shareDifference >= minShareFrequency
    ) {
      debug(`Tweet should be posted now.`);
      return true;
    } else {
      debug(`Tweet should not be posted now.`);
      return false;
    }
  } catch (err: any) {
    throw Error(`Error processing shareNow: ${err.message}`);
  }
};

export default shareNow;
