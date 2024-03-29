import { NextResponse } from "next/server";
import Lecture from "@/models/lecture";
import db from "@/utils/db";
import moment from "moment";

export const dynamic = "force-dynamic";
// export const runtime = "edge";

export async function GET(request) {
  const startDate = request?.nextUrl?.searchParams?.get("startDate");

  const endDate = request?.nextUrl?.searchParams?.get("endDate");

  console.log(startDate, endDate);
  try {
    const lectures = await Lecture?.find({
      date: {
        $gte: new Date(startDate || null),
        $lt: new Date(endDate || moment().add(1, "year")),
      },
    }).sort({ date: 1 });

    return NextResponse.json(
      {
        lectures,
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
