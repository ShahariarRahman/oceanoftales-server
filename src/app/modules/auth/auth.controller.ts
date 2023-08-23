import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AuthService } from "./auth.services";
import { IRefreshTokenResponse, IUserAuthResponse } from "./auth.interface";
import { cookieOptions } from "./auth.utils";

const createAccount = catchAsync(async (req: Request, res: Response) => {
  const { ...createAccountData } = req.body;
  const result = await AuthService.createAccount(createAccountData);
  const { refreshToken, ...rest } = result;

  // set refresh token into cookie
  res.cookie("refreshToken", refreshToken, cookieOptions());

  sendResponse<IUserAuthResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account created successfully !",
    data: rest,
  });
});

const loginAccount = catchAsync(async (req: Request, res: Response) => {
  const { ...loginAccountData } = req.body;
  const result = await AuthService.loginAccount(loginAccountData);
  const { refreshToken, ...rest } = result;

  // set refresh token into cookie
  res.cookie("refreshToken", refreshToken, cookieOptions());

  sendResponse<IUserAuthResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account logged in successfully !",
    data: rest,
  });
});

const logoutAccount = catchAsync(async (req: Request, res: Response) => {
  // clear refresh token from cookie
  res.clearCookie("refreshToken", cookieOptions());

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Account logout in successfully !",
    data: {},
  });
});

const stateAccount = catchAsync(async (req: Request, res: Response) => {
  const { authorization } = req.headers;
  const result = await AuthService.stateAccount(authorization as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token verified",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie
  res.cookie("refreshToken", refreshToken, cookieOptions());

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in by refreshToken",
    data: result,
  });
});

export const AuthController = {
  createAccount,
  loginAccount,
  logoutAccount,
  stateAccount,
  refreshToken,
};
