import { Request } from "express";

export const cookieOptions = (req: Request) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 10);

  return {
    secure: req.secure || req.headers["x-forwarded-proto"] === "https", // Detect if the request is secure (HTTPS)
    httpOnly: true,
    sameSite: true,
    expires: expirationDate,
  };
};
