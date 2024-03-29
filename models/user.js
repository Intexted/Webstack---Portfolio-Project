import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    nickname: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    password: { type: String },
    role: {
      type: String,
      default: "user",
    },
    notification: [String],
    bookmarked: [String],
    watched: [String],
    form: Object,
    filter: Object,
    plan: { type: String },
    videos: [
      {
        id: { type: String },
        time: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose?.model("User", userSchema);
export default User;
