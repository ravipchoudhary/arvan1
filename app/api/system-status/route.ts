import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  }

  const databaseConfigured = Boolean(process.env.DATABASE_URL);
  const marketConfigured = Boolean(process.env.MARKET_DATA_API_KEY);
  const paperTradingEnabled = process.env.PAPER_TRADING_ENABLED !== "false";

  return NextResponse.json({
    ok: true,
    components: [
      {
        name: "Application",
        status: "OPERATIONAL",
        detail: "Next.js application responded to this status request.",
      },
      {
        name: "Database",
        status: databaseConfigured ? "CONFIGURED · CONNECTION UNVERIFIED" : "NOT CONFIGURED",
        detail: databaseConfigured ? "Database URL is present; connectivity has not been checked." : "DATABASE_URL is missing.",
      },
      {
        name: "Market-data adapter",
        status: marketConfigured ? "CONFIGURED · CONNECTION UNVERIFIED" : "NOT CONFIGURED",
        detail: marketConfigured ? "Provider key is present; feed connectivity has not been checked." : "Showing explicitly labeled demo data only.",
      },
      {
        name: "Strategy engine",
        status: "NOT CONFIGURED",
        detail: "No server-side strategy evaluation service is connected.",
      },
      {
        name: "Risk engine",
        status: "NOT CONFIGURED",
        detail: "Orders must not be submitted until server-side risk enforcement is configured.",
      },
      {
        name: "Realtime connection",
        status: "DEMO ONLY",
        detail: "No persistent live market stream is connected.",
      },
      {
        name: "Broker adapter",
        status: "DISABLED",
        detail: "Real-money and automatic broker orders are disabled.",
      },
      {
        name: "Paper-trading simulator",
        status: paperTradingEnabled ? "ENABLED · PERSISTENCE UNVERIFIED" : "DISABLED",
        detail: "Enable execution only after persistence and risk enforcement are operational.",
      },
    ],
  });
}
