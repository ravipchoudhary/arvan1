import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  token: z.string().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Password reset is not available in this environment." }, { status: 400 });
    }

    if (parsed.data.password !== parsed.data.confirmPassword) {
      return NextResponse.json({ ok: false, error: "Passwords do not match." }, { status: 400 });
    }

    return NextResponse.json({
      ok: false,
      error: "Password reset delivery is not configured for this environment. Contact your administrator to enable email or SMS delivery.",
    }, { status: 501 });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to reset password." }, { status: 500 });
  }
}
