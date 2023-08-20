import express from "express";
const router = express.Router();
import { UserBookController } from "./userBook.controller";
import { UserBookValidation } from "./userBook.validation";
import validateRequest from "../../middlewares/validateRequest";

router.get("/get-wish/:email/:id", UserBookController.getSingleWish);
router.get("/get-read/:email/:id", UserBookController.getSingleRead);
router.get("/get-finish/:email/:id", UserBookController.getSingleFinish);

router.get("/get-wish/:email", UserBookController.getWish);
router.get("/get-read/:email", UserBookController.getRead);
router.get("/get-finish/:email", UserBookController.getFinish);

router.patch(
  "/add-wish",
  validateRequest(UserBookValidation.addListZodSchema),
  UserBookController.addWish
);

router.patch(
  "/add-read",
  validateRequest(UserBookValidation.addListZodSchema),
  UserBookController.addRead
);

router.patch(
  "/add-finish",
  validateRequest(UserBookValidation.addListZodSchema),
  UserBookController.addFinish
);

export const UserBookRoutes = router;
