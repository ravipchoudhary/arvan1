import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    configured: false,
    enabled: false,
    status: "NOT_CONFIGURED",
    reason: "Server-side risk policy and persistence must be initialized before accepting paper orders.",
  });
}
