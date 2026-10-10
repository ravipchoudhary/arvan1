import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Password reset delivery is not configured for this environment. Contact your administrator to enable email or SMS delivery.",
      },
      { status: 501 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to process password reset request." }, { status: 500 });
  }
}
