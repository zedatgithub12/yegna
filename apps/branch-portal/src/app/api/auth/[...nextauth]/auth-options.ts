/* eslint-disable @typescript-eslint/no-explicit-any */
import { routes } from "@/lib/config/routes";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(req: any) {
        if (req.body) {
          return JSON.parse(req.body.data);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async redirect({ url, baseUrl }) {
      const parsedUrl = new URL(url, baseUrl);

      if (parsedUrl.searchParams.has("callbackUrl")) {
        return `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: routes.signIn,
  },
};
