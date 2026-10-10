import Link from "next/link";
import { ArrowRight, BarChart3, CandlestickChart, ShieldCheck, Target } from "lucide-react";
import { CandlestickChart as MarketChart } from "@/components/charts/candlestick-chart";
import { MarketingShell } from "@/components/marketing/marketing-shell";

const capabilities = [
  { title: "Strategy analysis", icon: Target, href: "/strategy-guide" },
  { title: "Market monitoring", icon: BarChart3, href: "/features" },
  { title: "Paper trading", icon: CandlestickChart, href: "/how-it-works" },
  { title: "Risk controls", icon: ShieldCheck, href: "/features" },
];

export default function HomePage() {
  return (
    <MarketingShell>
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-500/25 bg-teal-500/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-teal-300">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
              AI-assisted options analysis
            </div>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-white md:text-5xl">
              Trade Smarter with <span className="text-teal-300">AI-Assisted Options Analysis</span>
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 md:text-base">
              Monitor index markets, evaluate structured trading setups, practice with paper orders, and maintain disciplined risk controls through one unified platform.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300">
                Start Paper Trading <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/features" className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-200 transition hover:border-slate-500">
                Explore Features
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-400">Paper trading only. Market analysis does not guarantee trading outcomes.</p>
          </div>

          <section aria-label="ARVAN trading terminal preview" className="rounded-xl border border-slate-800 bg-[#0b1728] p-3 shadow-2xl shadow-black/20 md:p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500">ARVAN FINTECH / MARKET VIEW</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <h2 className="text-sm font-semibold text-white">NIFTY 50</h2>
                  <span className="text-xs text-slate-400">24,832.45</span>
                  <span className="text-[10px] text-emerald-300">+0.82%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-cyan-300">DEMO DATA</span>
                <span className="rounded border border-teal-500/30 bg-teal-500/10 px-2 py-1 text-[9px] font-semibold tracking-[0.12em] text-teal-300">PAPER MODE</span>
              </div>
            </div>

            <MarketChart compact />

            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-800 bg-[#091422] p-3">
                <p className="text-[9px] uppercase tracking-[0.14em] text-slate-500">Strategy</p>
                <p className="mt-1 text-xs font-medium text-slate-200">Breakout + Retest</p>
                <p className="mt-1 text-[10px] text-amber-300">Monitoring</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#091422] p-3">
                <p className="text-[9px] uppercase tracking-[0.14em] text-slate-500">Risk checks</p>
                <p className="mt-1 text-xs font-medium text-slate-200">Review required</p>
                <p className="mt-1 text-[10px] text-cyan-300">Before paper order</p>
              </div>
              <div className="rounded-lg border border-slate-800 bg-[#091422] p-3">
                <p className="text-[9px] uppercase tracking-[0.14em] text-slate-500">Execution</p>
                <p className="mt-1 text-xs font-medium text-slate-200">Simulated only</p>
                <p className="mt-1 text-[10px] text-slate-400">No broker order</p>
              </div>
            </div>
          </section>
        </section>

        <section className="border-y border-slate-800 bg-[#091422]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-slate-800 md:grid-cols-4">
            {capabilities.map(({ title, icon: Icon, href }) => (
              <Link key={title} href={href} className="flex items-center gap-3 bg-[#091422] px-4 py-4 text-sm text-slate-200 transition hover:bg-[#0d1b2c] md:px-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-300">
                  <Icon className="h-4 w-4" />
                </span>
                {title}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-5 px-4 py-10 md:grid-cols-3 md:px-6 lg:px-8">
          <Link href="/strategy-guide" className="rounded-xl border border-slate-800 bg-[#0b1728] p-5 transition hover:border-slate-600">
            <p className="text-[9px] uppercase tracking-[0.16em] text-teal-300">Strategy library</p>
            <h2 className="mt-2 text-lg font-semibold text-white">Explore structured setups</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Learn how rejection and breakout/retest conditions are observed.</p>
          </Link>
          <Link href="/how-it-works" className="rounded-xl border border-slate-800 bg-[#0b1728] p-5 transition hover:border-slate-600">
            <p className="text-[9px] uppercase tracking-[0.16em] text-cyan-300">Workflow</p>
            <h2 className="mt-2 text-lg font-semibold text-white">See how it works</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Follow the path from market selection to paper-trade review.</p>
          </Link>
          <Link href="/learning-guide" className="rounded-xl border border-slate-800 bg-[#0b1728] p-5 transition hover:border-slate-600">
            <p className="text-[9px] uppercase tracking-[0.16em] text-amber-300">Learning</p>
            <h2 className="mt-2 text-lg font-semibold text-white">Build market foundations</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Review options basics, risk, strategy conditions, and trading discipline.</p>
          </Link>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-[#0b1728] p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Practice. Analyze. Improve.</h2>
              <p className="mt-1 text-sm text-slate-300">Build disciplined habits with structured analysis and simulated execution.</p>
            </div>
            <div className="flex gap-2">
              <Link href="/signup" className="rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-teal-300">Get Started</Link>
              <Link href="/login" className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-200 hover:border-slate-500">Login</Link>
            </div>
          </div>
        </section>
      </main>
    </MarketingShell>
  );
}
