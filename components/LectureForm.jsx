"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "@/lib/edgestore";
import { LecturesTime } from "../utils/MergeDateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUpload } from "@fortawesome/free-solid-svg-icons";

const LectureForm = ({ lecture }) => {
  const { register, handleSubmit, watch, setValue, errors } = useForm({
    defaultValues: lecture,
    //  {
    //   title: "",
    //   startTime: "",
    //   endTime: "",
    //   avatarSrc: "",
    //   instructor: "",
    //   level: 1,
    //   section: [],
    //   description: "",
    //   free: false,
    //   lectureSrc: "",
    //   tutorDir: "",
    //   lessonAndSkill: "",
    //   sectionNumber: 1,
    //   QperG: "",
    // },
  });
  const [selectedDate, setSelectedDate] = useState(
    lecture ? lecture.date : new Date()
  );
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [file, setFile] = useState();
  const [url, setUrl] = useState(lecture ? lecture.pdfUrl : "");
  const { edgestore } = useEdgeStore();

  const router = useRouter();

  const handleChange = (item) => {
    setValue(
      "section",
      watch("section")?.includes(item)
        ? watch("section")?.filter((i) => i != item)
        : [...(watch("section") || []), item]
    );
  };

  const onSubmit = async (data) => {
    const { startDate, endDate } = LecturesTime({
      startTime: data?.startTime,
      endTime: data?.endTime,
      date: selectedDate,
    });
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/${
          lecture?._id ? "update" : "add"
        }-lecture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedDate: startDate,
            endDate,
            pdfUrl: url,
            data,
            lectureId: lecture?._id,
          }),
        }
      );
      if (file) {
        await edgestore.publicFiles.confirmUpload({
          url,
        });
      }
      setLoading(false);
      toast.success("Lecture Added Successfully");
      router.push("/dashboard/lectures");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="p-5  mb-5 fw-label">
        <h2>{!lecture?._id ? "Add Lecture Form" : "Edit Lecture Form"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mt-1">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className={`form-control ${errors?.title ? "is-invalid" : ""}`}
              id="title"
              name="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors?.title && (
              <div className="invalid-feedback">{errors?.title.message}</div>
            )}
          </div>

          <div className="form-group mt-1">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Add Lecture Description"
              className={`form-control ${
                errors?.description ? "is-invalid" : ""
              }`}
              rows="4"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors?.description && (
              <div className="invalid-feedback">
                {errors?.description.message}
              </div>
            )}
          </div>

          <div className="form-group mt-1">
            <label htmlFor="lessonAndSkill">Lesson & Skill</label>
            <input
              type="text"
              name="lessonAndSkill"
              className={`form-control ${
                errors?.lessonAndSkill ? "is-invalid" : ""
              }`}
              {...register("lessonAndSkill", {
                required: "lesson & Skill is required",
              })}
            />
            {errors?.lessonAndSkill && (
              <div className="invalid-feedback">
                {errors?.lessonAndSkill.message}
              </div>
            )}
          </div>

          <div className="form-group mt-1">
            <label htmlFor="lectureSrc">Lecture Link</label>
            <input
              type="text"
              className={`form-control ${
                errors?.lectureSrc ? "is-invalid" : ""
              }`}
              id="lectureSrc"
              name="lectureSrc"
              {...register("lectureSrc", {
                required: "Lecture Link is required",
              })}
            />
            {errors?.lectureSrc && (
              <div className="invalid-feedback">
                {errors?.lectureSrc.message}
              </div>
            )}
          </div>

          <div className="form-group mt-1">
            <label htmlFor="avatarSrc">Instructor Avatar</label>
            <input
              type="text"
              className={`form-control ${
                errors?.avatarSrc ? "is-invalid" : ""
              }`}
              id="avatarSrc"
              name="avatarSrc"
              {...register("avatarSrc", {
                required: "Avatar Source is required",
              })}
            />
            {errors?.avatarSrc && (
              <div className="invalid-feedback">
                {errors?.avatarSrc.message}
              </div>
            )}
          </div>

          <div className="form-group mt-1">
            <label htmlFor="instructor">Instructor Name</label>
            <input
              type="text"
              className={`form-control ${
                errors?.instructor ? "is-invalid" : ""
              }`}
              id="instructor"
              name="instructor"
              {...register("instructor", {
                required: "Instructor is required",
              })}
            />
            {errors?.instructor && (
              <div className="invalid-feedback">
                {errors?.instructor.message}
              </div>
            )}
          </div>

          <div className="form-group mt-1">
            <label htmlFor="level">Level</label>
            <select
              className={`form-control ${errors?.level ? "is-invalid" : ""}`}
              id="level"
              name="level"
              {...register("level", { required: "Level is required" })}
            >
              <option value={1}>Level 1</option>
              <option value={2}>Level 2</option>
              <option value={3}>Level 3</option>
            </select>
            {errors?.level && (
              <div className="invalid-feedback">{errors?.level.message}</div>
            )}
          </div>

          <div className="d-flex gap-2 align-items-center mt-2">
            <div
              className="form-group d-flex"
              style={{ flexDirection: "column" }}
            >
              <label htmlFor="date">Date</label>
              <DatePicker
                id="date"
                name="date"
                className={`form-control ${errors?.date ? "is-invalid" : ""}`}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showYearDropdown
                showMonthDropdown
                dateFormat="yyyy-MM-dd"
                placeholderText="Select a date"
              />
              {errors?.date && (
                <div className="invalid-feedback">{errors?.date.message}</div>
              )}
            </div>

            <div className="form-group mt-1">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                className={`form-control ${
                  errors?.startTime ? "is-invalid" : ""
                }`}
                id="startTime"
                name="startTime"
                {...register("startTime", {
                  required: "Start Time is required",
                })}
              />
              {errors?.startTime && (
                <div className="invalid-feedback">
                  {errors?.startTime.message}
                </div>
              )}
            </div>

            <div className="form-group mt-1">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                className={`form-control ${
                  errors?.endTime ? "is-invalid" : ""
                }`}
                id="endTime"
                name="endTime"
                {...register("endTime", { required: "End Time is required" })}
              />
              {errors?.endTime && (
                <div className="invalid-feedback">
                  {errors?.endTime.message}
                </div>
              )}
            </div>
          </div>

          <div className="form-group mt-1">
            <label htmlFor="section">Section</label>
            <div
              className="d-flex gap-3 align-items-center"
              style={{ flexWrap: "wrap" }}
            >
              {[
                "Logical Reasoning",
                "Logic Games",
                "Reading Comp",
                "General",
                "Admissions",
                "Webinars & Pro Bonos",
                "None",
              ].map((sectionLabel, i) => (
                <div key={sectionLabel} className="form-check d-flex gap-1">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`section-${sectionLabel}`}
                    name="section"
                    value={watch("section")?.includes(sectionLabel)}
                    onChange={() => handleChange(sectionLabel)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`section-${sectionLabel}`}
                  >
                    {sectionLabel}
                  </label>
                </div>
              ))}
            </div>
            {errors?.section && (
              <div className="invalid-feedback">{errors?.section.message}</div>
            )}
          </div>

          <div className="form-group mt-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="free"
                name="free"
                {...register("free")}
              />
              <label className="form-check-label" htmlFor="free">
                Free
              </label>
            </div>
            <div className="form-group mt-1">
              <label htmlFor="pdfLink">pdf Link</label>
              <input
                type="text"
                className={`form-control`}
                id="pdfLink"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <div className="d-flex gap-2" style={{ flexDirection: "column" }}>
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
                          onProgressChange: (progress) => {},
                        });

                        setUrl(res.url);
                        setUploadLoading(false);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faUpload} color="#fff" width={25} />
                    {uploadLoading ? "Loading ..." : "Upload"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex" style={{ justifyContent: "space-between" }}>
            <button
              type="submit"
              style={{
                backgroundColor: "blue",
                color: "#fff",
              }}
              className="btn mt-4"
            >
              {loading
                ? "Loading ..."
                : !lecture?._id
                ? "Add Lecture"
                : "Edit Lecture"}
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#000",
                color: "#fff",
              }}
              className="btn mt-4"
              onClick={() => router.back()}
            >
              <FontAwesomeIcon icon={faArrowLeft} color="#fff" width={25} />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LectureForm;
