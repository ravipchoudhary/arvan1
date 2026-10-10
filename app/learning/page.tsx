import Link from "next/link";
import { AppShell } from "@/components/layout/trading-shell";

const topics = [
  ["Options Basics", "Calls, puts, strikes, expiry, premiums and contract risk."],
  ["Support & Resistance", "Use levels as context; learn why a level alone is not a trade signal."],
  ["Breakout + Retest", "Distinguish a confirmed break from a retest and confirmation."],
  ["Risk Management", "Understand exposure, position size, daily limits and residual risk."],
  ["Paper Trading", "Practice simulated order review without confusing it with broker execution."],
  ["Trading Discipline", "Use preparation checklists and consistent post-trade reviews."],
];

export default function LearningPage() {
  return (
    <AppShell
      title="Learning Center"
      subtitle="Browse learning topics. Course completion is not tracked in this environment."
      active="/learning"
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {topics.map(([title, description], index) => (
          <Link key={title} href={`/learning-guide#topic-${index + 1}`} className="rounded-xl border border-slate-800 bg-[#0b1728] p-4 transition hover:border-teal-500/30">
            <p className="text-[9px] uppercase tracking-[0.14em] text-teal-300">Learning track {String(index + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-sm font-semibold text-white">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
            <span className="mt-4 inline-flex text-xs text-teal-300">Open topic →</span>
          </Link>
        ))}
      </div>
      <p className="mt-4 rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-xs text-slate-400">
        Course progress and completion certificates are not available because no learning-progress storage is configured.
      </p>
    </AppShell>
  );
}
