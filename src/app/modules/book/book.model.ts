import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const bookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      require: true,
    },
    author: {
      type: {
        name: {
          type: String,
          require: true,
        },
        email: {
          type: String,
          require: true,
        },
      },
    },
    genre: {
      type: String,
      require: true,
    },
    publicationDate: {
      type: Date,
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Book = model<IBook, BookModel>("book", bookSchema);
