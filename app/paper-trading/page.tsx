import Link from "next/link";
import { AppShell } from "@/components/layout/trading-shell";
import { OrderPreview } from "@/components/trading/order-preview";

export default function PaperTradingPage() {
  return (
    <AppShell
      title="Paper Trading"
      subtitle="Configure a simulated order preview. Submission stays unavailable until persistence and server-side risk checks are operational."
      active="/paper-trading"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <Link href="/option-chain" className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">Select from Option Chain</Link>
        <Link href="/strategies" className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">Review Strategies</Link>
      </div>
      <OrderPreview />
    </AppShell>
  );
}
