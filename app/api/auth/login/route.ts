import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { demoUsers } from "@/lib/auth/demo-users";
import { setSessionCookie, signToken, normalizeLoginIdentifier } from "@/lib/auth/session";

const loginSchema = z
  .object({
    email: z.string().trim().optional(),
    mobile: z.string().trim().optional(),
    password: z.string().min(8),
  })
  .refine((data) => Boolean(data.email || data.mobile), {
    message: "Email or mobile number is required.",
    path: ["email"],
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Invalid email or password." }, { status: 400 });
    }

    const { email, mobile, password } = parsed.data;
    const identifier = normalizeLoginIdentifier(email ?? mobile ?? "");
    const user =
      demoUsers.get(identifier) ??
      [...demoUsers.values()].find((entry) =>
        entry.mobile === (mobile ?? "").trim() || entry.email === identifier,
      );

    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to authenticate user." }, { status: 500 });
  }
}
