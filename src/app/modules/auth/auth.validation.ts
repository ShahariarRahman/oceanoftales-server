import { z } from "zod";

const accountZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email format")
      .min(6, "Email too short")
      .max(100, "Email too long"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .regex(/[a-z]/, "Password requires at least one lowercase letter")
      .regex(/[A-Z]/, "Password requires at least one uppercase letter")
      .regex(/[0-9]/, "Password requires at least one digit")
      .regex(/[^A-Za-z0-9]/, "Password requires at least one special character")
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be at most 16 characters"),
  }),
});

const signOutAccountZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Cannot sign out. Please sign in first.",
    }),
  }),
});

const authStateAccountZodSchema = z.object({
  headers: z.object({
    authorization: z.string({
      required_error: "Access token not found",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const AuthValidation = {
  accountZodSchema,
  signOutAccountZodSchema,
  authStateAccountZodSchema,
  refreshTokenZodSchema,
};
