import Lecture from "@/models/lecture";
import Video from "@/models/video";
import User from "./models/user";
import { notFound } from "next/navigation";
import Section from "./models/section";
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

const getVideos = async () => {
  try {
    const videos = await Video?.find({});
    return videos;
  } catch (error) {
    console.log(error);
    notFound();
    return [];
  }
};
const getVideosBySection = async (section) => {
  try {
    const videos = await Video?.find({ section });
    return videos;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const getVideoById = async (id) => {
  try {
    const video = await Video?.findById(id);
    return video;
  } catch (error) {
    console.log(error);
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

const GetSections = async () => {
  try {
    const sections = await Section?.find({});
    return sections;
  } catch (error) {
    console.log(error);
    return [];
  }
};
const getSectionById = async (id) => {
  try {
    const section = await Section?.findById(id);
    return section;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const actions = {
  getLectureData,
  getData,
  GetProfile,
  GetUsers,
  getVideos,
  getVideosBySection,
  getVideoById,
  GetSections,
  getSectionById,
};
export default actions;
