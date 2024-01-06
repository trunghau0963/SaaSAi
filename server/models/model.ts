import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, // Fix here
      required: true,
      minLength: 6,
      maxLength: 100,
      unique: true,
    },
    email: {
      type: String, // Fix here
      required: true,
      minLength: 10,
      maxLength: 100,
      unique: true,
    },
    password: {
      type: String, // Fix here
      required: true,
      minLength: 6,
    },
    admin: {
      type: Boolean, // Fix here
      default: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
