import { tweetRepository } from "../../../database/repositories/";
const { latestTweets, setPublishedTrue } = tweetRepository;

import Debug from "debug";
const debug = Debug("server:debug");

const pickTweet = async () => {
  try {
    const tweets: any = await latestTweets();
    const { title, url, _id, relevance } = await tweets.find(
      (tweet: any) => tweet.isPublished == false
    );
    debug(`The relevance of the tweet is ${relevance}.`);
    debug(`title: ${title}, link: ${url}, _id: ${_id}`);
    setPublishedTrue(_id);

    const tweet = {
      title,
      url
    };
    return tweet;
  } catch (err: any) {
    throw Error(`Error while picking the tweet: ${err.message}`);
  }
};

export default pickTweet;
