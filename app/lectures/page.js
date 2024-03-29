import actions from "@/actions";
import Header from "@/components/Header";
import LectureList from "@/components/LectureList";
import "@/styles/lectures.css";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

async function Lectures() {
  const session = await getServerSession(authOptions);
  const user = await actions.GetProfile(session?.user?._id);
  const lectures = await actions.getData();
  user.videos = null;
  const name = session?.user?.name;
  return (
    <div>
      <Header name={name} />
      <LectureList {...{ user, lectures }} />
    </div>
  );
}

export default Lectures;
