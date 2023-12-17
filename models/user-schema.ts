import { Schema, model } from "mongoose";

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  throwCount: {
    type: Number,
    default: 0,
  },
});

export const User = model("User", userSchema);
