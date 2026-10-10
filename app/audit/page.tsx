import { AppShell } from "@/components/layout/trading-shell";
import { FeatureNotice } from "@/components/ui/feature-notice";

export default function AuditPage() {
  return (
    <AppShell
      title="Audit Logs"
      subtitle="Display persisted account events only; sample or other users' events are never substituted."
      active="/audit"
    >
      <FeatureNotice
        title="No audit events are available"
        description="This project has an audit-event schema, but database-generated Prisma Client support is not initialized in this workspace. Therefore the screen does not present fabricated logins, trades, risk decisions, or counts."
        href="/system-status"
        action="Check System Status"
      />
    </AppShell>
  );
}
