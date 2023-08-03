import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel>({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  publicationDate: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: "reviews",
  },
  rating: {
    type: Number,
  },
});

export const Book = model<IBook, BookModel>("book", bookSchema);
