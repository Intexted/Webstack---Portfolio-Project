import Lecture from "@/models/lecture";
import User from "./models/user";
import { notFound } from "next/navigation";
import moment from "moment";

const getLectureData = async (id) => {
  try {
    const lecture = await Lecture?.findById(id);
    return lecture;
  } catch (error) {
    console.log(error);
    notFound();
    return [];
  }
};

const getData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/find-year-lecture?startDate=${moment()
        .subtract(6, "month")
        .format("YYYY-MM")}&endDate=${moment()
        .add(6, "month")
        .format("YYYY-MM")}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data.lectures;
  } catch (error) {
    console.log(error);
  }
};
const GetProfile = async (id) => {
  try {
    const user = await User?.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};
const GetUsers = async () => {
  try {
    const users = await User?.find({});
    return users;
  } catch (error) {
    console.log(error);
  }
};

const actions = {
  getLectureData,
  getData,
  GetProfile,
  GetUsers,
};
export default actions;
