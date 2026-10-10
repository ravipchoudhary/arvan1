import { AppShell } from "@/components/layout/trading-shell";
import { FeatureNotice } from "@/components/ui/feature-notice";

export default function ReportsPage() {
  return (
    <AppShell
      title="Reports"
      subtitle="Review actual paper-trade performance for a selected period. Report generation is unavailable until order records exist."
      active="/reports"
    >
      <FeatureNotice
        title="No report data available"
        description="Daily, weekly, and monthly P&L, strategy statistics, and drawdown require persisted simulated order records. The report controls are shown, but no sample performance figures are presented as real account data."
        href="/trade-journal"
        action="Open Trade Journal"
      />
    </AppShell>
  );
}
