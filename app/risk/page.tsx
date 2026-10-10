import Link from "next/link";
import { AppShell } from "@/components/layout/trading-shell";

const unavailableChecks = [
  ["Daily loss threshold", "Not configured"],
  ["Current daily P&L", "No persisted trades"],
  ["Maximum quantity", "Not configured"],
  ["Current exposure", "No persisted positions"],
  ["Maximum exposure", "Not configured"],
  ["Maximum trades per day", "Not configured"],
  ["Kill switch", "No server-side control configured"],
];

export default function RiskPage() {
  return (
    <AppShell
      title="Risk Center"
      subtitle="Risk limits are not presented as active until they are enforced by the server."
      active="/risk"
    >
      <div className="mb-4 rounded-xl border border-rose-500/25 bg-rose-500/5 p-4">
        <p className="text-sm font-semibold text-rose-100">Order entry must remain blocked</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">
          A server-enforced risk engine is not connected. Client-only limits can be bypassed, so a local toggle cannot safely act as a kill switch or order approval.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {unavailableChecks.map(([label, value]) => (
          <section key={label} className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
            <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-medium text-amber-100">{value}</p>
          </section>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/system-status" className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs text-slate-200 hover:border-slate-500">Check System Status</Link>
        <Link href="/settings" className="rounded-lg border border-slate-700 px-4 py-2.5 text-xs text-slate-200 hover:border-slate-500">Open Settings</Link>
      </div>
    </AppShell>
  );
}
