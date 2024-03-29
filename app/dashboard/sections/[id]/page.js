import React from "react";
import actions from "@/actions";
import AddSectionForm from "../AddSectionForm";

async function SectionDashboardPage({ params: { id } }) {
  const section = await actions.getSectionById(id);

  return (
    <div>
      <AddSectionForm section={section} />
    </div>
  );
}

export default SectionDashboardPage;
