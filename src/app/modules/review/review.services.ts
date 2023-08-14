import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IReview } from "./review.interface";
import { Book } from "../book/book.model";
import { IBook } from "../book/book.interface";
import mongoose from "mongoose";

const addReview = async (id: string, payload: IReview): Promise<IBook> => {
  await Book.exists({ _id: id }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "Book Not Found")
  );

  const pipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id), //find doc
      },
    },
    {
      $unwind: "$reviews", // spread arr to ...obj for each review
    },
    {
      $group: {
        _id: null, // custom id
        totalRating: { $sum: "$reviews.rating" }, // calc sum of the spread obj for reviews.rating field
        numberRating: { $sum: 1 }, // calc num of the spread obj
      },
    },
  ];

  const aggregationResult = await Book.aggregate(pipeline);

  if (!Array.isArray(aggregationResult)) {
    new ApiError(httpStatus.NOT_FOUND, "Book Not Found");
  }

  let rating: number;
  if (aggregationResult.length) {
    const { totalRating, numberRating } = aggregationResult[0];
    rating = (totalRating + payload.rating) / (numberRating + 1);
  } else {
    rating = payload.rating;
  }

  const query = {
    $push: {
      reviews: payload,
    },
    $set: {
      rating: parseFloat(rating.toFixed(2)),
    },
  };

  const result = await Book.findByIdAndUpdate(id, query, {
    new: true,
  }).orFail(new ApiError(httpStatus.NOT_FOUND, "Failed to add review"));

  return result;
};

export const ReviewService = {
  addReview,
};
