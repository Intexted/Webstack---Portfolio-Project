"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/icons/Loader";
import { useState } from "react";

const EventTable = ({ events }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const RemoveLecture = async (lectureId, router) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/remove-lecture`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lectureId,
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
    <div style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            // display: "flex",
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            height: "100%",
            // justifyContent: "center",
            // alignItems: "center",
            zIndex: "999",
          }}
        >
          <Loader />
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Instructor</th>
            <th>Free</th>
            <th>
              <div
                style={{
                  //   position: "absolute",
                  top: 0,
                  right: 0,
                  border: "1px solid #000",
                  borderRadius: 5,
                  padding: 5,
                  cursor: "pointer",
                  fontWeight: 600,
                  textAlign: "center",
                  width: 150,
                  margin: "auto",
                }}
                onClick={() => router.push("/dashboard/lectures/new")}
              >
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  color="#000"
                  width={25}
                  style={{ marginRight: 3 }}
                />
                Add a Lecture
              </div>
            </th>
          </tr>
        </thead>
        <tbody style={{ opacity: loading ? 0.3 : 1 }}>
          {events?.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.startTime}</td>
              <td>{event.endTime}</td>
              <td>{event.instructor}</td>
              <td>{event.free ? "Yes" : "No"}</td>
              <td style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                  icon={faEdit}
                  color="#000"
                  width={25}
                  style={{ marginRight: 7, cursor: "pointer" }}
                  onClick={() =>
                    router.push(`/dashboard/lectures/${event._id}`)
                  }
                />{" "}
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  color="#000"
                  width={25}
                  style={{ marginRight: 7, cursor: "pointer" }}
                  onClick={() => RemoveLecture(event._id, router)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
