import { env } from '@/env';
import { DefaultUser } from '@/types/index';
import axios from 'axios';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface User extends DefaultUser {}
}

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "name@domain.com",
        },
        password: { label: "Password", type: "password" },
      },
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/
      // @ts-ignore
      async authorize(credentials) {
        // Check if credentials are not provided or incomplete
        if (
          !credentials?.email || // no email provided
          !credentials?.password // no password provided
        ) {
          return null;
        }

        try {
          const response = await axios.post(`${env.AFYA_API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          if (response.status === 200) {
            const user: DefaultUser = {
              id: response.data.id,
              email: credentials.email,
              createdAt: response.data.createdAt,
              updatedAt: response.data.udpatedAt,
              accessToken: response.data.token,
            };
            return Promise.resolve(user as DefaultUser);
          } else {
            return null;
          }
        } catch (error) {
          throw new Error('Next Auth - Authorize: Authentication error');
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.data) {
        session.user = token.data;
      }
      return session;
    },
  },
}
