"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function GetPlan({ plan, userId }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // update User Plan function
  const updateUserPlan = async (id, plan) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/update-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id,
            plan,
          }),
        }
      );
      toast.success("Plan Updated Successfully");
      router.refresh();
      setLoading(false);
      router.push("/lectures");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={() => updateUserPlan(userId, plan)}
      type="button"
      className={`btn btn-lg btn-block btn${
        plan === "free" ? "-outline" : ""
      }-primary`}
    >
      {loading
        ? "Loading..."
        : plan === "free"
        ? "Get free plan"
        : "Get Premium Plan"}
    </button>
  );
}

export default GetPlan;
