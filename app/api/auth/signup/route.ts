import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { demoUsers } from "@/lib/auth/demo-users";
import { setSessionCookie, signToken } from "@/lib/auth/session";

const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Full name is required."),
    email: z.string().trim().email("Enter a valid email address."),
    mobile: z.string().trim().min(10, "Enter a valid mobile number."),
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string().min(8),
    termsAccepted: z.boolean().refine((value) => value, {
      message: "You must accept the terms to continue.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  })
  .refine((data) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(data.password), {
    message: "Use at least 8 characters with upper/lowercase, a number, and a symbol.",
    path: ["password"],
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Please complete all required fields." }, { status: 400 });
    }

    const { name, email, mobile, password } = parsed.data;
    const normalizedEmail = email.toLowerCase();
    const existingUser = [...demoUsers.values()].find((entry) => entry.email === normalizedEmail || entry.mobile === mobile);

    if (existingUser) {
      return NextResponse.json({ ok: false, error: "An account with this email or mobile number already exists." }, { status: 409 });
    }

    const user = {
      id: `user_${Date.now()}`,
      name,
      email: normalizedEmail,
      mobile,
      passwordHash: await bcrypt.hash(password, 10),
      role: "trader",
    };

    demoUsers.set(normalizedEmail, user);

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
    return NextResponse.json({ ok: false, error: "Unable to create account." }, { status: 500 });
  }
}
