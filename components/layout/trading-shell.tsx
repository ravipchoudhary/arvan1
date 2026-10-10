import {
  ArrowUpDown,
  ArrowUpRight,
  Bot,
  BookOpenCheck,
  CandlestickChart,
  ChartColumnBig,
  GraduationCap,
  LayoutGrid,
  LifeBuoy,
  NotebookPen,
  ReceiptText,
  ScrollText,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth/session";
import { LogoutButton } from "@/components/auth/logout-button";
import { navItems } from "@/lib/mock-data";

const navIconMap: Record<string, typeof LayoutGrid> = {
  LayoutGrid,
  LifeBuoy,
  TrendingUp,
  CandlestickChart,
  Target,
  ArrowUpDown,
  BookOpenCheck,
  ReceiptText,
  NotebookPen,
  ShieldCheck,
  WalletCards,
  Bot,
  GraduationCap,
  ChartColumnBig,
  Settings2,
  ScrollText,
};

const navGroups = [
  { label: "Main", hrefs: ["/dashboard", "/markets", "/option-chain"] },
  { label: "Trading", hrefs: ["/strategies", "/paper-trading", "/orders", "/trade-journal"] },
  { label: "Risk & Account", hrefs: ["/risk", "/wallet", "/reports"] },
  { label: "Learn", hrefs: ["/learning"] },
  { label: "System", hrefs: ["/automation", "/settings", "/audit"] },
];

export async function AppShell({
  title,
  subtitle,
  active,
  children,
}: {
  title: string;
  subtitle: string;
  active: string;
  children: ReactNode;
}) {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-slate-800 bg-[#091422] p-4 lg:flex lg:flex-col">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-sm font-semibold text-teal-300">
              A
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Fintech</p>
              <h1 className="text-lg font-semibold text-white">ARVAN</h1>
            </div>
          </div>

          <nav aria-label="Trading application navigation" className="space-y-4">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-1 px-3 text-[9px] font-medium uppercase tracking-[0.18em] text-slate-500">{group.label}</p>
                <div className="space-y-0.5">
                  {navItems.filter((item) => group.hrefs.includes(item.href)).map((item) => {
                    const Icon = navIconMap[item.icon] ?? LayoutGrid;
                    const selected = item.href === active;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={[
                          "flex items-center gap-3 rounded-lg border px-3 py-2 text-xs transition-colors",
                          selected
                            ? "border-teal-500/30 bg-teal-500/10 text-teal-200"
                            : "border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-900/60",
                        ].join(" ")}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/70 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Execution mode</p>
            <p className="mt-2 text-sm font-medium text-teal-300">Paper trading only</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Real-money orders are disabled.</p>
          </div>
          <div className="mt-3 space-y-1 border-t border-slate-800 pt-3">
            <Link href="/system-status" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900">
              <ShieldCheck className="h-4 w-4" />
              System Status
            </Link>
            <Link href="/help" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900">
              <LifeBuoy className="h-4 w-4" />
              Help
            </Link>
            <Link href="/settings" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-900">
              <Settings2 className="h-4 w-4" />
              Profile & Settings
            </Link>
            <LogoutButton />
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-10 border-b border-slate-800 bg-[#091422]/95 px-4 py-3 backdrop-blur-sm md:px-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">ARVAN FINTECH / PAPER DESK</p>
                <h2 className="mt-1 text-lg font-semibold text-white md:text-xl">{title}</h2>
                <p className="mt-1 hidden max-w-2xl text-xs text-slate-400 sm:block">{subtitle}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-teal-300">
                  PAPER TRADING
                </span>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-xs font-semibold text-slate-200">
                    {user.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="text-sm text-slate-300">{user.name}</span>
                </div>
                <LogoutButton compact />
              </div>
            </div>
          </header>

          <div className="p-4 pb-24 md:p-6 md:pb-6">
            <div className="mb-4 flex justify-end sm:hidden">
              <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1.5 text-[10px] font-medium text-slate-300">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Market feed: demo data
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-slate-800 bg-[#091422]/95 px-2 py-2 backdrop-blur lg:hidden">
        {[navItems[0], navItems[1], navItems[2], navItems[3], navItems[4]].map((item) => {
          const Icon = navIconMap[item.icon] ?? LayoutGrid;
          const selected = item.href === active;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[10px] ${selected ? "text-teal-300" : "text-slate-400"}`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  delta,
  tone = "default",
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "default" | "positive" | "negative" | "neutral";
}) {
  const toneClass = {
    default: "text-slate-200",
    positive: "text-emerald-300",
    negative: "text-rose-300",
    neutral: "text-cyan-300",
  }[tone];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-500">
        <span>{label}</span>
        <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
      </div>
      <div className="mt-5 flex items-end justify-between gap-3">
        <span className="text-2xl font-semibold text-white">{value}</span>
        {delta ? <span className={`text-xs font-medium ${toneClass}`}>{delta}</span> : null}
      </div>
    </div>
  );
}
