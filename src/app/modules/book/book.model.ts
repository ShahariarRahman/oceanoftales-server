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
    rating: {
      type: Number,
    },
    reviews: {
      type: [
        {
          user: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
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
