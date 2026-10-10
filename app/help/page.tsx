import Link from "next/link";
import { AppShell } from "@/components/layout/trading-shell";

const helpTopics = [
  ["Paper trading", "Orders displayed by the simulator are practice records. No broker receives them and no real funds are used.", "/paper-trading"],
  ["Market data", "A DEMO DATA label means prices are illustrative and are not live market quotes.", "/markets"],
  ["Strategies", "A waiting or eligible label describes configured checks only and is not a trading recommendation.", "/strategies"],
  ["Risk controls", "Risk limits can reduce certain risks but cannot eliminate loss or ensure execution prices.", "/risk"],
  ["Account settings", "Manage local chart and notification preferences. Email delivery and broker features require configuration.", "/settings"],
];

export default function HelpPage() {
  return (
    <AppShell
      title="Help"
      subtitle="Learn how to use the platform safely and identify demo-only or unconfigured features."
      active="/help"
    >
      <div className="grid gap-3 md:grid-cols-2">
        {helpTopics.map(([title, description, href]) => (
          <Link key={title} href={href} className="rounded-xl border border-slate-800 bg-[#0b1728] p-4 transition hover:border-slate-600">
            <h2 className="text-sm font-semibold text-white">{title}</h2>
            <p className="mt-2 text-xs leading-5 text-slate-400">{description}</p>
            <span className="mt-3 inline-block text-xs text-teal-300">Open section →</span>
          </Link>
        ))}
      </div>
      <p className="mt-5 rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-xs leading-5 text-slate-400">
        No verified company contact information is configured in this project. Do not send credentials, passwords, or broker tokens through unverified channels.
      </p>
    </AppShell>
  );
}
