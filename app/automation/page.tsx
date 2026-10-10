import Link from "next/link";
import { AppShell } from "@/components/layout/trading-shell";

const automationControls = [
  ["Auto-trading", "Disabled", "Real-money automatic order routing is not supported."],
  ["Broker orders", "Disabled", "No broker adapter is connected."],
  ["Strategy notifications", "Not configured", "No server-side strategy engine is evaluating market data."],
  ["Risk cooldown", "Not configured", "No server-side risk engine is connected."],
];

export default function AutomationPage() {
  return (
    <AppShell
      title="Automation"
      subtitle="Automation controls are deliberately guarded until server-side strategy, risk, and broker systems are configured."
      active="/automation"
    >
      <div className="mb-4 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
        <p className="text-sm font-semibold text-amber-100">No automation is armed</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">There are no working automation rules to activate. Client-side switches must not be able to enable order placement.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {automationControls.map(([name, state, detail]) => (
          <section key={name} className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-medium text-slate-200">{name}</h2>
              <span className="rounded border border-slate-700 px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-slate-300">{state}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{detail}</p>
          </section>
        ))}
      </div>
      <Link href="/system-status" className="mt-4 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">Review system configuration</Link>
    </AppShell>
  );
}
