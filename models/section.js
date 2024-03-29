import mongoose from "mongoose";

const userSection = new mongoose.Schema(
  {
    name: { type: String },
    categories: { type: String },
    sectionImg: { type: String },
  },
  {
    timestamps: true,
  }
);

const Section =
  mongoose?.models?.Section || mongoose?.model("Section", userSection);
export default Section;
