"use client";
import React, { useEffect, useState } from "react";
import SelectIcon from "@/components/icons/SelectIcon";
import SelectCalendrierIcon from "@/components/icons/SelectCalendrierIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import CalenderModal from "./CalenderModal";
import FilterModal from "./FilterModal";
import { useSearchParams } from "next/navigation";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Logout from "./Logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Header({ name, role }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [calendrierOpen, setCalendrierOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo({
      top: document.querySelector("#today")?.offsetTop - 250,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="header_main">
        <div className="row">
          <div className="col-md text-start">
            <div className="logo_part">
              <h1>
                Hi<span>, </span>
                {name[0]?.toUpperCase() + name.slice(1)}
                <span style={{ color: "rgba(56, 182, 255, 1)" }}>!</span>
              </h1>

              <p>
                Please make sure to register to the
                <br />
                classes you want to join.
              </p>
            </div>
          </div>
          <div className="col-auto">
            <div className="filter_section">
              <div className="row">
                <div className="col-12">
                  <div className="time_zone">
                    <span>*Eastern Time Zone (EST)</span>
                    <div className="d-flex justify-content-between">
                      <span>Dark Mode</span>
                      <div>
                        <label className="toggle-container">
                          <input
                            type="checkbox"
                            className="toggle-input"
                            id="dark-mode-toggle"
                            onClick={() => {
                              document.body.classList.toggle("dark-mode");
                              getCookie("dark-mode")
                                ? deleteCookie("dark-mode")
                                : setCookie("dark-mode", "active");
                            }}
                          />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </div>
                    {role === "admin" && (
                      <Link href="/dashboard" style={{ color: "inherit" }}>
                        <h5
                          title="Dashboard"
                          style={{ marginRight: 5, cursor: "pointer" }}
                        >
                          <FontAwesomeIcon icon={faChartBar} width={30} />
                        </h5>
                      </Link>
                    )}
                    <Logout />
                  </div>
                </div>
              </div>
              <div className=" mt-4" style={{ position: "relative" }}>
                <div className=" select_section mb-2">
                  <button
                    onClick={() => {
                      setCalendrierOpen(false);
                      setFilterOpen(false);
                      window.scrollTo({
                        top: document.querySelector("#today")?.offsetTop - 250,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <SelectIcon />
                    <span>Today</span>
                  </button>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#zoneModal11"
                    data-zone={1}
                    onClick={() => {
                      setCalendrierOpen((calendrierOpen) => !calendrierOpen);
                      setFilterOpen(false);
                    }}
                  >
                    <SelectCalendrierIcon />
                    <span>Select</span>
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#zoneModal12"
                    data-zone={1}
                    onClick={() => {
                      setFilterOpen((filterOpen) => !filterOpen);
                      setCalendrierOpen(false);
                    }}
                  >
                    <FilterIcon />
                    <span className="filter">Filter</span>
                    <span className="filter_circle">
                      {0 + searchParams?.size}
                    </span>
                  </button>
                </div>
                {/* Calender Modal */}
                {calendrierOpen && (
                  <CalenderModal setCalendrierOpen={setCalendrierOpen} />
                )}

                {/* Filter Modal */}
                {filterOpen && <FilterModal setFilterOpen={setFilterOpen} />}

                {/* Backdrop Modal */}
                {(filterOpen || calendrierOpen) && (
                  <div
                    onClick={() => {
                      setCalendrierOpen(false);
                      setFilterOpen(false);
                    }}
                    className="modal-backdrop fade show"
                  ></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
