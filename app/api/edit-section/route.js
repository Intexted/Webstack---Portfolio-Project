import { NextResponse } from "next/server";
import Section from "@/models/section";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  const _req = await req.json();
  const { sectionId, name, categories, sectionImg } = _req;

  try {
    await Section?.findByIdAndUpdate(sectionId, {
      name,
      categories,
      sectionImg,
    });
    revalidatePath("/dashboard/sections");
    revalidatePath("/courses");

    return NextResponse.json({
      success: "Section updated Successfully!",
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
