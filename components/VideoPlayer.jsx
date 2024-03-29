"use client";

import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <ReactPlayer
        url="/my-video.mp4"
        controls={true}
        width={1105}
        height={500}
      />
    </div>
  );
}

export default VideoPlayer;
