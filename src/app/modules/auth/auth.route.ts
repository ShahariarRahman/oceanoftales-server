import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";
const router = express.Router();

router.post(
  "/sign-up",
  validateRequest(AuthValidation.accountZodSchema),
  AuthController.createAccount
);

router.post(
  "/sign-in",
  validateRequest(AuthValidation.accountZodSchema),
  AuthController.loginAccount
);

router.get(
  "/state",
  validateRequest(AuthValidation.authStateAccountZodSchema),
  AuthController.stateAccount
);

router.post(
  "/sign-out",
  validateRequest(AuthValidation.signOutAccountZodSchema),
  AuthController.logoutAccount
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
