import dotenv from "dotenv";
dotenv.config();

declare let process: {
  env: {
    [key: string]: string;
  };
};

// Server
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

// Mongo
const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "superAdmin";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "superSecretPassword";
const MONGO_HOST = process.env.MONGO_URL || "cluster0.ke6ad.mongodb.net";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "";

const MONGO = {
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`
};

// News API

const API_PARAMS = {
  apiKey: process.env.NEWS_API_KEY,
  uri: "d48a0476-7548-4dbe-90f9-854582081e7d",
  resultType: "articles",
  maxDaysBack: 1,
  articlesSortBy: "socialScore",
  dataType: "news"
};
const TOPIC_RELEVANCE = 100;
const FOCUS_KEYWORD = "bitcoin";
const FORBIDDEN_KEYWORDS = [
  "climbs",
  "dips below",
  "drop below",
  "dropped below",
  "drops below",
  "drops more than",
  "fall towards",
  "falls towards",
  "jumps above",
  "jumps back above",
  "jumps to",
  "plummet",
  "plunging",
  "spiked above",
  "swoons below",
  "weekly losses"
];

const NEWS_API = {
  params: API_PARAMS,
  topicRelevance: TOPIC_RELEVANCE,
  focusKeyword: FOCUS_KEYWORD,
  forbiddenKeywords: FORBIDDEN_KEYWORDS
};

// Twitter API

const appKey = process.env.TWITTER_API_KEY;
const appSecret = process.env.TWITTER_API_KEY_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;
const bearerToken = process.env.TWITTER_BEARER_TOKEN;

const TWITTER_API = {
  appKey,
  appSecret,
  accessToken,
  accessSecret,
  bearerToken
};

// Settings
const minShareFrequency = 8; // In minutes
const fetchFrequency = 24; // In hours
const cronFrequency = 1; // In minutes not working currently
const latestTweetsDays = 1; // In days

const SETTINGS = {
  minShareFrequency,
  fetchFrequency,
  cronFrequency,
  latestTweetsDays
};

// Export

const config = {
  mongo: MONGO,
  server: SERVER,
  newsApi: NEWS_API,
  twitterApi: TWITTER_API,
  settings: SETTINGS
};

export default config;
