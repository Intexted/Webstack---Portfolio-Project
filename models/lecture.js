import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: { type: String },
    date: { type: Date },
    endDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    avatarSrc: { type: String },
    instructor: { type: String },
    level: { type: Number },
    section: { type: [String] },
    description: { type: String },
    free: { type: Boolean },
    lectureSrc: { type: String },
    lessonAndSkill: { type: String },
    lsatNumber: { type: Number },
    sectionNumber: { type: Number },
    tutorDir: { type: String },
    QperG: { type: String },
    pdfUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const Lecture =
  mongoose?.models?.Lecture || mongoose?.model("Lecture", lectureSchema);
export default Lecture;
