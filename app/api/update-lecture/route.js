import { NextResponse } from "next/server";
import Lecture from "@/models/lecture";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const _req = await req.json();
  const { lectureId, data, selectedDate, pdfUrl, endDate } = _req;

  try {
    await Lecture?.findByIdAndUpdate(lectureId, {
      title: data.title,
      date: selectedDate,
      endDate,
      startTime: data.startTime,
      endTime: data.endTime,
      avatarSrc: data.avatarSrc,
      instructor: data.instructor,
      level: data.level,
      section: data.section,
      description: data.description,
      free: data.free,
      lectureSrc: data.lectureSrc,
      lessonAndSkill: data.lessonAndSkill,
      lsatNumber: data.lsatNumber,
      sectionNumber: data.sectionNumber,
      tutorDir: data.tutorDir,
      QperG: data.QperG,
      pdfUrl,
    });
    revalidatePath("/dashboard/lectures");
    revalidatePath("/lectures");

    return NextResponse.json({
      success: "lecture removed Successfully!",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
