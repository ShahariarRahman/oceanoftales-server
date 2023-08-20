import { Types, Model } from "mongoose";
import { IBook } from "../book/book.interface";

export type IUserBook = {
  email: string;
  wishList: Types.ObjectId[] | IBook[];
  readingList: Types.ObjectId[] | IBook[];
  finishList: Types.ObjectId[] | IBook[];
};

export type UserBookModel = Model<IUserBook>;

export type IUserBookPayload = {
  email: string;
  id: string;
};

type IField = {
  wishList?: string;
  readingList?: string;
  finishList?: string;
};

export type IUpdate = {
  $set: {
    email: string;
  };
  $pull?: IField;
  $addToSet: IField;
};

export type IExistsType = {
  _id: Types.ObjectId;
};
