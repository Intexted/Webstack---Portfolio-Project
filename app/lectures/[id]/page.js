import actions from "@/actions";
import AttendBtn from "@/components/AttendBtn";
import Bookmark from "@/components/Bookmark";
import VideoPlayer from "@/components/VideoPlayer";
import InfoHaderDurationIcon from "@/components/icons/InfoHaderDurationIcon";
import InfoHaderWatchIcon from "@/components/icons/InfoHaderWatchIcon";
import InfoHeaderCalendarIcon from "@/components/icons/InfoHeaderCalendarIcon";
import PaperClipIcon from "@/components/icons/PaperClipIcon";
import PdfIcon from "@/components/icons/PdfIcon";
import ProfileCalendarIcon from "@/components/icons/ProfileCalendarIcon";
import QuestionIcon from "@/components/icons/QuestionIcon";
import RegisterIcon from "@/components/icons/RegisterIcon";
import WatchIcon from "@/components/icons/WatchIcon";
import "@/styles/lecture.css";
import "@/styles/lectures.css";
import { authOptions } from "@/utils/authOptions";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import MarkAsWatchedBtn from "./MarkAsWatchedBtn";

async function LectureById({ params }) {
  const session = await getServerSession(authOptions);
  const user = await actions.GetProfile(session?.user?._id);
  const lecture = await actions.getLectureData(params.id);

  if (lecture === null) notFound();

  const event = {
    title: lecture.title,
    description: `Class: ${lecture.lectureSrc}`,
    startTime: lecture.date,
    endTime: lecture.endDate,
  };

  let section = [
    {
      label: "LR",
      active: !lecture?.section?.includes("Logical Reasoning") ? false : true,
    },
    {
      label: "LG",
      active: !lecture?.section?.includes("Logic Games") ? false : true,
    },
    {
      label: "RC",
      active: !lecture?.section?.includes("Reading Comp") ? false : true,
    },
  ];

  // Calculate the duration in minutes
  let durationMinutes = moment(lecture?.endDate).diff(lecture?.date, "minutes");

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
    <section id="main_two" className="single-lecture header_main">
      <div className="container">
        <div className="header-container d-flex align-items-center mb-3">
          <Link href="/lectures">
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ height: "30px", cursor: "pointer" }}
            />
          </Link>
          <div className="header-left">
            <div id="single" className="date_box">
              <span className="day_content">
                {moment(lecture?.date).format("ddd").toUpperCase()}
              </span>
              <br />
              <span className="date_content">
                {moment(lecture?.date).format("D")}
              </span>
            </div>
          </div>
          <div className="header-right" style={{ flex: 1 }}>
            <div className="lecture_partone">
              <div className="row">
                <div className="col">
                  <div className="lecture_head">
                    <h1>
                      {lecture?.title}
                      <span style={{ color: "rgba(56, 182, 255, 1)" }}>.</span>
                    </h1>
                  </div>
                  <div className="bookmark_part">
                    <div className="comment_main">
                      <Bookmark
                        id={lecture?._id?.toString()}
                        userId={user?._id?.toString()}
                        bookmarked={user?.bookmarked}
                      />
                    </div>
                    {user.plan === "free" && (
                      <div className="watch">
                        {lecture?.free &&
                        moment(lecture?.date).fromNow().includes("ago") ? (
                          <MarkAsWatchedBtn
                            id={lecture?._id?.toString()}
                            userId={user?._id?.toString()}
                            watched={user?.watched}
                          />
                        ) : lecture?.free &&
                          !moment(lecture?.date).fromNow().includes("ago") ? (
                          <AttendBtn
                            title={lecture.title}
                            lectureSrc={lecture.lectureSrc}
                            lectureDate={lecture.date}
                            endDate={lecture.endDate}
                            event={event}
                          />
                        ) : (
                          <Link href="/register">
                            <button
                              className="d-flex"
                              style={{ width: "130px" }}
                            >
                              <RegisterIcon />
                              <span>Register</span>
                            </button>
                          </Link>
                        )}
                      </div>
                    )}

                    {user.plan === "premium" && (
                      <div className="watch">
                        {moment(lecture?.date).fromNow().includes("ago") ? (
                          <Link href={lecture?.lectureSrc}>
                            <button
                              className="d-flex"
                              style={{
                                width: "300px",
                                alignItems: "end",
                                justifyContent: "center",
                              }}
                            >
                              <WatchIcon />
                              <span>Mark as Watched</span>
                            </button>
                          </Link>
                        ) : (
                          <AttendBtn
                            title={lecture.title}
                            lectureSrc={lecture.lectureSrc}
                            lectureDate={lecture.date}
                            endDate={lecture.endDate}
                            event={event}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <div className="calender_content">
                    <p style={{ whiteSpace: "nowrap" }}>
                      <InfoHeaderCalendarIcon />
                      {moment(lecture?.date).format("dddd, D MMMM, YYYY")}
                    </p>
                    <p>
                      <InfoHaderWatchIcon />
                      {moment(lecture?.startTime, "HH:mm").format(
                        "h:mm a"
                      )} - {moment(lecture?.endTime, "HH:mm").format("h:mm a")}
                    </p>
                    <p>
                      <InfoHaderDurationIcon />
                      {durationString}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {moment(lecture?.date).fromNow().includes("ago") &&
          (user.plan === "premium" || lecture?.free) && <VideoPlayer />}
        <div className="row mt-4" style={{ gap: "20px" }}>
          <div className="col-md">
            <div className="row">
              <div className="col-12">
                <div clas="syllabus_main">
                  <div className="syllabus_part">
                    <h2>
                      Syllabus
                      <span
                        style={{
                          color: "rgba(56, 182, 255, 1)",
                          fontSize: 30,
                        }}
                      >
                        .
                      </span>
                    </h2>
                    <span>Name</span>
                    <p>Game of the day</p>
                    <div className="main_dif">
                      <div>
                        <span style={{ display: "block" }}>Section</span>
                        <div className="lr_section">
                          {section.map((s, index) => (
                            <button
                              key={index}
                              className={`btn btn-primary ${
                                s.active ? "active" : ""
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span style={{ display: "block" }}>Level</span>
                        <div className="level_main">
                          <div
                            className={`level_one ${
                              lecture?.level >= 1 ? "active" : ""
                            }`}
                          />
                          <div
                            className={`level_two ${
                              lecture?.level >= 2 ? "active" : ""
                            }`}
                          />
                          <div
                            className={`level_three ${
                              lecture?.level >= 3 ? "active" : ""
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span>Lesson &amp; Skill</span>
                      <p>{lecture?.lessonAndSkill}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div clas="syllabus_main">
                  <div className="description_part">
                    <h2>
                      Description
                      <span style={{ color: "rgba(56, 182, 255, 1)" }}>.</span>
                    </h2>
                    <p>{lecture?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md">
            <div className="row">
              <div className="col-12">
                <div clas="syllabus_main">
                  <div className="profile_part">
                    <div className="d-flex gap-2">
                      <div className="">
                        <img
                          src="https://i.ibb.co/Xk3PPyH/Ellipse-2.png"
                          alt="Profile Avatar"
                        />
                      </div>
                      <div className="">
                        <div className="profile_content">
                          <h5>Saul Ramirez</h5>
                          <span>Tutor</span>
                        </div>
                      </div>
                    </div>
                    <p className="profile_para">
                      Lorem ipsum dolor sit amet consectetur. Et viverra lectus
                      in bibendum. Maecenas vitae eget mauris nec vivamus. Et
                      nulla eu quam Lorem ipsum dolor sit amet consectetur. Et
                      viverra lectus in bibendum. Maecenas vitae.
                    </p>
                    <div className="profile_btn ">
                      <button
                        className="btn d-flex"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <QuestionIcon />
                        Ask Your Tutor
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div clas="syllabus_main">
                  <div className="assgn_part">
                    <h4>
                      Assignments
                      <span style={{ color: "rgba(56, 182, 255, 1)" }}>.</span>
                    </h4>
                    <div className="assgn_link">
                      <div className="row mt-3">
                        <div className="col-lg-6">
                          <p>
                            <PdfIcon />
                            <a
                              className="pdf_print"
                              href={`${lecture?.pdfUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span>Ready to print pdf</span>
                            </a>
                          </p>
                        </div>
                        <div className="col-lg-6">
                          <p>
                            <PaperClipIcon />
                            <a className="link_print" href="#">
                              <span>Digital Link</span>
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LectureById;
