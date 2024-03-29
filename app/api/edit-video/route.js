import { NextResponse } from "next/server";
import Video from "@/models/video";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const _req = await req.json();
  const {
    videoId,
    classDetail,
    instructor,
    instructorJob,
    section,
    avatarSrc,
    categories,
    videoImage,
    videoDuration,
    videoSrc,
    videoTitle,
    addHomeworks,
    assignments,
    chapters,
  } = _req;

  try {
    await Video?.findByIdAndUpdate(videoId, {
      videoTitle,
      avatarSrc,
      categories,
      videoImage,
      videoDuration,
      videoSrc,
      section,
      chapters,
      instructor,
      instructorJob,
      classDetail,
      addHomeworks,
      assignments,
    });
    revalidatePath("/dashboard/videos");
    revalidatePath("/courses");

    return NextResponse.json({
      success: "Video updated Successfully!",
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
