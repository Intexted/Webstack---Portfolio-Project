import { NextResponse } from "next/server";
import Video from "@/models/video";
import { revalidatePath } from "next/cache";

export async function DELETE(req) {
  const _req = await req.json();
  const { videoId } = _req;

  try {
    await Video?.findByIdAndDelete(videoId);
    revalidatePath("/dashboard/videos");
    revalidatePath("/courses");

    return NextResponse.json({
      success: "Video removed Successfully!",
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
