import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import {
  IExistsType,
  IUpdate,
  IUserBook,
  IUserBookPayload,
} from "./userBook.interface";
import { UserBook } from "./userBook.model";
import { Types } from "mongoose";

const addWish = async (payload: IUserBookPayload): Promise<IUserBook> => {
  const { email, id } = payload;

  const update: IUpdate = {
    $set: {
      email,
    },
    $addToSet: {
      wishList: id,
    },
  };

  const result = await UserBook.findOneAndUpdate({ email }, update, {
    upsert: true,
    returnDocument: "after",
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Failed to add to wishlist");
  }
  return result;
};

const addRead = async (payload: IUserBookPayload): Promise<IUserBook> => {
  const { email, id } = payload;

  const update: IUpdate = {
    $set: {
      email,
    },
    $addToSet: {
      readingList: id,
    },
  };

  const result = await UserBook.findOneAndUpdate({ email }, update, {
    upsert: true,
    returnDocument: "after",
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Failed to add to reading list");
  }

  return result;
};

const addFinish = async (payload: IUserBookPayload): Promise<IUserBook> => {
  const { email, id } = payload;

  const update: IUpdate = {
    $set: {
      email,
    },
    $addToSet: {
      finishList: id,
    },
  };

  const result = await UserBook.findOneAndUpdate({ email }, update, {
    upsert: true,
    returnDocument: "after",
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Failed to add to finish list");
  }

  return result;
};

const getSingleWish = async (
  params: IUserBookPayload
): Promise<IExistsType | null> => {
  const { id, email } = params;

  const result = await UserBook.exists({
    email,
    wishList: id,
  }).orFail(new ApiError(httpStatus.NOT_FOUND, "Book not found in wish list"));

  return result ? { _id: new Types.ObjectId(id) } : null;
};

const getSingleRead = async (
  params: IUserBookPayload
): Promise<IExistsType | null> => {
  const { id, email } = params;

  const result = await UserBook.exists({
    email,
    readingList: id,
  }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Book not found in reading list")
  );

  return result ? { _id: new Types.ObjectId(id) } : null;
};

const getSingleFinish = async (
  params: IUserBookPayload
): Promise<IExistsType | null> => {
  const { id, email } = params;

  const result = await UserBook.exists({
    email,
    finishList: id,
  }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Book not found in finish list")
  );

  return result ? { _id: new Types.ObjectId(id) } : null;
};

const getWish = async (
  params: Omit<IUserBookPayload, "id">
): Promise<IUserBook> => {
  const { email } = params;

  const result = await UserBook.findOne({ email })
    .orFail(
      new ApiError(
        httpStatus.NOT_FOUND,
        "Failed to retrieve / wish list is empty"
      )
    )
    .select({ _id: 0, wishList: 1 })
    .populate({
      path: "wishList",
    })
    .lean();

  return result;
};
const getRead = async (
  params: Omit<IUserBookPayload, "id">
): Promise<IUserBook> => {
  const { email } = params;

  const result = await UserBook.findOne({ email })
    .orFail(
      new ApiError(
        httpStatus.NOT_FOUND,
        "Failed to retrieve / reading list is empty"
      )
    )
    .select({ _id: 0, readingList: 1 })
    .populate({
      path: "readingList",
    })
    .lean();

  return result;
};
const getFinish = async (
  params: Omit<IUserBookPayload, "id">
): Promise<IUserBook> => {
  const { email } = params;

  const result = await UserBook.findOne({ email })
    .orFail(
      new ApiError(
        httpStatus.NOT_FOUND,
        "Failed to retrieve / finish list is empty"
      )
    )
    .select({ _id: 0, finishList: 1 })
    .populate({
      path: "finishList",
    })
    .lean();

  return result;
};

export const UserBookService = {
  addWish,
  addRead,
  addFinish,
  getSingleWish,
  getSingleRead,
  getSingleFinish,
  getWish,
  getRead,
  getFinish,
};
