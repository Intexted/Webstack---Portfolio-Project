"use client";

import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
    >
      <ReactPlayer
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        controls={true}
        width={1105}
        height={410}
      />
    </div>
  );
}

export default VideoPlayer;
