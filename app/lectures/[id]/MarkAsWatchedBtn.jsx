"use client";

import React, { useState } from "react";
import WatchIcon from "@/components/icons/WatchIcon";
import { MarkAsWatched } from "../../../utils/MarkAsWatched";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

function MarkAsWatchedBtn({ watched, id, userId }) {
  const [watchedLecture, setWatchedLecture] = useState(watched?.includes(id));
  const router = useRouter();
  return (
    <button
      className="d-flex"
      style={{
        width: `${watchedLecture ? "140px" : "213px"}`,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `${watchedLecture ? "#eee" : ""}`,
      }}
      onClick={() => {
        setWatchedLecture(true);
        MarkAsWatched(userId, id, router);
      }}
    >
      {!watchedLecture ? (
        <>
          <WatchIcon />
          <span>Mark as Watched</span>
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faEye}
            color="#000"
            style={{ marginRight: 5 }}
          />
          <span>Watched</span>
        </>
      )}
    </button>
  );
}

export default MarkAsWatchedBtn;
