import { NextResponse } from "next/server";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const _req = await req.json();
  const { userId } = _req;

  try {
    const user = await User?.findById(userId);
    revalidatePath("/lectures");
    return NextResponse.json({
      user,
      success: "lectures filtred Successfully!",
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
