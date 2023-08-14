import { z } from "zod";

const addReviewZodSchema = z.object({
  body: z.object({
    user: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format")
      .min(6, "Email too short")
      .max(100, "Email too long"),
    comment: z
      .string({ required_error: "Comment is required" })
      .nonempty("Comment is required")
      .min(2, "Comment must be at least 2 characters")
      .max(500, "Comment cannot exceed 500 characters"),
    rating: z
      .number({ required_error: "Rating is required" })
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
  }),
});

export const ReviewValidation = {
  addReviewZodSchema,
};
