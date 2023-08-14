import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";
const router = express.Router();

router.patch(
  "/:id",
  validateRequest(ReviewValidation.addReviewZodSchema),
  ReviewController.addReview
);

export const ReviewRoutes = router;
