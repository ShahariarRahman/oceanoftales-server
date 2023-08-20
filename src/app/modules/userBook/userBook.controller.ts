import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IExistsType, IUserBook } from "./userBook.interface";
import { UserBookService } from "./userBook.services";

const addWish = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await UserBookService.addWish(data);

  sendResponse<IUserBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "add to wishlist successfully !",
    data: result,
  });
});

const addRead = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await UserBookService.addRead(data);

  sendResponse<IUserBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "add to reading list successfully !",
    data: result,
  });
});

const addFinish = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await UserBookService.addFinish(data);

  sendResponse<IUserBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "add to finish list & remove from reading list successfully !",
    data: result,
  });
});

const getSingleWish = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const email = req.params.email;
  const result = await UserBookService.getSingleWish({ id, email });

  sendResponse<IExistsType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book retrieved from wish list successfully !",
    data: result,
  });
});

const getSingleRead = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const email = req.params.email;
  const result = await UserBookService.getSingleRead({ id, email });

  sendResponse<IExistsType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book retrieved from reading list successfully !",
    data: result,
  });
});

const getSingleFinish = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const email = req.params.email;
  const result = await UserBookService.getSingleFinish({ id, email });

  sendResponse<IExistsType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book retrieved from finish list successfully !",
    data: result,
  });
});

const getWish = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await UserBookService.getWish({ email });

  sendResponse<IUserBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "wish list retrieved successfully !",
    data: result,
  });
});

const getRead = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await UserBookService.getRead({ email });

  sendResponse<IUserBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "reading list retrieved successfully !",
    data: result,
  });
});

const getFinish = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const result = await UserBookService.getFinish({ email });

  sendResponse<IUserBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "finish list retrieved successfully !",
    data: result,
  });
});

export const UserBookController = {
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
