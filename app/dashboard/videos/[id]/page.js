import React from "react";
import VideoForm from "@/components/VideoForm";
import actions from "@/actions";

async function EditVideoPage({ params: { id } }) {
  const video = await actions?.getVideoById(id);
  const sections = await actions?.GetSections();

  return (
    <div>
      <VideoForm video={JSON?.stringify(video || [])} sections={sections} />
    </div>
  );
}

export default EditVideoPage;
