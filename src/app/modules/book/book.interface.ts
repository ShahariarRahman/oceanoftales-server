import { Model, Types } from "mongoose";
import { IReview } from "../review/review.interface";

export type IBook = {
  _id?: Types.ObjectId;
  title: string;
  author: {
    name: string;
    email: string;
  };
  genre: string;
  publicationDate: Date;
  imageUrl: string;
  rating?: number;
  reviews?: IReview[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  publicationDate?: string;
  genre?: string;
  searchTerm?: string;
};
