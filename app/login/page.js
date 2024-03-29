"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import the icons you need
import {
  faUser,
  faDoorOpen,
  faCircle,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import "../../styles/login.css";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { setCookie } from "cookies-next";

function Login({ register }) {
  const [loginActive, setloginActive] = useState(register ? false : true);
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/lectures";

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (rememberMe) {
      setCookie("rememberMe", rememberMe.toString());
    }
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Login success");
      router.push(callbackUrl);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          nickname,
          email,
          password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        toast.error(data.err);
        setLoading(false);
        return;
      }
      const data = await response.json();
      toast.success(data.success);
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);
      router.push("/lectures");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="sectionbackground">
      <div className="container justify-content-center position-relative ">
        {/* Card */}
        <div
          className="card mx-auto shadow mb-5 mt-5"
          style={{ width: "30rem", zIndex: 1 }}
        >
          <div className="card-body p-5 mt-3">
            <div className="d-flex justify-content-center login_group">
              <div
                className=" me-2 mybtnGroup"
                role="group"
                aria-label="First group"
              >
                <Link
                  href="/login"
                  type="button"
                  className={`btn mybutton loginBtn ${
                    loginActive ? "active" : ""
                  }`}
                  id="loginBtn"
                >
                  <FontAwesomeIcon icon={faDoorOpen} />
                  Log In
                </Link>
                <Link
                  href="/register"
                  type="button"
                  className={`btn mybutton ${!loginActive ? "active" : ""}`}
                  id="signupBtn"
                >
                  {" "}
                  <FontAwesomeIcon icon={faUser} /> Sign Up
                </Link>
              </div>
            </div>
            {/* SIGNUP FORM  */}
            {!loginActive && (
              <div id="signupForm">
                <h2 className="card-title mb-0 mt-2">
                  Create New Account
                  <span className="dot">
                    <FontAwesomeIcon icon={faCircle} />
                  </span>
                </h2>
                <p className="card-text mt-0 text-mute fw-bold">
                  Already a member?{" "}
                  <Link
                    href="/login"
                    className="text-decoration-none fw-bold loginBtn"
                    style={{ color: "#38b6ff" }}
                  >
                    Log In
                  </Link>
                </p>
                <form
                  className="needs-validation"
                  onSubmit={handleRegisterSubmit}
                >
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control icon-input"
                          id="name"
                          placeholder="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control icon-input"
                          id="nickname"
                          placeholder="nickname"
                          value={nickname}
                          onChange={(e) => setNickname(e.target.value)}
                          required
                        />
                        <label htmlFor="nickname" className="form-label">
                          Nick Name
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control icon-email-input"
                          id="email"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btnDesign btn-lg mx-auto"
                        type="submit"
                      >
                        {loading ? "Loading ..." : "Register"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {/* LOGIN FORM  */}
            {loginActive && (
              <div id="loginForm">
                <h2 className="card-title mb-0 mt-2">
                  Welcome Back
                  <span>
                    <img
                      src="./hand.png"
                      alt="hand image"
                      width={30}
                      height={30}
                    />
                  </span>
                </h2>
                <p className="card-text mt-0 text-mute fw-bold">
                  Don&apos;t have an Account?{" "}
                  <Link
                    href="/register"
                    className="text-decoration-none fw-bold"
                    style={{ color: "#38b6ff" }}
                  >
                    Register Now
                  </Link>
                </p>
                <form className="needs-validation" onSubmit={handleLoginSubmit}>
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control icon-email-input"
                          id="password"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <label htmlFor="logemail" className="form-label">
                          Email
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating position-relative">
                        <input
                          type={`${showPwd ? "text" : "password"}`}
                          className="form-control"
                          id="loginpassword"
                          placeholder="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <FontAwesomeIcon
                          icon={!showPwd ? faEye : faEyeSlash}
                          onClick={() => setShowPwd((showPwd) => !showPwd)}
                          className="position-absolute top-50  translate-middle"
                          style={{ right: "2%" }}
                        />
                        <label htmlFor="loginpassword" className="form-label">
                          Password
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label
                          className="form-check-label remMe"
                          htmlFor="rememberMe"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <div className="col-6 text-end forgetPass">
                      <Link
                        href="./forgot-password"
                        style={{ color: "#38b6ff" }}
                        // target="_blank"
                        className="text-decoration-none"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btnDesign btn-lg mx-auto"
                        type="submit"
                      >
                        {loading ? "Loading ..." : "Log In"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* Logo */}
          <img
            src="./logo.svg"
            alt="Logo"
            className="position-absolute start-50 translate-middle-x logo"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
