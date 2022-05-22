import mongoose, { Schema } from "mongoose";
import Tweet from "../interfaces/tweet";

const TweetSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    dateTimePub: { type: String, required: false },
    sentiment: { type: Number, required: false },
    url: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: false },
    relevance: { type: Number, required: false },
    isPublished: { type: Boolean, required: true },
    twittedAt: { type: Date, required: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<Tweet>("Tweet", TweetSchema);
