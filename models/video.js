import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoTitle: { type: String },
    videoSrc: { type: String },
    videoImage: { type: String },
    videoDuration: { type: Number },
    section: { type: String },
    categories: { type: String },
    chapters: [
      {
        title: { type: String },
        time: { type: String },
      },
    ],
    instructor: { type: String },
    instructorJob: { type: String },
    avatarSrc: { type: String },
    classDetail: { type: String },
    addHomeworks: [
      {
        title: { type: String },
        description: { type: String },
        pdfLink: { type: String },
        digitalLink: { type: String },
        AllottedTime: { type: Number },
      },
    ],
    assignments: [
      {
        title: { type: String },
        description: { type: String },
        pdfLink: { type: String },
        digitalLink: { type: String },
        AllottedTime: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Video = mongoose?.models?.Video || mongoose?.model("Video", videoSchema);
export default Video;
