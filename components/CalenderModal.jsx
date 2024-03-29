"use client";
import moment from "moment";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalenderModal({ setCalendrierOpen }) {
  const [value, onChange] = useState(new Date());

  return (
    <Calendar
      onChange={onChange}
      value={value}
      locale="en-GB"
      onClickDay={(value, event) => {
        setCalendrierOpen(false);

        const formattedDate = moment(value).format("MM-DD-YYYY");
        console.log(formattedDate);
        const targetElement = document.getElementById(formattedDate);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 250,
            behavior: "smooth",
          });
        }
      }}
    />
  );
}

export default CalenderModal;
