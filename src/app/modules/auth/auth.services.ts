import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import {
  IRefreshTokenResponse,
  IUserAuth,
  IUserAuthResponse,
} from "./auth.interface";
import { UserAuth } from "./auth.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createAccount = async (
  payload: IUserAuth
): Promise<IUserAuthResponse> => {
  if (await UserAuth.exists({ email: payload.email })) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Email address already registered. Please log in."
    );
  }

  const user = await UserAuth.create(payload);

  if (!user) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to create user"
    );
  }

  // create access token & refresh token
  const { email } = user;

  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginAccount = async (payload: IUserAuth): Promise<IUserAuthResponse> => {
  const isUserExist = await UserAuth.findOne({ email: payload.email });

  if (!isUserExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Email address not registered. Please register first."
    );
  }

  if (
    isUserExist.password &&
    !(await UserAuth.isPasswordMatched(payload.password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // create access token & refresh token
  const { email } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { email },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const stateAccount = async (authorization: string): Promise<string> => {
  // verify refresh token
  const token = authorization.split(" ")[1];

  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
  } catch (err) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "The access token is invalid or has expired"
    );
  }

  const { email } = verifiedToken;

  // if user exist in database
  await UserAuth.exists({ email: email }).orFail(
    new ApiError(httpStatus.NOT_FOUND, "User does not exist")
  );

  return email;
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify refresh token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { email } = verifiedToken;

  // if user exist in database
  const isUserExist = await UserAuth.exists({ email: email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // generate new token
  const newAccessToken = jwtHelpers.createToken(
    { email },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createAccount,
  loginAccount,
  stateAccount,
  refreshToken,
};
