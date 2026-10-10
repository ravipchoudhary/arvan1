import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  }

  return NextResponse.json(
    { ok: false, status: "NOT_CONFIGURED", error: "Live market data provider is not configured." },
    { status: 503 },
  );
}
