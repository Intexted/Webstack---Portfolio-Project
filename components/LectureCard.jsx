"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToggleBookmark } from "@/utils/BookmarkToggle";
import Link from "next/link";
import moment from "moment";
import BookmarkIcon from "./icons/BookmarkIcon";
import InformationIcon from "./icons/InformationIcon";
import MessageIcon from "./icons/MessageIcon";
import WatchIcon from "./icons/WatchIcon";
import RegisterIcon from "./icons/RegisterIcon";
import AttendBtn from "./AttendBtn";
import classNames from "classnames";

const LectureCard = ({
  title,
  startTime,
  endTime,
  avatarSrc,
  instructor,
  section,
  level,
  lectureSrc,
  free = false,
  id,
  userId,
  bookmarked,
  userPlan,
  lectureDate,
  endDate,
  UserDashboard,
}) => {
  const [active, setActive] = useState(bookmarked?.includes(id));
  const router = useRouter();

  const event = {
    title,
    description: `Class: ${lectureSrc}`,
    startTime: lectureDate,
    endTime: endDate,
  };

  // Calculate the duration in minutes
  let durationMinutes = moment(endDate).diff(lectureDate, "minutes");

  // Calculate hours and minutes
  let hours = Math.floor(durationMinutes / 60);
  let minutes = durationMinutes % 60;

  // Create a string based on the conditions
  let durationString = "Duration: ";
  if (hours === 1) {
    durationString += "1 hour";
  } else if (hours > 1) {
    durationString += hours + " hours";
  }

  if (minutes > 0) {
    if (hours > 0) {
      durationString += " and ";
    }
    durationString += minutes + " minutes";
  }

  return (
    <>
      <div className="d-flex gap-3 align-items-center">
        <div
          className={classNames({
            game_lecture: true,
          })}
        >
          <p
            style={{
              fontWeight: "600",
              whiteSpace: "nowrap",
            }}
            title={title}
          >
            <Link href={`/lectures/${id}`}>{title}</Link>
          </p>
          <p style={{ whiteSpace: "nowrap" }}>
            {moment(startTime, "HH:mm").format("h:mm a")} -{" "}
            {moment(endTime, "HH:mm").format("h:mm a")}
          </p>
          {!UserDashboard && <p>{durationString}</p>}
        </div>

        <div
          className={classNames({
            "mt-2": !UserDashboard,
            " d-flex align-items-center": true,
          })}
          style={{ gap: "15px", flex: 1, justifyContent: "space-around" }}
        >
          {!UserDashboard && (
            <div className="avatar_section">
              <div className="text-center">
                <img className="img-fluid" src={avatarSrc} alt="Avatar" />
              </div>
              <p
                style={{
                  fontWeight: "400",
                  whiteSpace: "nowrap",
                }}
                title={instructor}
              >
                {instructor}
              </p>
            </div>
          )}
          <div className="">
            <span style={{ display: "block" }}>Section</span>
            <div
              className={classNames({
                lr_section: !UserDashboard,
                lr_userdb_section: UserDashboard,
              })}
            >
              {section.map((s, index) => (
                <button
                  key={index}
                  className={`btn btn-primary ${s.active ? "active" : ""}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="">
            <span style={{ display: "block" }}>Level</span>
            <div className="level_main">
              <div
                className={`level_one ${level >= 1 ? "active" : ""}`}
                style={UserDashboard ? { width: 20, height: 7 } : {}}
              />
              <div
                className={`level_two ${level >= 2 ? "active" : ""}`}
                style={UserDashboard ? { width: 20, height: 7 } : {}}
              />
              <div
                className={`level_three ${level >= 3 ? "active" : ""}`}
                style={UserDashboard ? { width: 20, height: 7 } : {}}
              />
            </div>
          </div>

          <div>
            <div className="comment_main d-flex">
              <button
                onClick={() => {
                  setActive((active) => !active);
                  ToggleBookmark(userId, id, active, router);
                }}
                style={UserDashboard ? { padding: "9px 6px" } : {}}
              >
                <BookmarkIcon active={active} />
              </button>
              {!UserDashboard && (
                <>
                  <button>
                    <MessageIcon />
                  </button>
                  <button>
                    <Link href={`/lectures/${id}`}>
                      <InformationIcon />
                    </Link>
                  </button>
                </>
              )}
            </div>
          </div>

          {!UserDashboard && userPlan === "free" && (
            <div className="watch">
              {free && moment(lectureDate).utc().fromNow().includes("ago") ? (
                <Link href={lectureSrc}>
                  <button
                    className="d-flex"
                    style={{
                      width: "130px",
                      height: "48px",
                      alignItems: "center",
                    }}
                  >
                    <WatchIcon />
                    <span>Watch</span>
                  </button>
                </Link>
              ) : free &&
                !moment(lectureDate).utc().fromNow().includes("ago") ? (
                <AttendBtn
                  title={title}
                  lectureSrc={lectureSrc}
                  lectureDate={lectureDate}
                  endDate={endDate}
                  event={event}
                />
              ) : (
                <Link href="/register">
                  <button className="d-flex" style={{ width: "130px" }}>
                    <RegisterIcon />
                    <span>Register</span>
                  </button>
                </Link>
              )}
            </div>
          )}
          {!UserDashboard && userPlan === "premium" && (
            <div className="watch">
              {moment(lectureDate).utc().fromNow().includes("ago") ? (
                <Link href={lectureSrc}>
                  <button
                    className="d-flex"
                    style={{
                      width: "130px",
                      height: "48px",
                      alignItems: "end",
                      justifyContent: "center",
                    }}
                  >
                    <WatchIcon />
                    <span>Watch</span>
                  </button>
                </Link>
              ) : (
                <AttendBtn
                  title={title}
                  lectureSrc={lectureSrc}
                  lectureDate={lectureDate}
                  endDate={endDate}
                  event={event}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LectureCard;
