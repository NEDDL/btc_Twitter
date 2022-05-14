import express from "express";
const router = express.Router();

import { tweetControllers } from "../controllers";
const { getAllTweets } = tweetControllers;

import Debug from "debug";
const debug = Debug("app:debug");

// Routes
debug("Tweets requested");
router.get("/", getAllTweets);

export default router;
