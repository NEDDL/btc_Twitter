import { CronJob } from "cron";
import moment from "moment";
import { getNews, postTweet, shareNow } from "./services/";

import config from "../config";
const { cronFrequency } = config.settings;

import Debug from "debug";
const debug = Debug("server:debug");

let lastShared: any = moment().subtract(20, "minutes");
debug("Last shared for Cron job set to: ", lastShared);

let lastFetched: any = moment().subtract(1, "days");
const setLastFetched = (date: any) => {
  lastFetched = date;
};

const schedule = `* * * * *`;
const cronJob = new CronJob(schedule, async () => {
  debug("Cron job initialized...");
  try {
    await getNews(lastFetched, setLastFetched);
    if (await shareNow(lastShared, lastFetched)) {
      try {
        debug("Tweet is posting...");
        const postedTime: any = await postTweet();
        lastShared = postedTime;
        debug(
          `Tweet posted on ${moment(lastShared).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}.`
        );
      } catch (err: any) {
        throw Error(`Error posting the tweet:  ${err.message}`);
      }
    }
  } catch (err: any) {
    debug(`Error with bot: ${err.message}`);
  }
});

export default cronJob;
