"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();
  return (
    <div
      className="d-flex"
      onClick={() => {
        deleteCookie("rememberMe");
        router.refresh();
        signOut({ callbackUrl: "/" });
      }}
      style={{ alignItems: "center", cursor: "pointer" }}
    >
      {" "}
      <h5>
        <FontAwesomeIcon icon={faSignOut} color="#000" width={20} />
      </h5>
    </div>
  );
}

export default Logout;
