"use client";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UserSectionTable = ({ sections }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const RemoveSection = async (Id, router) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/remove-section`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sectionId: Id,
          }),
        }
      );
      if (!response.ok) {
        const dataApi = await response.json();
        toast.error(dataApi.err);
        return;
      }
      const dataApi = await response.json();
      toast.success(dataApi.success);
      router.refresh();
      setLoading(false);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="p-5">
      <h2>Sections</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Categories</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sections?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.categories}</td>
              <td style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                  icon={faEdit}
                  color="#000"
                  width={25}
                  style={{ marginRight: 7, cursor: "pointer" }}
                  onClick={() => router.push(`/dashboard/sections/${item._id}`)}
                />{" "}
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  color="#000"
                  width={25}
                  style={{ marginRight: 7, cursor: "pointer" }}
                  onClick={() => RemoveSection(item._id, router)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserSectionTable;
