"use client";
import Link from "next/link";
import React, { useState } from "react";
import "../../styles/login.css";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        toast.error(data.err);
        return;
      }
      const data = await response.json();
      setLoading(false);
      toast.success(data.success);
    } catch (err) {
      // console.log(err);
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
          <div className="card-body p-5 mt-5">
            <div id="forgetPass">
              <h2 className="card-title forget_title mb-0">
                <strong>Forget Your Password</strong>
                <span className="qsMark">?</span>
              </h2>
              <p className="card-text mt-0 text-mute fw-bold">
                Please enter your registered email.
              </p>
              <form className="needs-validation mt-5" onSubmit={handleSubmit}>
                <div className="row g-3">
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
                </div>
                <div className="text-center mt-4">
                  <button
                    className="btn btnDesign btn-lg mx-auto"
                    type="submit"
                  >
                    {loading ? "Loading ..." : "Reset Password"}
                  </button>
                </div>
                <div className="text-center mt-3">
                  <Link href="/login" className="mt-2 cancelBtn">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Logo */}
        <img
          src="./logo.svg"
          alt="Logo"
          className="position-absolute start-50 translate-middle-x logo"
        />
      </div>
    </div>
  );
}

export default ForgotPassword;
