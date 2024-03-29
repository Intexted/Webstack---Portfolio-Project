"use client";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Checked from "@/components/icons/Checked";
import moment from "moment";
import Link from "next/link";

function CoursesVideos({ videos, sections }) {
  const [section, setSection] = useState("Free Classes");
  const [sessionVideos, setsessionVideos] = useState(
    JSON?.parse(videos || "[]")
  );
  const [category, setCategory] = useState("");
  const myItem = sections.find((item) => item.name === section);

  return (
    <>
      <div
        className="d-flex "
        style={{
          //   flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "30px",
          paddingRight: "20px",
          gap: "38px",
        }}
      >
        {sections.map((item, index) => (
          <div
            key={item}
            style={{
              textAlign: "center",
              width: "180px",
              cursor: "pointer",
            }}
            className={`section-item ${section === item.name ? "active" : ""}`}
            onClick={() => {
              setSection(item.name);
              setCategory("");
            }}
          >
            <img
              src={item.sectionImg}
              style={{
                width: "200px",
                height: "316px",
                borderRadius: "20px",
                marginBottom: "8px",
                objectFit: "cover",
              }}
            />
            <h5
              style={{
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: "24px",
                letterSpacing: "0em",
                textAlign: "center",
                width: "200px",
                height: "24px",
                color: section === item.name ? "#38b6ff" : "",
              }}
            >
              {item.name}
            </h5>
          </div>
        ))}
      </div>
      <div
        className="lecture_content"
        style={{ position: "sticky", top: 198, display: "block" }}
      >
        <hr />
        <div
          style={{
            margin: "0px 0 0px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: 15,
            // paddingLeft: "56px",
          }}
        >
          <h3
            style={{
              whiteSpace: "nowrap",
              marginTop: "8px",
              fontFamily: "Poppins",
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: "54px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            {section}
          </h3>
          <div
            className="d-flex gap-2"
            style={{ alignItems: "center", width: "auto", overflow: "auto" }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              color="#000"
              style={{ marginRight: 5, marginTop: 4 }}
            />
            <div className="d-flex gap-3" style={{ overflow: "auto" }}>
              <div className="select_section d-flex">
                <button
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    width: "auto",
                    backgroundColor: category === "" ? "#ff3b30" : "",
                    color: category === "" ? "#fff" : "#000",
                    border: category === "" && "none",
                  }}
                  onClick={() => setCategory("")}
                >
                  <span>All Categories</span>
                </button>
              </div>
              {myItem?.categories?.split(",").map((item) => (
                <div key={item} className="select_section d-flex">
                  <button
                    style={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      fontFamily: "Poppins",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                      width: "auto",
                      backgroundColor: category === item ? "#ff3b30" : "",
                      color: category === item ? "#fff" : "#000",
                      border: category === item && "none",
                    }}
                    onClick={() => setCategory(item)}
                  >
                    <span>{item}</span>
                  </button>
                </div>
              ))}
            </div>
            <FontAwesomeIcon
              icon={faChevronRight}
              color="#000"
              style={{ marginRight: 5, marginTop: 4 }}
            />
          </div>
        </div>
        <hr />
      </div>
      <div
        className="d-flex gap-3"
        style={{
          flexWrap: "wrap",
          marginTop: "50px",
        }}
      >
        {sessionVideos?.map(
          (item, index) =>
            item.section === section &&
            (category === "" ? (
              <Link
                key={item + index}
                href={`/courses/${item._id}`}
                style={{
                  width: " 264px",
                  height: "310.27px",
                  borderRadius: "22.83px",
                  position: "relative",
                  backgroundColor: "#242730",
                }}
              >
                <img
                  src={item?.videoImage}
                  alt=""
                  style={{
                    height: "50%",
                    width: "100%",
                    borderTopLeftRadius: "22.83px",
                    borderTopRightRadius: "22.83px",
                  }}
                />
                <div
                  style={{
                    height: "50%",
                    borderBottomLeftRadius: "22.83px",
                    backgroundColor: "#242730",
                    borderBottomRightRadius: "22.83px",
                    color: "#FFF",
                    padding: "45px 20px 20px 20px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: " Poppins",
                      fontSize: "18px",
                      fontWeight: 500,
                      lineHeight: "30px",
                      letterSpacing: "0.34242701530456543px",
                      textAlign: "left",
                    }}
                  >
                    {item.videoTitle}
                  </h3>
                  <span style={{ color: "#808191" }}>
                    53K views • {moment(item.createdAt).fromNow()}
                  </span>
                </div>
                <span
                  className=""
                  style={{
                    width: "52.51px",
                    height: "22.83px",
                    opacity: 0.5,
                    borderRadius: "8px",
                    backgroundColor: "#242730",
                    color: "#fff",
                    fontFamily: "Poppins",
                    fontSize: "11px",
                    fontWeight: 500,
                    lineHeight: "11px",
                    letterSpacing: "0.5707116723060608px",
                    display: "flex",
                    justifyContent: "center" /* Horizontal centering */,
                    alignItems: "center",
                    padding: 4,
                    position: "absolute",
                    top: "12px",
                    right: "10px",
                  }}
                >
                  {item?.videoDuration} min
                </span>
                <div
                  className="align-middle"
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    border: "1px solid #d6d6db",
                    position: "absolute",
                    top: "42%",
                    right: "12px",
                    display: "flex",
                    justifyContent: "center" /* Horizontal centering */,
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item?.avatarSrc}
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                    }}
                    alt=""
                  />
                  <Checked />
                </div>
              </Link>
            ) : (
              category === item.categories && (
                <Link
                  key={item + index}
                  href={`/courses/${item._id}`}
                  style={{
                    width: " 264px",
                    height: "310.27px",
                    borderRadius: "22.83px",
                    position: "relative",
                    backgroundColor: "#242730",
                  }}
                >
                  <img
                    src={item?.videoImage}
                    alt=""
                    style={{
                      height: "50%",
                      width: "100%",
                      borderTopLeftRadius: "22.83px",
                      borderTopRightRadius: "22.83px",
                    }}
                  />
                  <div
                    style={{
                      height: "50%",
                      borderBottomLeftRadius: "22.83px",
                      backgroundColor: "#242730",
                      borderBottomRightRadius: "22.83px",
                      color: "#FFF",
                      padding: "45px 20px 20px 20px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: " Poppins",
                        fontSize: "18px",
                        fontWeight: 500,
                        lineHeight: "30px",
                        letterSpacing: "0.34242701530456543px",
                        textAlign: "left",
                      }}
                    >
                      {item.videoTitle}
                    </h3>
                    <span style={{ color: "#808191" }}>
                      53K views • {moment(item.createdAt).fromNow()}
                    </span>
                  </div>
                  <span
                    className=""
                    style={{
                      width: "52.51px",
                      height: "22.83px",
                      opacity: 0.5,
                      borderRadius: "8px",
                      backgroundColor: "#242730",
                      color: "#fff",
                      fontFamily: "Poppins",
                      fontSize: "11px",
                      fontWeight: 500,
                      lineHeight: "11px",
                      letterSpacing: "0.5707116723060608px",
                      display: "flex",
                      justifyContent: "center" /* Horizontal centering */,
                      alignItems: "center",
                      padding: 4,
                      position: "absolute",
                      top: "12px",
                      right: "10px",
                    }}
                  >
                    {item?.videoDuration} min
                  </span>
                  <div
                    className="align-middle"
                    style={{
                      width: "68px",
                      height: "68px",
                      borderRadius: "50%",
                      border: "1px solid #d6d6db",
                      position: "absolute",
                      top: "42%",
                      right: "12px",
                      display: "flex",
                      justifyContent: "center" /* Horizontal centering */,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item?.avatarSrc}
                      style={{
                        width: "55px",
                        height: "55px",
                        borderRadius: "50%",
                      }}
                      alt=""
                    />
                    <Checked />
                  </div>
                </Link>
              )
            ))
        )}
      </div>
    </>
  );
}

export default CoursesVideos;
