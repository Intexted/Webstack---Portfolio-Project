"use client";
import { useState } from "react";
import CalendarItem from "./CalendarItem";
import CalendrierIcon from "./icons/CalendrierIcon";

function AttendBtn({ title, lectureSrc, lectureDate, endDate, event }) {
  const [DropdownCalendrierOpen, setDropdownCalendrierOpen] = useState(false);

  return (
    <>
      <div style={{ position: "relative" }}>
        <button
          className="d-flex"
          style={{
            width: "130px",
            alignItems: "center",
          }}
          onClick={() => setDropdownCalendrierOpen((value) => !value)}
        >
          <CalendrierIcon />
          <span>Attend</span>
        </button>
        {DropdownCalendrierOpen && (
          <CalendarItem
            title={title}
            lectureSrc={lectureSrc}
            lectureDate={lectureDate}
            endDate={endDate}
            event={event}
          />
        )}
      </div>
      {DropdownCalendrierOpen && (
        <div
          onClick={() => {
            setDropdownCalendrierOpen(false);
          }}
          className="modal-backdrop fade show"
        ></div>
      )}
    </>
  );
}

export default AttendBtn;
