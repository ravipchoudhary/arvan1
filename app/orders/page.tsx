import { AppShell } from "@/components/layout/trading-shell";
import { FeatureNotice } from "@/components/ui/feature-notice";

export default function OrdersPage() {
  return (
    <AppShell
      title="Orders"
      subtitle="Review your paper orders and their state transitions. No server-persisted orders are available yet."
      active="/orders"
    >
      <FeatureNotice
        title="No paper orders to show"
        description="The current application environment has no verified order-persistence and server-side risk workflow. Orders are not fabricated or reported as successful. Once persistence and risk enforcement are configured, this table can display actual order records."
        href="/paper-trading"
        action="Open Paper Trading"
      />
      <p className="mt-3 text-[10px] text-slate-500">Real-money orders and unsupported order modifications are unavailable.</p>
    </AppShell>
  );
}
