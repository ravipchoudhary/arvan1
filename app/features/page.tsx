import { MarketingEditorialPage } from "@/components/marketing/marketing-shell";

export default function FeaturesPage() {
  return (
    <MarketingEditorialPage
      eyebrow="Platform features"
      title="One focused workspace for market context, setups, and risk."
      description="ARVAN brings market observation, deterministic strategy checks, simulated orders, and risk review together without implying live broker execution."
      sections={[
        {
          title: "Market monitoring",
          description: "Review supported index context and the freshness/source label for the data being displayed.",
          tag: "MARKETS",
        },
        {
          title: "Strategy analysis",
          description: "Evaluate Support & Resistance Rejection and Breakout + Retest conditions in a clear state panel.",
          tag: "SETUPS",
        },
        {
          title: "Paper execution",
          description: "Practice the order workflow in a simulated environment. Real-money trading is not enabled.",
          tag: "SIMULATION",
        },
        {
          title: "Risk checks",
          description: "Keep loss thresholds, quantity limits, exposure, and stop controls visible before order entry.",
          tag: "GUARDRAILS",
        },
        {
          title: "Option chain context",
          description: "Compare available call and put contract details before selecting a paper-trading instrument.",
          tag: "OPTIONS",
        },
        {
          title: "Trade review",
          description: "Use orders and journal views to inspect simulated activity and build consistent review habits.",
          tag: "JOURNAL",
        },
      ]}
      actionLabel="Explore the paper desk"
    />
  );
}
