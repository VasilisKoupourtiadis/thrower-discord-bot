import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  throwCount: {
    type: Number,
    default: 0,
  },
  raidThrowCount: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isGuildOwner: {
    type: Boolean,
    default: false,
  },
});

export const User = model("User", userSchema);
