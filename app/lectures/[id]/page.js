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
                    <div className="practice_set">
                      <span className="practice_head">Practice Set</span>
                      <div className="row">
                        <div className="col">
                          <div className="lsat_number">
                            <span>LSAT Number</span>
                            <h5>{lecture?.lsatNumber}</h5>
                          </div>
                        </div>
                        <div className="col">
                          <div className="lsat_number">
                            <span>Section Number</span>
                            <h5>{lecture?.sectionNumber}</h5>
                          </div>
                        </div>
                        <div className="col">
                          <div className="lsat_number">
                            <span>Questions/Games</span>
                            <h5>{lecture?.QperG}</h5>
                          </div>
                        </div>
                      </div>
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
                          <span>LSAT Tutor</span>
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
                        <a
                          href="https://tidycal.com/saad.trihi"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ProfileCalendarIcon />
                          Check Availability
                        </a>
                      </button>
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
            <div className="row mt-4">
              <div className="col-12">
                <div clas="syllabus_main">
                  <div className="tutor_part">
                    <h4>
                      Tutorʼs direction
                      <span style={{ color: "rgba(56, 182, 255, 1)" }}>.</span>
                    </h4>
                    <div className="tutor_content">
                      <p>{lecture?.tutorDir}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Message */}
        <div className="chat-widget">
          <div className="chat-icon" id="chat-icon">
            <img src="https://i.ibb.co/NnnK4rB/Ellipse-5.png" alt="Chat Icon" />
            <span>
              <svg
                width={148}
                height={75}
                viewBox="0 0 139 83"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M80.1028 17.1118L80.3888 1.21646L76.2883 1.12071L76.193 9.93018C76.0976 11.175 75.8115 12.1325 75.144 12.8028C74.4765 13.4731 73.6182 13.7604 72.4739 13.7604C71.3296 13.7604 70.4714 13.3774 69.8992 12.7071C69.327 11.941 69.0409 10.9835 69.0409 9.73867L69.2317 1.02495L65.2265 0.929199V10.3132C65.2265 11.6538 65.5126 12.8986 65.9894 13.9519C66.4662 15.0052 67.2291 15.7712 68.1827 16.3458C69.1363 16.9203 70.1853 17.2076 71.425 17.2076C72.3786 17.2076 73.2368 17.0161 74.095 16.633C74.8579 16.25 75.5255 15.6755 76.0976 15.0052V17.0161L80.1028 17.1118ZM51.5901 19.9843C50.2551 19.697 49.0154 19.1225 47.9664 18.0692C46.9174 17.1116 46.1546 15.8668 45.6778 14.239C45.201 12.7069 45.1056 11.1748 45.3917 9.83423C45.6777 8.3979 46.3453 7.24884 47.2989 6.19553C48.2525 5.14223 49.4922 4.47194 50.9226 3.99317C52.353 3.51439 53.7834 3.41864 55.2138 3.7059C56.6442 3.99317 57.7885 4.5677 58.8375 5.52525C59.8865 6.4828 60.6493 7.72761 61.1262 9.35545C61.603 10.8875 61.6983 12.4196 61.4122 13.7602C61.1262 15.1965 60.4586 16.3456 59.4097 17.3989C58.4561 18.4522 57.2164 19.2182 55.6906 19.6012C54.3556 20.1758 52.9251 20.2715 51.5901 19.9843ZM56.5488 15.1965C57.0257 14.622 57.4071 14.0475 57.5025 13.1857C57.6932 12.4196 57.5978 11.5578 57.3117 10.5045C56.8349 9.06819 56.1674 8.11063 55.1184 7.5361C54.1648 6.96157 53.1159 6.86582 51.9715 7.24884C50.9226 7.63186 50.0643 8.30214 49.5875 9.2597C49.1107 10.2172 49.1107 11.4621 49.4922 12.8984C49.969 14.3347 50.6365 15.2923 51.5901 15.8668C52.5437 16.4413 53.5927 16.5371 54.6416 16.1541C55.4999 16.1541 56.072 15.771 56.5488 15.1965ZM44.724 33.5815L39.0978 8.78089L35.6648 11.2705L38.7163 22.7611L28.8942 16.154L25.2705 18.7394L39.4792 27.6446L41.2911 36.0711L44.724 33.5815ZM28.4174 40.093L19.8349 41.3378L25.6519 44.785L23.6494 48.2322L5.43551 37.6034L7.43808 34.1562L17.8324 40.1888L14.6855 32.1454L17.2602 27.6449L20.5978 37.6992L30.9921 35.5925L28.4174 40.093ZM17.8325 61.3506C18.6907 60.9676 19.549 60.2973 20.2165 59.4355C20.884 58.5737 21.4562 57.5204 21.8376 56.1798C22.1237 54.935 22.2191 53.8817 22.0283 52.8284C21.8376 51.8708 21.4562 51.009 20.884 50.3387C20.3119 49.6685 19.549 49.1897 18.6907 48.9982C17.6418 48.7109 16.7835 48.8067 16.0206 49.1897C15.2577 49.5727 14.6856 50.0515 14.2088 50.7218C13.732 51.3921 13.2552 52.2538 12.683 53.3072C12.1109 54.3605 11.634 55.0307 11.2526 55.5095C10.8712 55.9883 10.3944 56.0841 9.91756 55.9883C9.44076 55.8925 9.15468 55.6053 8.96395 55.1265C8.77323 54.6477 8.77323 54.0732 8.96395 53.4029C9.15468 52.6369 9.44076 52.0623 9.91756 51.6793C10.3944 51.2963 10.8712 51.2005 11.5387 51.2963L12.4923 47.5618C10.8712 47.2746 9.44076 47.5618 8.29643 48.4236C7.05674 49.3812 6.29386 50.7218 5.81706 52.5411C5.53098 53.7859 5.43562 54.935 5.62634 55.9883C5.81706 56.9458 6.1985 57.8076 6.77066 58.4779C7.43819 59.1482 8.10571 59.627 8.96395 59.8185C10.0129 60.1058 10.8712 60.01 11.634 59.627C12.3969 59.244 12.9691 58.7652 13.4459 58.0949C13.9227 57.4246 14.3995 56.5628 14.9717 55.5095C15.5438 54.552 16.0206 53.7859 16.4021 53.3072C16.7835 52.8284 17.2603 52.7326 17.7371 52.8284C18.2139 52.9241 18.5 53.2114 18.6907 53.6902C18.8814 54.1689 18.8814 54.7435 18.6907 55.5095C18.5 56.2756 18.1186 56.8501 17.6418 57.2331C17.0696 57.6161 16.4974 57.8076 15.9253 57.7119L14.9717 61.6378C15.9253 61.8294 16.8789 61.7336 17.8325 61.3506ZM16.6881 77.0544L16.0206 69.1067L19.7396 67.4789L19.3582 63.2657L0 72.0751L0.381442 76.7671L20.9793 82.3209L20.5979 78.1077L16.6881 77.0544ZM4.76803 73.9902L12.8737 70.4473L13.3505 76.1926L4.76803 73.9902ZM92.7857 5.04669C93.7393 4.85518 94.6929 4.85518 95.7419 5.14244L94.5022 9.16416L93.4532 8.87689C92.2136 8.49387 91.26 8.49387 90.4971 8.87689C89.7342 9.25991 89.0667 10.1217 88.6852 11.558L86.3966 19.1227L82.5821 17.9736L87.1595 2.84432L90.9739 3.99338L90.3063 6.38726C90.9739 5.71697 91.8321 5.2382 92.7857 5.04669ZM104.801 23.0485L109.188 16.7286L112.049 18.6437L113.956 15.9626L111.095 13.9517L113.384 10.696L110.046 8.39792L107.757 11.6536L106.232 10.6003L104.324 13.2814L105.85 14.3347L101.464 20.6546C99.5564 23.3357 100.033 25.7296 102.799 27.6447L104.897 29.081L106.804 26.3041L105.278 25.2508C104.801 24.8678 104.515 24.5805 104.42 24.1975C104.42 23.9102 104.515 23.5272 104.801 23.0485ZM128.069 31.2835L115.863 41.4336L113.288 38.2737L114.814 37.0288C113.956 37.0288 113.098 36.9331 112.239 36.5501C111.381 36.1671 110.714 35.5925 110.046 34.8265C109.283 33.8689 108.711 32.8156 108.52 31.7623C108.33 30.709 108.425 29.6557 108.902 28.5066C109.379 27.4533 110.141 26.4 111.19 25.5382L118.342 19.6014L120.917 22.6656L114.242 28.3151C113.288 29.0812 112.716 29.943 112.621 30.9005C112.525 31.8581 112.812 32.7199 113.479 33.5817C114.147 34.4435 115.005 34.9222 115.958 34.9222C116.912 35.018 117.866 34.635 118.819 33.7732L125.494 28.1236L128.069 31.2835ZM123.301 46.2213L130.262 43.0614L131.788 46.4128L134.744 45.0722L133.314 41.8166L136.842 40.1887L135.126 36.4543L131.598 38.0821L130.835 36.3585L127.878 37.6991L128.641 39.4227L121.68 42.5826C118.724 44.0189 117.866 46.2213 119.296 49.2854L120.345 51.5836L123.397 50.1472L122.634 48.4237C122.443 47.8491 122.348 47.3703 122.443 47.0831C122.538 46.7001 122.824 46.4128 123.301 46.2213ZM122.252 55.7012C122.729 54.3606 123.492 53.3073 124.636 52.3498C125.781 51.488 127.116 50.9134 128.737 50.6262C130.358 50.3389 131.788 50.4347 133.123 51.0092C134.458 51.488 135.603 52.3498 136.461 53.4031C137.319 54.5521 137.891 55.797 138.177 57.329C138.463 58.8611 138.368 60.2974 137.891 61.638C137.415 62.9786 136.652 64.1276 135.507 64.9894C134.363 65.947 133.028 66.5215 131.502 66.8088C129.881 67.0961 128.451 67.0003 127.116 66.4258C125.781 65.947 124.636 65.0852 123.778 63.9361C122.92 62.7871 122.348 61.4465 122.061 59.9144C121.68 58.4781 121.775 57.0418 122.252 55.7012ZM126.257 61.3507C126.734 61.9253 127.306 62.3083 128.069 62.5956C128.832 62.8828 129.69 62.8828 130.739 62.6913C132.265 62.4041 133.314 61.8295 133.982 60.9677C134.649 60.0102 134.84 59.0526 134.649 57.9036C134.458 56.7545 133.886 55.8927 132.933 55.2224C131.979 54.5521 130.835 54.3606 129.309 54.6479C127.783 54.9352 126.734 55.5097 126.067 56.3715C125.399 57.2333 125.113 58.2866 125.304 59.4356C125.494 60.1059 125.781 60.7762 126.257 61.3507ZM138.273 80.31C138.368 79.2567 138.177 78.2992 137.796 77.4374C137.415 76.5756 136.842 75.8095 136.079 75.235L138.559 75.4265L138.94 71.4048L123.206 69.8727L122.824 73.8944L130.644 74.6605C132.074 74.7562 133.028 75.235 133.6 75.9053C134.077 76.6713 134.268 77.6289 134.172 78.8737L134.077 79.927L138.273 80.31Z"
                  fill="url(#paint0_linear_59_135)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_59_135"
                    x1="2.75292"
                    y1="80.4635"
                    x2="140.465"
                    y2="79.9486"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#0041E8" />
                    <stop offset={1} stopColor="#FF3D83" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LectureById;
