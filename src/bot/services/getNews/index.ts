import axios from "axios";
import moment from "moment";

import config from "../../../config";
const { params } = config.newsApi;
const { fetchFrequency } = config.settings;

import Debug from "debug";
const debug = Debug("server:debug");

// Functions
import filterNews from "./filterNews";

// Database
import { tweetRepository } from "../../../database/repositories/";
const { addTweets } = tweetRepository;

const getNews = async (lastFetched: any, setLastFetched: any) => {
  debug(`Get news from News API initiated...`);
  const now = moment();
  const difference = moment(now).diff(lastFetched, "hours");
  debug(`Last fetched: ${difference} hours ago...`);
  if (difference <= fetchFrequency)
    return debug(
      `Get news initiation stopped because the frequency is ${fetchFrequency} hours.`
    );

  try {
    debug("News API called...");
    const { data, status } = await axios.get(
      "http://eventregistry.org/api/v1/article/getArticlesForTopicPage",
      { params: params }
    );
    debug("API call status: ", status);
    const pages: number = data.articles.pages;
    if (status !== 200) return debug("No news were able to get fetched...");
    debug(`The call returns with ${pages} page(s)`);
    const initialFilteredNews = await filterNews(data.articles.results);
    addTweets(initialFilteredNews);

    // Repeat fetching the news if the first result shows multiple pages.
    // First call could be made only to get page numbers to have a cleaner code...
    // ...and loop through all pages however for this project my API calls are limited.
    if (pages > 1) {
      for (let i = 2; i <= pages; i++) {
        try {
          const { data, status } = await axios.get(
            "http://eventregistry.org/api/v1/article/getArticlesForTopicPage",
            { params: { ...params, articlesPage: i } }
          );
          if (status !== 200)
            return debug(`No news were able to get fetched from page ${i}...`);
          debug(`Running the news from page ${i}`);
          const filteredNews = await filterNews(data.articles.results);
          addTweets(filteredNews);
        } catch (err: any) {
          debug("Error while looping the pages: ", err);
        }
      }
    }
    setLastFetched(moment());
    debug(`Call initiated now on ${moment().format("LT")}`);
  } catch (err: any) {
    throw Error(`Error while getting news from news API: ${err.message}`);
  }
};

export default getNews;
