import express from "express";
import { BookController } from "./book.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookValidation } from "./book.validation";
const router = express.Router();

router.get("/:id", BookController.getSingleBook);

router.delete("/:id", BookController.deleteBook);

router.patch(
  "/:id",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.updateBook
);

router.post(
  "/",
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook
);

router.get("/", BookController.getAllBooks);

export const BookRoutes = router;
