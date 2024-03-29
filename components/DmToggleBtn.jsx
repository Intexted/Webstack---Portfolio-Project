"use client";
import React from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

function DmToggleBtn() {
  return (
    <div className="d-flex gap-1 mt-2">
      <span>Dark Mode</span>
      <div>
        <label className="toggle-container">
          <input
            type="checkbox"
            className="toggle-input"
            id="dark-mode-toggle"
            onClick={() => {
              document.body.classList.toggle("dark-mode");
              getCookie("dark-mode")
                ? deleteCookie("dark-mode")
                : setCookie("dark-mode", "active");
            }}
          />
          <span className="toggle-slider" />
        </label>
      </div>
    </div>
  );
}

export default DmToggleBtn;
