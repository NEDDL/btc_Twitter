import { TwitterApi } from "twitter-api-v2";
import config from "../../../config";
const { appKey, appSecret, accessToken, accessSecret, bearerToken } =
  config.twitterApi;

const client = new TwitterApi({
  appKey,
  appSecret,
  accessToken,
  accessSecret
});

const rwClient = client.readWrite;

export default rwClient;
