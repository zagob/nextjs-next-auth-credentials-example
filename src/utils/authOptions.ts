import { env } from "@/env";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    signOut: "/auth/signout",
  },
  secret: "teste-secret",
  callbacks: {
    session: async ({ session, token, user }) => {
      const getToken = cookies().get("tokenc");
      return {
        ...session,
        token: {
          ...token,
          token: getToken?.value,
        },
        account: {
          ...user,
        },
      };
    },
    async jwt({ session, user, token }) {
      session = user;
      return token;
    },
    signIn: async ({ user }) => {
      if (!user) {
        return false;
      }
      return true;
    },
    redirect() {
      return "/";
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const authResponse = await fetch(`${env.NEXT_PUBLIC_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!authResponse.ok) {
          return null;
        }

        const token = await authResponse.json();

        cookies().set("tokenc", token.jwttoken);

        return token;
      },
    }),
  ],
};

export const getSession = () => getServerSession(authOptions);
