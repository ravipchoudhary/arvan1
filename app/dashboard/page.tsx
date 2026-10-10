import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, ChartCandlestick, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/trading-shell";
import { CandlestickChart } from "@/components/charts/candlestick-chart";
import { getSessionUser } from "@/lib/auth/session";

const marketCards = [
  { symbol: "NIFTY 50", last: "24,832.45", change: "+0.82%", direction: "up" },
  { symbol: "BANKNIFTY", last: "52,840.10", change: "-0.31%", direction: "down" },
];

const shortcutCards = [
  { title: "Markets", description: "Review index context and demo data status.", href: "/markets" },
  { title: "Option Chain", description: "Explore the available contract view.", href: "/option-chain" },
  { title: "Strategy Analysis", description: "Review configured setup conditions.", href: "/strategies" },
  { title: "Paper Trading", description: "Open the simulated order workspace.", href: "/paper-trading" },
  { title: "Orders", description: "Review simulated order records.", href: "/orders" },
  { title: "Risk Center", description: "Review available risk controls.", href: "/risk" },
];

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  const hour = new Date().toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" });
  const greeting = Number(hour) < 12 ? "Good morning" : Number(hour) < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <AppShell
      title="Dashboard"
      subtitle="Monitor markets, review configured strategies, and manage paper-trading activity."
      active="/dashboard"
    >
      <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs text-slate-400">{today}</p>
          <h1 className="mt-1 text-2xl font-semibold text-white">{greeting}, {user.name}</h1>
          <p className="mt-1 text-sm text-slate-400">Your paper-trading workspace is ready for review.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-xs font-semibold tracking-wide text-teal-300">PAPER TRADING</span>
          <span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300">Market status: provider not configured</span>
        </div>
      </section>

      <section aria-label="Supported markets demo data" className="grid gap-3 sm:grid-cols-2">
        {marketCards.map((market) => (
          <div key={market.symbol} className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-slate-200">{market.symbol}</h2>
              <span className="rounded border border-cyan-500/25 bg-cyan-500/10 px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-cyan-300">DEMO DATA</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-4">
              <p className="text-2xl font-semibold text-white">{market.last}</p>
              <p className={`text-sm font-medium ${market.direction === "up" ? "text-emerald-300" : "text-rose-300"}`}>{market.change}</p>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">Illustrative quote · not a live market feed</p>
          </div>
        ))}
      </section>

      <section className="mt-4 grid gap-4 xl:grid-cols-[1.7fr_0.8fr]">
        <div className="rounded-xl border border-slate-800 bg-[#0b1728] p-3 md:p-4">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500">Market chart</p>
              <h2 className="mt-1 text-base font-semibold text-white">NIFTY 50 · 5 minute</h2>
            </div>
            <Link href="/markets" className="inline-flex items-center gap-1 text-xs text-teal-300 hover:text-teal-200">
              Open Markets <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <CandlestickChart />
        </div>

        <aside className="space-y-4">
          <section className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
            <div className="flex items-center gap-2">
              <ChartCandlestick className="h-4 w-4 text-teal-300" />
              <h2 className="text-sm font-semibold text-white">Strategy overview</h2>
            </div>
            <p className="mt-1 text-[10px] text-slate-500">Illustrative states · not active strategy sessions</p>
            <div className="mt-4 space-y-3">
              {[
                ["Support & Resistance Rejection", "Waiting"],
                ["Breakout + Retest", "Monitoring"],
              ].map(([name, state]) => (
                <div key={name} className="flex items-start justify-between gap-3 border-t border-slate-800 pt-3">
                  <p className="max-w-[70%] text-xs leading-5 text-slate-300">{name}</p>
                  <span className="rounded border border-amber-500/25 bg-amber-500/10 px-2 py-1 text-[9px] uppercase tracking-wide text-amber-200">{state}</span>
                </div>
              ))}
            </div>
            <Link href="/strategies" className="mt-4 inline-flex text-xs font-medium text-teal-300 hover:text-teal-200">Open Strategy Analysis</Link>
          </section>

          <section className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-cyan-300" />
              <h2 className="text-sm font-semibold text-white">Risk snapshot</h2>
            </div>
            <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/50 p-3">
              <p className="text-xs font-medium text-slate-200">No persisted paper-trade metrics are available here.</p>
              <p className="mt-1 text-[11px] leading-5 text-slate-400">Review risk limits before submitting a simulated order. All orders remain paper-only.</p>
            </div>
            <Link href="/risk" className="mt-3 inline-flex text-xs font-medium text-teal-300 hover:text-teal-200">Configure Risk Limits</Link>
          </section>
        </aside>
      </section>

      <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {shortcutCards.map((card) => (
          <Link key={card.href} href={card.href} className="group rounded-xl border border-slate-800 bg-[#0b1728] p-4 transition hover:border-slate-600">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-white">{card.title}</h2>
              <ArrowUpRight className="h-4 w-4 text-slate-500 transition group-hover:text-teal-300" />
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{card.description}</p>
          </Link>
        ))}
      </section>
    </AppShell>
  );
}
