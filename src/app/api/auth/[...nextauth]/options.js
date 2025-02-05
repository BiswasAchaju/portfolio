import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import db from "@/lib/db";
export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await db.user.findUnique({
            where: { email: credentials?.email },
          });

          if (!user) {
            throw new Error("No user found with this email.");
          }

          // Compare passwords
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isMatch) {
            throw new Error("Invalid password.");
          }

          // Return user object without the password
          const { password, ...userWithoutPassword } = user;

          const cookieStore = cookies();
          cookieStore.set("userEmail", credentials?.email, { path: "/" });
          return userWithoutPassword;
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session(session, token) {
      return session;
    },
  },
};
