import { NextResponse } from "next/server";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const _req = await req.json();
  const { userId, plan } = _req;

  try {
    await User?.findByIdAndUpdate(userId, {
      plan,
    });
    revalidatePath("/lectures");

    return NextResponse.json({
      success: "Plan Updated Successfully!",
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
