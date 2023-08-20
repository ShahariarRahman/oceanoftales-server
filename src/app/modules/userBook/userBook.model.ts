import { Schema, model } from "mongoose";
import { IUserBook, UserBookModel } from "./userBook.interface";

const userBookSchema = new Schema<IUserBook, UserBookModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    wishList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "book",
        },
      ],
    },
    readingList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "book",
        },
      ],
    },
    finishList: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "book",
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

export const UserBook = model<IUserBook, UserBookModel>(
  "user-book",
  userBookSchema
);
