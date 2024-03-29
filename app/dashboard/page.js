import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function Dashboard() {
  const { user } = await getServerSession(authOptions);

  if (user.role != "admin") {
    redirect("/");
  } else if (user.role === "admin") {
    redirect("/dashboard/lectures");
  }
  return <div></div>;
}

export default Dashboard;
