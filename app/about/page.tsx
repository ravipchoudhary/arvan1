import { MarketingEditorialPage } from "@/components/marketing/marketing-shell";

export default function AboutPage() {
  return (
    <MarketingEditorialPage
      eyebrow="About ARVAN"
      title="A focused practice environment for disciplined options analysis."
      description="ARVAN FINTECH is designed to organize market context, configurable strategy conditions, simulated paper orders, and risk review in one workspace."
      sections={[
        {
          title: "Analysis, not guarantees",
          description: "Market observations and strategy states are informational. They do not guarantee profitability, execution, or a particular market outcome.",
          tag: "PRINCIPLE",
        },
        {
          title: "Paper trading only",
          description: "The current product experience is for simulated execution. It does not place real-money orders or claim a broker connection.",
          tag: "EXECUTION",
        },
        {
          title: "Risk-aware practice",
          description: "Risk controls help structure decisions, but cannot eliminate trading losses or guarantee execution prices.",
          tag: "RISK",
        },
      ]}
      actionLabel="See platform features"
      actionHref="/features"
    />
  );
}
