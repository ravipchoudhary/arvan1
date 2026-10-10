import { MarketingEditorialPage } from "@/components/marketing/marketing-shell";

export default function HowItWorksPage() {
  return (
    <MarketingEditorialPage
      eyebrow="How it works"
      title="A repeatable workflow from market selection to trade review."
      description="ARVAN supports preparation and practice for Indian index options. Each order in the platform is simulated and does not represent broker execution."
      sections={[
        {
          title: "Select your market",
          description: "Choose a supported index and review the selected instrument and available option contract context.",
          tag: "STEP 01",
        },
        {
          title: "Configure your strategy",
          description: "Select Support & Resistance Rejection or Breakout + Retest and set the applicable conditions.",
          tag: "STEP 02",
        },
        {
          title: "Monitor setup conditions",
          description: "Check strategy state, market-data freshness, option confirmation, and risk validation.",
          tag: "STEP 03",
        },
        {
          title: "Practice and review",
          description: "Submit a simulated order, then review its status and notes in Orders and the Trade Journal.",
          tag: "STEP 04",
        },
      ]}
      actionLabel="Start Paper Trading"
    />
  );
}
