import { Types } from "mongoose";

export type IReview = {
  _id?: Types.ObjectId;
  user: string;
  rating: number;
  comment: string;
};
