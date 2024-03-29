// utils/authOptions
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email");
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, credentials }) {
      // Assuming rememberMe is part of credentials
      const { email } = user;
      let dbUser = await User.findOne({ email });
      if (!dbUser) {
        dbUser = new User({
          email,
          name: user.name,
          nickname: user.nickname,
        });
        await dbUser.save();
      }
      return user;
    },
    jwt: async ({ token }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      token.user = userByEmail;
      return token;
    },
    session: async ({ session, token }) => {
      const userByEmail = await User.findOne({ email: token.email });
      userByEmail.password = undefined;
      session.user = userByEmail;
      // console.log("session", session);
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
