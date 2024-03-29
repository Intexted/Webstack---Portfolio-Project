import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";

export async function POST(req) {
  const _req = await req.json();
  try {
    const { name, nickname, email, password } = _req;
    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          err: "User with that email already exists",
        },
        { status: 409 }
      );
    } else {
      await new User({
        name,
        nickname,
        email,
        password: await bcrypt.hash(password, 10),
      }).save();
      return NextResponse.json(
        {
          success: "Registered successfully",
        },
        { status: 200 }
      );
    }
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
