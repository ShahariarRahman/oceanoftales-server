import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .nonempty({ message: "Title is required" })
      .min(2, { message: "Title cannot be too short" })
      .max(70, { message: "Title cannot be too long" }),
    author: z.object({
      name: z
        .string({ required_error: "Author name is required" })
        .nonempty({ message: "Author name is required" })
        .min(5, { message: "Author name cannot be too short" })
        .max(28, { message: "Author name cannot be too long" }),
      email: z
        .string({ required_error: "Author email is required" })
        .email("Invalid email format"),
    }),
    genre: z
      .string({ required_error: "Genre is Required" })
      .nonempty({ message: "Genre is required" }),
    publicationDate: z
      .string({ required_error: "Publication date is required" })
      .nonempty({ message: "Publication date is required" })
      .refine(value => !!new Date(value).getTime(), {
        message: "Invalid ISO 8601 date-time string",
        path: ["publicationDate"],
      }),
    imageUrl: z
      .string({ required_error: "ImageUrl is required" })
      .nonempty({ message: "ImageUrl is required" }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
