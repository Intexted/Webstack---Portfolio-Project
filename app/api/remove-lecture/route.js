import { NextResponse } from "next/server";
import Lecture from "@/models/lecture";
import { revalidatePath } from "next/cache";

export async function DELETE(req) {
  const _req = await req.json();
  const { lectureId } = _req;

  try {
    await Lecture?.findByIdAndDelete(lectureId);
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
