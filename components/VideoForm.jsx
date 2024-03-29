"use client";
import { useEdgeStore } from "@/lib/edgestore";
import { faArrowLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const VideoForm = ({ video, sections }) => {
  const defaultVals = JSON?.parse(video || "null");
  const { handleSubmit, register } = useForm({ defaultValues: defaultVals });
  const router = useRouter();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [file, setFile] = useState();
  const { edgestore } = useEdgeStore();

  console.log();

  const [homeworks, setHomeworks] = useState(
    defaultVals
      ? defaultVals.addHomeworks
      : [
          {
            title: "",
            description: "",
            pdfLink: "",
            digitalLink: "",
            AllottedTime: "",
          },
        ]
  );
  const [assignments, setAssignments] = useState(
    defaultVals
      ? defaultVals.assignments
      : [
          {
            title: "",
            description: "",
            pdfLink: "",
            digitalLink: "",
            AllottedTime: "",
          },
        ]
  );
  const [chapters, setChapters] = useState(
    defaultVals ? defaultVals.chapters : [{ title: "", time: "" }]
  );
  const [selectedSection, setSelectedSection] = useState(
    defaultVals ? defaultVals.section : ""
  ); // State for selected section
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected section
  const [loading, setLoading] = useState(false);
  // console.log(
  //   sections
  //     .find((section) => section.name === selectedSection)
  //     ?.categories.split(",")
  // );

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/${
          defaultVals?._id ? "edit" : "add"
        }-video`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: defaultVals?._id,
            classDetail: data.classDetail,
            instructor: data.instructor,
            instructorJob: data.instructorJob,
            avatarSrc: data.avatarSrc,
            section: data.section,
            categories: data.categories,
            videoSrc: data.videoSrc,
            videoTitle: data.videoTitle,
            videoImage: data.videoImage,
            videoDuration: data.videoDuration,
            addHomeworks: homeworks,
            assignments,
            chapters,
          }),
        }
      );
      setLoading(false);
      toast.success(
        defaultVals?._id
          ? "Video Updated Successfully"
          : "Video Added Successfully"
      );
      router.refresh();
      router.push("/dashboard/videos");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleHomeworkChange = (index, field, value) => {
    const newHomeworks = [...homeworks];
    newHomeworks[index][field] = value;
    setHomeworks(newHomeworks);
  };

  const handleAssignmentChange = (index, field, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][field] = value;
    setAssignments(newAssignments);
  };

  const handleChapterChange = (index, field, value) => {
    const newChapters = [...chapters];
    newChapters[index][field] = value;
    setChapters(newChapters);
  };

  const addHomework = () => {
    setHomeworks([
      ...homeworks,
      { title: "", description: "", pdfLink: "", digitalLink: "" },
    ]);
  };

  const addAssignment = () => {
    setAssignments([
      ...assignments,
      { title: "", description: "", pdfLink: "", digitalLink: "" },
    ]);
  };

  const addChapter = () => {
    setChapters([...chapters, { title: "", time: "" }]);
  };

  const removeHomework = (index) => {
    const newHomeworks = [...homeworks];
    newHomeworks.splice(index, 1);
    setHomeworks(newHomeworks);
  };

  const removeAssignment = (index) => {
    const newAssignments = [...assignments];
    newAssignments.splice(index, 1);
    setAssignments(newAssignments);
  };

  const removeChapter = (index) => {
    const newChapters = [...chapters];
    newChapters.splice(index, 1);
    setChapters(newChapters);
  };

  return (
    <div className="container mt-5">
      <h2>Add Video Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="videoTitle" className="col-sm-2 col-form-label">
            Video Title:
          </label>
          <div className="col-sm-10">
            <input
              {...register("videoTitle")}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoImage" className="col-sm-2 col-form-label">
            Video Image:
          </label>
          <div className="col-sm-10">
            <input
              {...register("videoImage")}
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="videoSrc" className="col-sm-2 col-form-label">
            Video Source:
          </label>
          <div className="col-sm-10">
            <input
              {...register("videoSrc")}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="videoDuration" className="col-sm-2 col-form-label">
            Video Duration:
          </label>
          <div className="col-sm-10">
            <input
              {...register("videoDuration")}
              type="number"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="section" className="col-sm-2 col-form-label">
            Section:
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              {...register("section")}
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
            >
              <option value="" disabled>
                Select a section
              </option>
              {sections?.map((section, index) => (
                <option key={index} value={section.name}>
                  {section.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="categories" className="col-sm-2 col-form-label">
            Category:
          </label>
          <div className="col-sm-10">
            <select
              className="form-control"
              {...register("categories")}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="" disabled>
                Select a Category
              </option>
              {selectedSection != "" &&
                sections
                  .find((section) => section.name === selectedSection)
                  ?.categories.split(",")
                  .map((section, index) => (
                    <option key={index} value={section}>
                      {section}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="instructor" className="col-sm-2 col-form-label">
            Instructor:
          </label>
          <div className="col-sm-10">
            <input
              {...register("instructor")}
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="instructorJob" className="col-sm-2 col-form-label">
            Instructor Job:
          </label>
          <div className="col-sm-10">
            <input
              {...register("instructorJob")}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="avatarSrc" className="col-sm-2 col-form-label">
            Instructor Avatar:
          </label>
          <div className="col-sm-10">
            <input
              {...register("avatarSrc")}
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="classDetail" className="col-sm-2 col-form-label">
            Class Detail:
          </label>
          <div className="col-sm-10">
            <textarea {...register("classDetail")} className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 col-form-label">Homework:</label>
          <div className="col-sm-10">
            {homeworks?.map((homework, index) => (
              <div key={index} className="mb-3">
                <h6>Homework #{index + 1}</h6>
                <input
                  type="text"
                  value={homework.title}
                  onChange={(e) =>
                    handleHomeworkChange(index, "title", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Homework Title"
                />
                <textarea
                  value={homework.description}
                  onChange={(e) =>
                    handleHomeworkChange(index, "description", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Homework Description"
                />
                <div
                  className="d-flex gap-2 mb-2"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="free">Pdf upload</label>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files?.[0]);
                      }}
                    />
                    <button
                      type="button"
                      className="btn d-flex"
                      style={{
                        backgroundColor: "blue",
                        width: "100px",
                        color: "#fff",
                        alignItems: "center",
                      }}
                      onClick={async () => {
                        if (file) {
                          setUploadLoading(true);
                          const res = await edgestore.publicFiles.upload({
                            file,
                            options: {
                              temporary: true,
                            },
                            onProgressChange: (progress) => {
                              // you can use this to show a progress bar
                              console.log(progress);
                            },
                          });
                          handleHomeworkChange(index, "pdfLink", res.url);
                          setUploadLoading(false);
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUpload}
                        color="#fff"
                        width={25}
                      />
                      {uploadLoading ? "Loading ..." : "Upload"}
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={homework.pdfLink}
                  onChange={(e) =>
                    handleHomeworkChange(index, "pdfLink", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="PDF Link"
                />
                <input
                  type="number"
                  value={homework.AllottedTime}
                  onChange={(e) =>
                    handleHomeworkChange(index, "AllottedTime", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Allotted Time"
                />
                <input
                  type="text"
                  value={homework.digitalLink}
                  onChange={(e) =>
                    handleHomeworkChange(index, "digitalLink", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Digital Link"
                />

                {index != 0 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeHomework(index)}
                  >
                    Remove Homework
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mb-2"
              onClick={addHomework}
            >
              Add Homework
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="col-sm-2 col-form-label">Assignments:</label>
          <div className="col-sm-10">
            {assignments?.map((assignment, index) => (
              <div key={index} className="mb-3">
                <h6>Assignment #{index + 1}</h6>
                <input
                  type="text"
                  value={assignment.title}
                  onChange={(e) =>
                    handleAssignmentChange(index, "title", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Assignment Title"
                />
                <textarea
                  value={assignment.description}
                  onChange={(e) =>
                    handleAssignmentChange(index, "description", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Assignment Description"
                />
                <div
                  className="d-flex gap-2 mb-2"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="free">Pdf upload</label>
                  <div className="d-flex align-items-center gap-2">
                    <input
                      type="file"
                      onChange={(e) => {
                        setFile(e.target.files?.[0]);
                      }}
                    />
                    <button
                      type="button"
                      className="btn d-flex"
                      style={{
                        backgroundColor: "blue",
                        width: "100px",
                        color: "#fff",
                        alignItems: "center",
                      }}
                      onClick={async () => {
                        if (file) {
                          setUploadLoading(true);
                          const res = await edgestore.publicFiles.upload({
                            file,
                            options: {
                              temporary: true,
                            },
                            onProgressChange: (progress) => {
                              // you can use this to show a progress bar
                              console.log(progress);
                            },
                          });
                          handleAssignmentChange(index, "pdfLink", res.url);
                          setUploadLoading(false);
                        }
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faUpload}
                        color="#fff"
                        width={25}
                      />
                      {uploadLoading ? "Loading ..." : "Upload"}
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  value={assignment.pdfLink}
                  onChange={(e) =>
                    handleAssignmentChange(index, "pdfLink", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="PDF Link"
                />

                <input
                  type="number"
                  value={assignment.AllottedTime}
                  onChange={(e) =>
                    handleAssignmentChange(
                      index,
                      "AllottedTime",
                      e.target.value
                    )
                  }
                  className="form-control mb-2"
                  placeholder="Allotted Time"
                />
                <input
                  type="text"
                  value={assignment.digitalLink}
                  onChange={(e) =>
                    handleAssignmentChange(index, "digitalLink", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Digital Link"
                />
                {index != 0 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ alignSelf: "self-end" }}
                    onClick={() => removeAssignment(index)}
                  >
                    Remove Assignment
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary mb-2"
              onClick={addAssignment}
            >
              Add Assignment
            </button>
          </div>
        </div>

        <div className="form-group mb-2">
          <label className="col-sm-2 col-form-label">Chapters:</label>
          <div className="col-sm-10">
            {chapters?.map((chapter, index) => (
              <div key={index} className="mb-3">
                <h6>Chapter #{index + 1}</h6>
                <input
                  type="text"
                  value={chapter.title}
                  onChange={(e) =>
                    handleChapterChange(index, "title", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Chapter Title"
                />
                <input
                  type="text"
                  value={chapter.time}
                  onChange={(e) =>
                    handleChapterChange(index, "time", e.target.value)
                  }
                  className="form-control mb-2"
                  placeholder="Chapter Time"
                />
                {index != 0 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeChapter(index)}
                  >
                    Remove Chapter
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={addChapter}
            >
              Add Chapter
            </button>
          </div>
        </div>
        <div
          className="d-flex mb-5 mt-2"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 175,
          }}
        >
          <button
            type="submit"
            className="btn btn-primary "
            style={{ width: "200px" }}
          >
            {loading
              ? "Loading ..."
              : !defaultVals?._id
              ? "Add Video"
              : "Edit Video"}
          </button>
          <button
            type="button"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              width: 200,
            }}
            className="btn"
            onClick={() => router.back()}
          >
            <FontAwesomeIcon icon={faArrowLeft} color="#fff" width={25} />
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
