import React from "react";
import LectureCard from "./LectureCard";

const Lecture = ({
  day,
  data,
  userId,
  bookmarked,
  userPlan,
  UserDashboard,
}) => {
  return (
    <div className="d-flex gap-2 align-items-start">
      {day.isToday ? (
        <div className="date_box-index">
          <span className="day_content">{day.dayName}</span>
          <span className="date_content">{day.day}</span>
        </div>
      ) : (
        <div className="square_box" style={{ textAlign: "center" }}>
          <span className="day_boxcontent">
            <span style={{ color: "rgba(255, 59, 48, 1)" }}>{day.dayName}</span>
          </span>

          <span className="date_boxcontent">{day.day}</span>
        </div>
      )}
      {data?.length === 0 ? (
        <div className="no_class mb-2" style={{ width: "100%" }}>
          <h4>No classes for today</h4>
        </div>
      ) : (
        <div
          className="lecture_pone lecture_partone"
          style={{ flex: 1, overflow: "auto" }}
        >
          {data.map((lecture, index) => (
            <React.Fragment key={index}>
              {index != 0 && <hr />}
              <LectureCard
                UserDashboard={UserDashboard}
                bookmarked={bookmarked}
                userId={userId}
                userPlan={userPlan}
                id={lecture._id}
                title={lecture.title}
                startTime={lecture.startTime}
                endTime={lecture.endTime}
                duration="Duration: 1 hour"
                avatarSrc={lecture.avatarSrc}
                instructor={lecture.instructor}
                section={[
                  {
                    label: "LR",
                    active: !lecture?.section?.includes("Logical Reasoning")
                      ? false
                      : true,
                  },
                  {
                    label: "LG",
                    active: !lecture?.section?.includes("Logic Games")
                      ? false
                      : true,
                  },
                  {
                    label: "RC",
                    active: !lecture?.section?.includes("Reading Comp")
                      ? false
                      : true,
                  },
                ]}
                level={lecture.level}
                lectureSrc={lecture.lectureSrc}
                free={lecture.free}
                lectureDate={lecture.date}
                endDate={lecture.endDate}
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Lecture;
