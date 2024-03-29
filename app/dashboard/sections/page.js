import React from "react";
import SectionTable from "./SectionTable";
import actions from "@/actions";

async function SectionsDashbordPage() {
  const sections = await actions?.GetSections();
  return (
    <div>
      <SectionTable sections={sections} />
    </div>
  );
}

export default SectionsDashbordPage;
