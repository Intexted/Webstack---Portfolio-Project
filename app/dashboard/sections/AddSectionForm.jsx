"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddSectionForm = ({ section }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm({ defaultValues: section });
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/${section ? "edit" : "add"}-section`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sectionId: section._id,
            name: data.name,
            categories: data.categories,
            sectionImg: data.sectionImg,
          }),
        }
      );
      router.refresh();
      toast.success(
        section?._id
          ? "Section Updated Successfully"
          : "Section Added Successfully"
      );
      router.push("/dashboard/sections");
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="p-5">
      <h3>Add Section Form</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name" className=" col-form-label">
            Name:
          </label>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            {...register("name", {
              required: "section Name is required",
            })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="categories" className=" col-form-label">
            Categories (comma-separated):
          </label>
          <input
            className="form-control"
            type="text"
            id="categories"
            name="categories"
            {...register("categories", { required: "Categories are required" })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sectionImg" className=" col-form-label">
            section Image:
          </label>
          <input
            className="form-control"
            type="text"
            id="sectionImg"
            name="sectionImg"
            {...register("sectionImg", {
              required: "section Image are required",
            })}
          />
        </div>
        <div
          className="d-flex mb-5 mt-2"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            type="submit"
            className="btn btn-primary "
            style={{ width: "200px" }}
          >
            {loading
              ? "Loading ..."
              : !section?._id
              ? "Add Section"
              : "Edit Section"}
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

export default AddSectionForm;
