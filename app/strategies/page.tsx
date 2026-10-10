import { AppShell } from "@/components/layout/trading-shell";
import { StrategyControls } from "@/components/strategies/strategy-controls";

export default function StrategiesPage() {
  return (
    <AppShell
      title="Strategy Analysis"
      subtitle="Review the supported rules and locally track your preparation state; there are no live strategy evaluations."
      active="/strategies"
    >
      <div className="mb-4 rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-xs leading-5 text-slate-300">
        Only two strategies are supported: Support & Resistance Rejection and Breakout + Retest. These are rule descriptions, not buy/sell recommendations or claims of predictive AI.
      </div>
      <StrategyControls />
    </AppShell>
  );
}
