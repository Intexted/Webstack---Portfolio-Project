import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { cookies } from "next/headers";
import db from "@/utils/db";

// db.connect();

const handler = async (req, res) => {
  return await NextAuth(req, res, {
    ...authOptions,
    session: {
      strategy: "jwt",
      maxAge: cookies().has("rememberMe") ? 30 * 24 * 60 * 60 : 60 * 60,
    },
  });
};
export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
