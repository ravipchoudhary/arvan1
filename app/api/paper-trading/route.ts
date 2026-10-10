import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    paperTrading: {
      enabled: process.env.PAPER_TRADING_ENABLED !== "false",
      ready: false,
      status: "UNAVAILABLE",
      reason: "Order persistence and server-side risk validation are not configured.",
    },
  });
}
