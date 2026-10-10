import { AppShell } from "@/components/layout/trading-shell";
import { FeatureNotice } from "@/components/ui/feature-notice";

export default function WalletPage() {
  return (
    <AppShell
      title="Wallet & Credits"
      subtitle="Platform credits and fees are separate from trading capital. No credit ledger is configured."
      active="/wallet"
    >
      <div className="mb-4 grid gap-3 md:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Available platform credits</p>
          <p className="mt-2 text-2xl font-semibold text-slate-200">Not configured</p>
          <p className="mt-1 text-xs text-slate-400">No ledger balance is available.</p>
        </section>
        <section className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
          <p className="text-[10px] uppercase tracking-wide text-slate-500">Order fees</p>
          <p className="mt-2 text-2xl font-semibold text-slate-200">Not enabled</p>
          <p className="mt-1 text-xs text-slate-400">No fees are charged by opening this page.</p>
        </section>
      </div>
      <FeatureNotice
        title="Credit ledger is not available"
        description="There is no configured platform-credit ledger or commercial fee configuration in this environment. No balance, transaction, GST, or executed-order fee is invented. Wallet credits would not represent trading capital."
        href="/settings"
        action="Review Settings"
      />
    </AppShell>
  );
}
