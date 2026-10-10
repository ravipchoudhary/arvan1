import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json({ ok: false, error: "Authentication required." }, { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const payload = JSON.stringify({
        ok: true,
        source: "DEMO DATA",
        status: "NOT_CONNECTED",
        feed: [
          { symbol: "NIFTY 50", value: 24832.45, change: 0.82 },
          { symbol: "BANKNIFTY", value: 52840.1, change: -0.31 },
        ],
      });
      controller.enqueue(new TextEncoder().encode(`data: ${payload}\n\n`));
      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
