"use client";
import Loader from "@/components/icons/Loader";
import { faTrashAlt, faEdit } from "@fortawesome/free-regular-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddVideoBtn from "./AddVideoBtn";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const VideoTable = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const RemoveVideo = async (videoId, router) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/remove-video`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId,
          }),
        }
      );
      if (!response.ok) {
        const dataApi = await response.json();
        toast.error(dataApi.err);
        return;
      }
      const dataApi = await response.json();
      toast.success(dataApi.success);
      router.refresh();
      setLoading(false);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="p-5" style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            // display: "flex",
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "100%",
            // justifyContent: "center",
            // alignItems: "center",
            zIndex: "999",
          }}
        >
          <Loader />
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Video Title</th>
            <th>Video Source</th>
            <th>Section</th>
            <th>Instructor</th>
            <th>
              <AddVideoBtn />
            </th>
          </tr>
        </thead>
        <tbody style={{ opacity: loading ? 0.3 : 1 }}>
          {JSON?.parse(data || "[]")?.map((video, index) => (
            <tr key={index}>
              <td>{video.videoTitle}</td>
              <td>{video.videoSrc}</td>
              <td>{video.section}</td>
              <td style={{ whiteSpace: "nowrap" }}>{video.instructor}</td>
              <td style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                  icon={faEdit}
                  color="#000"
                  width={25}
                  style={{ marginRight: 7, cursor: "pointer" }}
                  onClick={() => router.push(`/dashboard/videos/${video._id}`)}
                />
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  color="#000"
                  width={25}
                  style={{ marginRight: 7, cursor: "pointer" }}
                  onClick={() => RemoveVideo(video._id, router)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;
