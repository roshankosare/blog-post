import { signIn } from "@/lib/auth/auth";
import { UserProfile } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptionts: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (
          credentials?.email === null ||
          "" ||
          credentials?.password === null ||
          ""
        ) {
          return null;
        }
        try {
          const user = await signIn({
            email: credentials?.email,
            password: credentials?.password,
          });

          return {
            id: user.id,
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          if (error instanceof Error) throw new Error(error.message);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as UserProfile;
        return {
          ...token,
          id: u.id,
          username: u.username,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
        },
      };
    },
  },
};

const handler = NextAuth(authOptionts);
export { handler as GET, handler as POST };
