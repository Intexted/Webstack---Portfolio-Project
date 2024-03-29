"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faHomeAlt,
  faPalette,
  faPaperPlane,
  faPaperclip,
  faUser,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "@/components/Logout";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{
        width: 270,
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <span className="fs-4"></span>
      </a>
      <hr />
      <ul className="nav nav-pills d-flex flex-column mb-auto">
        <li className="nav-item">
          <Link
            href="/dashboard/lectures"
            className={`nav-link ${
              pathname.includes("lectures") ? "active" : "link-dark"
            }`}
          >
            <FontAwesomeIcon
              icon={faBook}
              color={`${pathname.includes("lectures") ? "#fff" : "#000"}`}
              style={{ marginRight: 5 }}
            />
            Lectures
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/users"
            className={`nav-link ${
              pathname.includes("users") ? "active" : "link-dark"
            }`}
          >
            <FontAwesomeIcon
              icon={faUser}
              color={`${pathname.includes("users") ? "#fff" : "#000"}`}
              style={{ marginRight: 5 }}
            />
            Users
          </Link>
        </li>
      </ul>
      <div className="dropdown d-flex" style={{ marginTop: "auto" }}>
        <hr />
        <img
          src="https://github.com/mdo.png"
          alt=""
          width={32}
          height={32}
          className="rounded-circle me-2"
        />
        <strong style={{ marginLeft: "auto" }}>
          <Logout />
        </strong>
      </div>
    </div>
  );
}

export default Sidebar;
