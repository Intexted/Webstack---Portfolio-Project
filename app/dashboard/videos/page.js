import React from "react";
import VideoTable from "./VideoTable";
import actions from "@/actions";

async function VideosDashboardList() {
  const videos = await actions?.getVideos();

  return (
    <div>
      <VideoTable data={JSON?.stringify(videos || [])} />
    </div>
  );
}

export default VideosDashboardList;
