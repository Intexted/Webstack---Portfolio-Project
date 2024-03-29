import { NextResponse } from "next/server";
import Section from "@/models/section";
import { revalidatePath } from "next/cache";

export async function DELETE(req) {
  const _req = await req.json();
  const { sectionId } = _req;

  try {
    await Section?.findByIdAndDelete(sectionId);
    revalidatePath("/dashboard/sections");
    revalidatePath("/courses");

    return NextResponse.json({
      success: "Section removed Successfully!",
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
