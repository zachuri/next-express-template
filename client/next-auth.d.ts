// Module Augmentation

import { DefaultSession, DefaultUser } from 'next-auth';

declare module "next-auth" {
  interface Session{
    user: {
      id: number,
      name: string | null,
      email: string | null,
      image: string | null,
      role: string,
    }
    & DefaultSession;
  }

  interface User extends DefaultUser {
    id: number,
    name: string | null,
    email: string | null,
    image: string | null,
    role: string,
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: number,
    name: string | null,
    email: string | null,
    image: string | null,
    role: string,
  }
}