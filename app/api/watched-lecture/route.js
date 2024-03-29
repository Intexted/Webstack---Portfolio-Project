import { NextResponse } from "next/server";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const _req = await req.json();
  const { userId, lectureId } = _req;

  try {
    await User?.findByIdAndUpdate(
      userId,
      {
        $addToSet: { watched: lectureId },
      },
      { new: true }
    );
    revalidatePath("/lectures");

    return NextResponse.json({
      success: "lecture marked as watched Successfully!",
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
