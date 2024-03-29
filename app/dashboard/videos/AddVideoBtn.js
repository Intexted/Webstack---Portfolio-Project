"use client";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function AddVideoBtn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <div
      style={{
        top: 0,
        right: 0,
        border: "1px solid #000",
        borderRadius: 5,
        padding: 5,
        cursor: "pointer",
        fontWeight: 600,
        textAlign: "center",
        width: 150,
        margin: "auto",
      }}
      onClick={() => router.push("/dashboard/videos/new")}
    >
      <FontAwesomeIcon
        icon={faPlusSquare}
        color="#000"
        width={25}
        style={{ marginRight: 3 }}
      />
      Add a Video
    </div>
  );
}

export default AddVideoBtn;
