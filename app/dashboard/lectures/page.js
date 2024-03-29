import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import actions from "@/actions";
import EventTable from "./EventTable";

async function LecturesDashboardList() {
  const session = await getServerSession(authOptions);
  const user = await actions.GetProfile(session?.user?._id);
  const lectures = await actions.getData();

  return (
    <div className="p-5">
      <EventTable events={lectures} />
    </div>
  );
}

export default LecturesDashboardList;
