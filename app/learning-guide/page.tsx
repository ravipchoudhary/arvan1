import { MarketingEditorialPage } from "@/components/marketing/marketing-shell";

export default function LearningGuidePage() {
  return (
    <MarketingEditorialPage
      eyebrow="Learning center"
      title="Learn the mechanics before practicing the workflow."
      description="Use these learning tracks to build familiarity with option contracts, market structure, simulated execution, and risk discipline. No course-completion progress is claimed on this public preview."
      sections={[
        {
          title: "Options Basics",
          description: "Understand calls, puts, strike prices, expiries, premiums, and the risks of options contracts.",
          tag: "FOUNDATIONS",
        },
        {
          title: "Support & Resistance",
          description: "Study how price interacts with configured levels and why a level is a reference rather than a guarantee.",
          tag: "MARKET STRUCTURE",
        },
        {
          title: "Breakout + Retest",
          description: "Learn the difference between an initial level break, a retest, and confirmation conditions.",
          tag: "SETUPS",
        },
        {
          title: "Risk Management",
          description: "Explore loss thresholds, exposure, position sizing, and why risk controls cannot remove market risk.",
          tag: "DISCIPLINE",
        },
        {
          title: "Paper Trading",
          description: "Practice order entry and review simulated results without confusing a simulation for live execution.",
          tag: "PRACTICE",
        },
        {
          title: "Trading Discipline",
          description: "Use a consistent pre-trade checklist and document decisions for later review.",
          tag: "PROCESS",
        },
      ]}
      actionLabel="Explore the platform"
      actionHref="/signup"
    />
  );
}
