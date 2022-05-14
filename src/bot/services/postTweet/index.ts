import rwClient from "./twitterClient";
import pickTweet from "./pickTweet";
import Debug from "debug";
const debug = Debug("server:debug");
import moment from "moment";

const postTweet = async () => {
  try {
    const { title, url } = await pickTweet();
    await rwClient.v2.tweet({
      text: `${title} #btcNews #cryptoNews ${url}`
    });
    return moment();
  } catch (err: any) {
    throw Error(`Error while posting the tweet: , ${err.message}`);
  }
};

export default postTweet;
