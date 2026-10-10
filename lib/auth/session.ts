import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export const DEFAULT_JWT_SECRET = "arvan-demo-secret-change-me";

export async function signToken(user: SessionUser) {
  return jwt.sign(user, process.env.JWT_SECRET ?? DEFAULT_JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function verifyToken(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET ?? DEFAULT_JWT_SECRET) as SessionUser;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("arvan_session")?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("arvan_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("arvan_session");
}

export function normalizeLoginIdentifier(value: string) {
  return value.trim().toLowerCase();
}
