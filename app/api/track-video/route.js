import { NextResponse } from "next/server";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const _req = await req.json();
  const { userId, videoId, progressTime } = _req;

  try {
    const user = await User?.findOne({ _id: userId });

    if (user) {
      const videoIndex = user.videos.findIndex((video) => video.id === videoId);

      if (videoIndex !== -1) {
        // Update the existing video time
        user.videos[videoIndex].time = progressTime;
        await user.save();
      } else {
        // Add the video object to the array
        user.videos.push({ id: videoId, time: progressTime });
        await user.save();
      }
    }
    revalidatePath("/courses");

    return NextResponse.json({
      success: "video tracked Successfully!",
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
