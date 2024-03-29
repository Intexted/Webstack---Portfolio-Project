import { NextResponse } from "next/server";
import Section from "@/models/section";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const _req = await req.json();
    const { name, categories, sectionImg } = _req;

    await new Section({
      name,
      categories,
      sectionImg,
    }).save();

    revalidatePath("/dashboard/sections");
    revalidatePath("/courses");

    return NextResponse.json(
      {
        success: "Section Added successfully",
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
