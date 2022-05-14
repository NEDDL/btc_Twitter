import { Document } from "mongoose";

export default interface Tweet extends Document {
  _id: string;
  dateTimePub: string;
  sentiment: number;
  url: string;
  title: string;
  image: string;
  relevance: number;
  isPublished: boolean;
  twittedAt: Date;
}
