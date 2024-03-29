"use client";
import React, { useState } from "react";
import "../../../styles/login.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Reset({ params }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data?.password != data?.confirmPassword) {
      toast.error("Password and Confirm Password did not match ");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params?.token,
            newPassword: data?.password,
          }),
        }
      );
      if (!response.ok) {
        const dataApi = await response.json();
        toast.error(dataApi.err);
        setLoading(false);
        return;
      }
      const dataApi = await response.json();
      toast.success(dataApi.success);
      setLoading(false);
      router.push("/login");
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
    // console.log(data);
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
            <div id="newCredentials">
              <div className="text-center">
                <h2 className="card-title new_creden mb-0">
                  <strong>New Credentials</strong>
                </h2>
                <p className="card-text mt-0 text-mute fw-bold">
                  Please enter your new password
                </p>
              </div>
              <form
                className="needs-validation mt-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row g-3">
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="loginpassword"
                        placeholder="Enter Password"
                        {...register("password", {
                          required: true,
                          minLength: 8,
                        })}
                        required
                      />
                      {errors.password && (
                        <p>Password should be at least 8 characters</p>
                      )}
                      <label htmlFor="loginpassword" className="form-label">
                        Enter Password
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        placeholder="Re-Enter Password"
                        {...register("confirmPassword", {
                          required: true,
                          minLength: 8,
                        })}
                        required
                      />
                      <label htmlFor="confirmPassword" className="form-label">
                        Re-Enter Password
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button
                    className="btn btnDesign btn-lg mx-auto"
                    type="submit"
                  >
                    {loading ? "Loading ..." : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Logo */}
        <img
          src="../logo.png"
          alt="Logo"
          className="position-absolute start-50 translate-middle-x logo"
        />
      </div>
    </div>
  );
}

export default Reset;
