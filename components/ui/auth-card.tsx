import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthCard({
  title,
  subtitle,
  cta,
  footer,
  children,
}: {
  title: string;
  subtitle: string;
  cta: string;
  footer: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#06131f] px-4 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-950/85 p-8 shadow-2xl shadow-slate-950/40">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 text-base font-bold text-slate-950">
            A
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Fintech desk</p>
            <h1 className="text-xl font-semibold text-white">ARVAN</h1>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        </div>

        {children}

        <button className="mt-6 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20">
          {cta}
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          {footer}{" "}
          <Link href={footer.includes("Login") ? "/login" : "/signup"} className="font-medium text-cyan-300 hover:text-cyan-200">
            {footer.includes("Login") ? "Login" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
}
