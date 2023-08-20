import { z } from "zod";

const addListZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format")
      .min(6, "Email too short")
      .max(100, "Email too long"),
    id: z.string({
      required_error: "Book id is required",
    }),
  }),
});

export const UserBookValidation = {
  addListZodSchema,
};
