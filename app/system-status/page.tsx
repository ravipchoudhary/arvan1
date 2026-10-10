import { AppShell } from "@/components/layout/trading-shell";

const components = [
  {
    name: "Application",
    status: "Operational",
    detail: "The web application and authenticated navigation are available.",
    tone: "text-emerald-300",
  },
  {
    name: "Database",
    status: "Connection unverified",
    detail: "A database URL is configured, but live connectivity is not confirmed by this UI.",
    tone: "text-amber-200",
  },
  {
    name: "Market-data adapter",
    status: "Not configured",
    detail: "Market charts and sample instruments are labeled demo data.",
    tone: "text-slate-300",
  },
  {
    name: "Strategy and risk engines",
    status: "Not configured",
    detail: "Server-side evaluation and risk enforcement need deployment configuration before order entry.",
    tone: "text-amber-200",
  },
  {
    name: "Broker adapter",
    status: "Disabled",
    detail: "Live broker execution is intentionally unavailable.",
    tone: "text-slate-300",
  },
];

export default function SystemStatusPage() {
  return (
    <AppShell
      title="System Status"
      subtitle="See which integrations are actually available before relying on a workflow."
      active="/system-status"
    >
      <div className="space-y-3">
        {components.map((component) => (
          <section key={component.name} className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-white">{component.name}</h2>
              <span className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${component.tone}`}>{component.status}</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">{component.detail}</p>
          </section>
        ))}
      </div>
    </AppShell>
  );
}
