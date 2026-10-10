import { MarketingEditorialPage } from "@/components/marketing/marketing-shell";

export default function StrategyGuidePage() {
  return (
    <MarketingEditorialPage
      eyebrow="Strategy library"
      title="Two structured setups. Clear conditions. No promised signals."
      description="The strategy guides explain the conditions a trader can configure and observe. An eligible setup only means its configured checks passed; it does not predict or guarantee an outcome."
      sections={[
        {
          title: "Support & Resistance Rejection",
          description: "Observe price interaction with configured support or resistance zones, then wait for the selected rejection confirmation and option checks.",
          tag: "DETERMINISTIC RULES",
        },
        {
          title: "Breakout + Retest",
          description: "Track a confirmed break from a selected level, a subsequent retest, and configured confirmation conditions before considering a simulated order.",
          tag: "DETERMINISTIC RULES",
        },
        {
          title: "Understand setup states",
          description: "Monitoring and Waiting mean conditions are still being observed. Eligible means configured checks passed. Risk Blocked or Stopped prevents new entries.",
          tag: "STATE GUIDE",
        },
      ]}
      actionLabel="Open Strategy Analysis"
      actionHref="/login?next=%2Fstrategies"
    />
  );
}
