import { AppShell } from "@/components/layout/trading-shell";
import { OptionChainControls } from "@/components/market/option-chain-controls";
import { marketData } from "@/lib/mock-data";

export default function OptionChainPage() {
  return (
    <AppShell
      title="Option Chain"
      subtitle="Select a sample contract and pass it to the paper terminal. Real provider data is not configured."
      active="/option-chain"
    >
      <div className="mb-4 rounded-lg border border-amber-500/25 bg-amber-500/5 p-3 text-xs leading-5 text-amber-100">
        OPTION CHAIN UNAVAILABLE — live exchange quotes, expiry metadata, implied volatility, bid/ask and volume are not connected. The table below is clearly labeled demo data for layout and selection flow only.
      </div>
      <OptionChainControls rows={marketData} />
    </AppShell>
  );
}
