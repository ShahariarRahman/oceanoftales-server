/* eslint-disable no-unused-vars */

import { Model } from "mongoose";

export type IUserAuth = {
  email: string;
  password: string;
};

export type UserAuthModel = {
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUserAuth>;

export type IUserAuthResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
