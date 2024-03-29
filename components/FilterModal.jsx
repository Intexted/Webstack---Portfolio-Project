"use client";
import React from "react";

import Loader from "@/components/icons/Loader";
import { useParamsFilter } from "@/hooks/useFilter";
import Link from "next/link";

function FilterModal({ setFilterOpen }) {
  const { register, loading } = useParamsFilter();

  return (
    <div>
      <div>
        <div className="modal-content">
          {loading && (
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "999",
              }}
            >
              <Loader />
            </div>
          )}
          <div className="modal-header">
            <h5 className="modal-title" id="zoneModalLabel">
              Filters
            </h5>

            <div className="d-flex align-items-center">
              <Link
                href="/lectures"
                scroll={false}
                className=" btn"
                id="clearButton"
              >
                Clear filters
              </Link>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setFilterOpen(false);
                }}
              />
            </div>
          </div>
          <div
            className={`modal-body ${loading ? "loading" : ""}`}
            id="zoneModalBody"
          >
            <div
              className="d-flex justify-content-around"
              style={{ flexWrap: "wrap" }}
            >
              <div className="">
                <div className="row">
                  <div className="col-12">
                    <h6>Sections</h6>
                    <div className="filter_button">
                      <input type="checkbox" id="LR" {...register("LR")} />
                      <label htmlFor="LR">Logical Reasoning</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input type="checkbox" id="LG" {...register("LG")} />
                      <label htmlFor="LG">Logic Games</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input type="checkbox" id="RC" {...register("RC")} />
                      <label htmlFor="RC">Reading Comprehension</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="general"
                        {...register("general")}
                      />
                      <label htmlFor="general">General</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="admissions"
                        {...register("admissions")}
                      />
                      <label htmlFor="admissions">Admissions</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="webinars_proBonos"
                        {...register("webinars_proBonos")}
                      />
                      <label htmlFor="webinars_proBonos">
                        Webinars &amp; Pro Bonos
                      </label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="other"
                        {...register("other")}
                      />
                      <label htmlFor="other">Other</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="row">
                  <div className="col-12">
                    <h6>Days</h6>
                    <div className="filter_button">
                      <input
                        type="checkbox"
                        id="workdays"
                        {...register("workdays")}
                      />
                      <label htmlFor="workdays">Workdays</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="weekends"
                        {...register("weekends")}
                      />
                      <label htmlFor="weekends">Weekends</label>
                    </div>
                  </div>
                </div>
                <div className="row time_content">
                  <div className="col-12">
                    <h6>Time</h6>
                    <div className="filter_button">
                      <input
                        type="checkbox"
                        id="morning"
                        {...register("morning")}
                      />
                      <label htmlFor="morning">Morning</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="afternoon"
                        {...register("afternoon")}
                      />
                      <label htmlFor="afternoon">Afternoon</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="evening"
                        {...register("evening")}
                      />
                      <label htmlFor="evening">Evening</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="row">
                  <div className="col-12">
                    <h6>Levels</h6>
                    <div className="filter_button">
                      <input
                        type="checkbox"
                        id="beginner"
                        {...register("beginner")}
                      />
                      <label htmlFor="beginner">Beginner</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="intermediate"
                        {...register("intermediate")}
                      />
                      <label htmlFor="intermediate">Intermediate</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="advanced"
                        {...register("advanced")}
                      />
                      <label htmlFor="advanced">Advanced</label>
                    </div>
                  </div>
                </div>
                <div className="row timecontent_two">
                  <div className="col-12">
                    <h6>Duration</h6>
                    <div className="filter_button">
                      <input
                        type="checkbox"
                        id="hours_1_2"
                        {...register("hours_1_2")}
                      />
                      <label htmlFor="hours_1_2">1-2 hours</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="hours_2_3"
                        {...register("hours_2_3")}
                      />
                      <label htmlFor="hours_2_3">2-3 hours</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="hours_3_5"
                        {...register("hours_3_5")}
                      />
                      <label htmlFor="hours_3_5">3-5 hours</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="row">
                  <div className="col-12">
                    <h6>Advanced</h6>
                    <div className="filter_button">
                      <input
                        type="checkbox"
                        id="watched"
                        {...register("watched")}
                      />
                      <label htmlFor="watched">Watched</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="unwatched"
                        {...register("unwatched")}
                      />
                      <label htmlFor="unwatched">Unwatched</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="bookmarked"
                        {...register("bookmarked")}
                      />
                      <label htmlFor="bookmarked">Bookmarked</label>
                    </div>
                    <div className="filter_button mt-3">
                      <input
                        type="checkbox"
                        id="messaged"
                        // {...register("messaged")}
                      />
                      <label htmlFor="messaged">Messaged</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
