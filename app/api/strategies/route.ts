import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    engineStatus: "NOT_CONFIGURED",
    strategies: [
      { name: "Support & Resistance Rejection", status: "NOT_CONFIGURED" },
      { name: "Breakout + Retest", status: "NOT_CONFIGURED" },
    ],
  });
}
