"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(email.includes("@") ? { email } : { mobile: email }),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Unable to sign in.");
        return;
      }

      const requestedNext = searchParams.get("next");
      const next = requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
        ? requestedNext
        : "/dashboard";
      window.location.assign(next);
    } catch {
      setError("Unable to reach the authentication service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111F] px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[30px] border border-slate-800 bg-[#0B1728] shadow-2xl shadow-slate-950/50 lg:grid-cols-[1.05fr_1.2fr]">
        <section className="relative hidden overflow-hidden border-r border-slate-800 bg-[radial-gradient(circle_at_top,rgba(0,214,160,0.14),transparent_40%),linear-gradient(135deg,#0A1527,#08111E)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/15 text-lg font-bold text-teal-300">A</div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">AI-assisted trading</p>
                <h1 className="text-2xl font-semibold text-white">ARVAN FINTECH</h1>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-teal-300">
                <ShieldCheck className="h-4 w-4" />
                PAPER TRADING
              </div>
              <h2 className="max-w-md text-4xl font-semibold leading-tight text-white">Trade with structure. Review with discipline.</h2>
            </div>

            <div className="rounded-[26px] border border-slate-700/80 bg-slate-950/50 p-5">
              <div className="mb-5 flex items-center justify-between text-sm text-slate-300">
                <span>NIFTY 50</span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-xs text-emerald-300">LIVE</span>
              </div>
              <div className="mb-4 flex items-end gap-3">
                <span className="text-4xl font-semibold text-white">24,832.45</span>
                <span className="mb-1 text-sm text-emerald-300">+0.82%</span>
              </div>
              <div className="flex h-24 overflow-hidden rounded-2xl border border-slate-800 bg-[#081521] p-3">
                {[12, 18, 16, 24, 22, 28, 25, 31, 28, 36, 34, 38, 35].map((height, index) => (
                  <span
                    key={index}
                    className="mx-[1px] flex-1 self-end rounded-t-md bg-gradient-to-t from-cyan-500/90 to-teal-300/90"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-sm font-semibold text-teal-300">A</div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">FINTECH</p>
                  <h1 className="text-xl font-semibold text-white">ARVAN</h1>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Sign in</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Email or mobile number</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-teal-400"
                  placeholder="trader@arvan.app"
                  autoComplete="username"
                />
              </label>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 pr-12 text-white outline-none transition focus:border-teal-400"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-3 flex items-center text-slate-400"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
                <span className="text-xs text-slate-500">Secure session · HttpOnly cookie</span>
                <Link href="/forgot-password" className="text-teal-300 transition hover:text-teal-200">
                  Forgot password?
                </Link>
              </div>

              {error ? (
                <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Need an account?{" "}
              <Link href="/signup" className="font-medium text-teal-300 hover:text-teal-200">
                Create one
              </Link>
            </p>
            {process.env.NODE_ENV === "development" ? (
              <p className="mt-4 text-center text-xs text-slate-500">
                Demo access: trader@arvan.app / Arvan@123
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
