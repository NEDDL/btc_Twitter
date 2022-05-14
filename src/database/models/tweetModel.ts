import mongoose, { Schema } from "mongoose";
import Tweet from "../interfaces/tweet";

const TweetSchema: Schema = new Schema(
  {
    _id: { type: String, required: true },
    dateTimePub: { type: String, required: true },
    sentiment: { type: Number, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    relevance: { type: Number, required: true },
    isPublished: { type: Boolean, required: true },
    twittedAt: { type: Date, required: false }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<Tweet>("Tweet", TweetSchema);
