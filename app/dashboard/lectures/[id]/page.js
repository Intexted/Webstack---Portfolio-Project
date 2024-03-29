import React from "react";
import actions from "@/actions";
import LectureForm from "@/components/LectureForm";

async function LecturesDashboardPage({ params: { id } }) {
  const lecture = await actions.getLectureData(id);

  return (
    <div>
      <LectureForm lecture={lecture} />
    </div>
  );
}

export default LecturesDashboardPage;
