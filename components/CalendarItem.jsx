"use client";
import React from "react";
import moment from "moment"; // Make sure to import the 'moment' library if not already imported.
import ICalLink from "react-icalendar-link";
import GoogleIcon from "./icons/GoogleIcon";
import IosCalendarIcon from "./icons/IosCalendarIcon";
import OutlookIcon from "./icons/OutlookIcon";
import YahooIcon from "./icons/YahooIcon";
import Link from "next/link";

function CalendarItem({ title, lectureSrc, lectureDate, endDate, event }) {
  return (
    <div className="calendar-item-container">
      {/* iCalendar */}
      <ICalLink filename={`${title}.ics`} {...{ event }}>
        <div className="d-flex gap-3 align-items-center calendar-item">
          <IosCalendarIcon />
          <span>iCalendar</span>
        </div>
      </ICalLink>
      <hr />
      {/* Google */}
      <Link
        href={`https://calendar.google.com/calendar/u/0/r/eventedit?text=${title}&details=Class: ${lectureSrc}&dates=${
          moment(lectureDate).format("YYYYMMDDTHHmmssZ") +
          "/" +
          moment(endDate).format("YYYYMMDDTHHmmssZ")
        }`}
      >
        <div className="d-flex gap-3 align-items-center calendar-item">
          <GoogleIcon />
          <span>Google</span>
        </div>
      </Link>
      <hr />

      {/* Outlook */}
      <ICalLink filename={`${title}.ics`} {...{ event }}>
        <div className="d-flex gap-3 align-items-center calendar-item">
          <OutlookIcon />
          <span>Outlook</span>
        </div>
      </ICalLink>
      <hr />

      {/* Yahoo */}
      <Link
        href={`https://calendar.yahoo.com/?v=60&et=${moment(endDate).format(
          "YYYYMMDDTHHmmss"
        )}Z&st=${moment(lectureDate).format(
          "YYYYMMDDTHHmmss"
        )}Z&title=${encodeURIComponent(
          title.replaceAll(" ", "-")
        )}&desc=Class-${encodeURIComponent(lectureSrc)}`}
      >
        <div className="d-flex gap-3 align-items-center calendar-item">
          <YahooIcon />
          <span>Yahoo</span>
        </div>
      </Link>
    </div>
  );
}

export default CalendarItem;
