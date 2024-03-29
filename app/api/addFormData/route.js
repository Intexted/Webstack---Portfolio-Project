import { NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req) {
  const _req = await req.json();

  try {
    const { email, data } = _req;
    // Check if user with email already exists
    await User.findOneAndUpdate(
      { email },
      {
        form: data,
      }
    );

    return NextResponse.json(
      {
        success: "Form Data Added Successfully",
      },
      { status: 200 }
    );
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
