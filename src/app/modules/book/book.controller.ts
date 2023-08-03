import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { bookFilterableFields } from "./book.constant";
import pick from "../../../shared/pick";
import { BookService } from "./book.services";
import { IBook } from "./book.interface";
import { paginationFields } from "../../../constants/pagination";

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookService.getAllBooks(filters, paginationOptions);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "books retrieved successfully !",
    meta: result.meta,
    data: result.data,
  });
});

export const BookController = {
  getAllBooks,
};
