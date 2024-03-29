"use client";
import React from "react";
import Lecture from "./Lecture";
import { useFilter } from "@/hooks/useFilter";
import Link from "next/link";
import { MonthsData } from "@/utils/monthsData";
import moment from "moment";
import classNames from "classnames";

function LectureList({ user, lectures, UserDashboard = false }) {
  const { List } = useFilter({ List: lectures, user });

  if (List?.length === 0)
    return (
      <>
        <div>
          <p>Sorry, can&apos;t find any classes.</p>
          <p>
            <Link href="/lectures">Reset your filter</Link> to see what&apos;s
            available.
          </p>
        </div>
      </>
    );

  return (
    <>
      {MonthsData(UserDashboard).map(
        (
          { currentMonthName, currentYear, daysArray, today, currentMonth },
          index
        ) => (
          <div
            key={index}
            className={classNames({ "lecture-dashboard": UserDashboard })}
          >
            <div
              className="lecture_content"
              style={UserDashboard ? {} : { position: "sticky", top: 214 }}
            >
              {UserDashboard && <span className="line"></span>}

              <div
                className="date_head"
                style={{
                  paddingLeft: UserDashboard ? "28px" : "",
                }}
              >
                <span>{currentMonthName}</span>
                <span>{currentYear}</span>
              </div>
              <span className="line"></span>
            </div>

            <div style={{ marginTop: 10 }}>
              <div
                className={classNames({
                  "userdb-scroll": UserDashboard,
                })}
                style={{ width: "100%" }}
              >
                {daysArray.map((day, index) => (
                  <div
                    key={index}
                    className={classNames({
                      "mb-2": UserDashboard,
                      "mb-4": !UserDashboard,
                    })}
                    id={`${
                      day.isToday
                        ? "today"
                        : moment(`${currentMonth}/${day.day}/${currentYear}                       
                        `).format("MM-DD-YYYY")
                    }`}
                  >
                    <Lecture
                      userId={user?._id?.toString()}
                      bookmarked={user?.bookmarked}
                      userPlan={user?.plan}
                      day={day}
                      UserDashboard={UserDashboard}
                      data={
                        List && Array.isArray(List)
                          ? List.filter((lecture) => {
                              const lectureDate = new Date(lecture.date);
                              return (
                                lectureDate.getDate() === day.day &&
                                lectureDate.getMonth() === currentMonth - 1 &&
                                lectureDate.getFullYear() === currentYear
                              );
                            })
                          : []
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default LectureList;
