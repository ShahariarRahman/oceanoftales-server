import { CookieOptions } from "express";
import config from "../../../config";

export const cookieOptions = (): CookieOptions => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 10);

  return {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: false,
    expires: expirationDate,
  };
};
