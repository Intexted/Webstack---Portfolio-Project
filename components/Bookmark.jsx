"use client";
import React, { useState } from "react";
import BookmarkIcon from "./icons/BookmarkIcon";
import { useRouter } from "next/navigation";
import { ToggleBookmark } from "@/utils/BookmarkToggle";

function Bookmark({ bookmarked, userId, id }) {
  const [active, setActive] = useState(bookmarked?.includes(id));
  const router = useRouter();

  return (
    <button
      onClick={() => {
        setActive((active) => !active);
        ToggleBookmark(userId, id, active, router);
      }}
    >
      <BookmarkIcon active={active} />
    </button>
  );
}

export default Bookmark;
