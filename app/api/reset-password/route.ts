import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user";
const jwt = require("jsonwebtoken");

export async function POST(req) {
  const _req = await req.json();
  const { token, newPassword } = _req;
  try {
    const secret = process.env.JWT_SECRET;
    // Verify the token with the secret key
    const decoded = jwt.verify(token, secret);

    // Check if user with email already exists
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashed });
    return NextResponse.json(
      {
        success: "Your password has been successful reset",
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
