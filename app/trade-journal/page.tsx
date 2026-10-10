import { AppShell } from "@/components/layout/trading-shell";
import { FeatureNotice } from "@/components/ui/feature-notice";

export default function TradeJournalPage() {
  return (
    <AppShell
      title="Trade Journal"
      subtitle="Review completed simulated trades, notes, and outcomes from persisted records."
      active="/trade-journal"
    >
      <FeatureNotice
        title="Journal is waiting for persisted trades"
        description="Trade count, realized P&L, win rate, average win/loss, and drawdown are intentionally not estimated. Those statistics will appear only when the simulator has persisted completed trades."
        href="/orders"
        action="View Orders"
      />
    </AppShell>
  );
}
