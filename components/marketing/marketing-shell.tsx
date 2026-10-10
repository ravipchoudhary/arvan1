import Link from "next/link";
import type { ReactNode } from "react";

const publicNav = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Strategies", href: "/strategy-guide" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Learning", href: "/learning-guide" },
  { label: "About", href: "/about" },
];

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#07111f]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 md:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 text-sm font-bold text-slate-950">A</span>
            <span>
              <span className="block text-[9px] uppercase tracking-[0.18em] text-slate-400">Fintech</span>
              <span className="block text-base font-semibold leading-4 text-white">ARVAN</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="order-3 flex w-full gap-5 overflow-x-auto pb-1 text-xs text-slate-300 sm:order-none sm:w-auto sm:pb-0 sm:text-sm">
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href} className="shrink-0 transition hover:text-teal-300">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Link href="/login" className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 transition hover:border-slate-500 sm:text-sm">
              Login
            </Link>
            <Link href="/signup" className="rounded-lg bg-teal-400 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-teal-300 sm:text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="border-t border-slate-800 bg-[#091422]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="max-w-md">
            <Link href="/" className="text-sm font-semibold tracking-wide text-white">ARVAN FINTECH</Link>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              AI-assisted options analysis and simulated paper-trading workflows. No real-money order execution.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
            {publicNav.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-slate-200">{item.label}</Link>
            ))}
            <Link href="/risk" className="hover:text-slate-200">Risk Disclosure</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export function MarketingEditorialPage({
  eyebrow,
  title,
  description,
  sections,
  actionLabel,
  actionHref = "/signup",
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: { title: string; description: string; tag?: string }[];
  actionLabel: string;
  actionHref?: string;
}) {
  return (
    <MarketingShell>
      <main className="mx-auto min-h-[70vh] max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-300">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{description}</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section, index) => (
            <article id={`topic-${index + 1}`} key={section.title} className="rounded-xl border border-slate-800 bg-[#0b1728] p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-teal-500/20 bg-teal-500/10 text-xs font-semibold text-teal-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.tag ? <span className="text-[9px] uppercase tracking-[0.14em] text-slate-500">{section.tag}</span> : null}
              </div>
              <h2 className="text-lg font-semibold text-white">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{section.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-slate-800 bg-[#0b1728] p-5">
          <p className="mr-auto text-sm text-slate-300">Practice with structured analysis in a simulated environment.</p>
          <Link href={actionHref} className="rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-teal-300">
            {actionLabel}
          </Link>
        </div>
      </main>
    </MarketingShell>
  );
}
