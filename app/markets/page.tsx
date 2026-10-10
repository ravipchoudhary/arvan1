import { AppShell, MetricCard } from "@/components/layout/trading-shell";
import { CandlestickChart } from "@/components/charts/candlestick-chart";

const marketCards = [
  { symbol: "NIFTY 50", last: "24,832.45", change: "+0.82%" },
  { symbol: "BANKNIFTY", last: "52,840.10", change: "-0.31%" },
  { symbol: "FINNIFTY", last: "24,514.20", change: "+0.54%" },
  { symbol: "INDIA VIX", last: "14.86", change: "-2.24%" },
];

export default function MarketsPage() {
  return (
    <AppShell
      title="Markets"
      subtitle="Track supported indices, observed price action, and freshness checks before each strategy session."
      active="/markets"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="NIFTY 50" value="24,832.45" delta="+0.82%" tone="positive" />
        <MetricCard label="BANKNIFTY" value="52,840.10" delta="-0.31%" tone="neutral" />
        <MetricCard label="VIX" value="14.86" delta="-2.24%" tone="positive" />
        <MetricCard label="Data source" value="Demo" delta="Provider not configured" tone="default" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Market overview</p>
              <h3 className="mt-1 text-lg font-semibold text-white">NIFTY 50</h3>
            </div>
            <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs text-cyan-300">
              DEMO DATA
            </div>
          </div>

          <CandlestickChart />
        </section>

        <aside className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recent updates</p>
          <p className="mt-1 text-[10px] text-slate-500">Illustrative sample only · not a live feed</p>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {[
              "Example support area is displayed for chart layout.",
              "Example breakout state is not an active signal.",
              "Review risk rules before submitting a simulated order.",
            ].map((item) => (
              <div key={item} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">{item}</div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {marketCards.map((card) => (
          <div key={card.symbol} className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>{card.symbol}</span>
              <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-cyan-300">
                DEMO DATA
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-2xl font-semibold text-white">{card.last}</p>
                <p className="mt-1 text-sm text-emerald-300">{card.change}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-400">Illustrative quote · not a live market feed</p>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
