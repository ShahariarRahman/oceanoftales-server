import { Model, Types } from "mongoose";
import { IReview } from "../review/review.interface";

export type IBook = {
  _id?: Types.ObjectId;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  imageUrl: string;
  reviews?: Types.ObjectId | IReview;
  rating?: number;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookFilters = {
  publicationDate?: string;
  genre?: string;
  searchTerm?: string;
};