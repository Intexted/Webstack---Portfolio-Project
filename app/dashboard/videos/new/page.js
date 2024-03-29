import React from "react";
import VideoForm from "@/components/VideoForm";
import actions from "@/actions";

async function AddNewVideoPage() {
  const sections = await actions?.GetSections();
  return (
    <div>
      <VideoForm sections={sections} />
    </div>
  );
}

export default AddNewVideoPage;
