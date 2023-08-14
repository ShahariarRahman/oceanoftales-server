import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReviewService } from "./review.services";
import { IBook } from "../book/book.interface";

const addReview = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...reviewData } = req.body;

  const result = await ReviewService.addReview(id, reviewData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review added successfully !",
    data: result,
  });
});

export const ReviewController = {
  addReview,
};
