import { NextResponse } from "next/server";
import User from "@/models/user";
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

export async function POST(req) {
  const _req = await req.json();
  const { email } = _req;
  // transporter
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        {
          err: "User with that email not found!",
        },
        { status: 500 }
      );
    }
    // create a unique token
    const tokenObject = {
      email: existingUser.email,
      id: existingUser._id,
    };
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(tokenObject, secret, { expiresIn: "1h" });

    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Forgot Password",
      html: `
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        
            <h2 style="color: #333;">Forgot Password</h2>
        
            <p style="color: #555;">Hi ${existingUser.name},</p>
        
            <p style="color: #555;">You have requested to reset your password. Click the link below to reset it:</p>
        
            <p>
                <a href="${process.env.NEXTAUTH_URL}/reset/${token}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </p>
        
            <p style="color: #555;">If you didn't request a password reset, please ignore this email.</p>
        
            <p style="color: #555;">Thanks,<br>ValedictorianPrep</p>
        
        </div>
             
              `,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      success: "Email Sent Successfully!",
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
