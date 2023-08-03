import { Schema, model } from "mongoose";
import { IUserAuth, UserAuthModel } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userAuthSchema = new Schema<IUserAuth, UserAuthModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userAuthSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userAuthSchema.pre("save", async function (next) {
  // user password hashing
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const UserAuth = model<IUserAuth, UserAuthModel>(
  "user-auth",
  userAuthSchema
);
