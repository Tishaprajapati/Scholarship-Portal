import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    //TODO: add caste
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
