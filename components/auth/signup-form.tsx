"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Unable to create account.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to complete registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07111F] px-4 py-8 text-slate-100 md:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[30px] border border-slate-800 bg-[#0B1728] shadow-2xl shadow-slate-950/50 lg:grid-cols-[1fr_1.1fr]">
        <section className="hidden overflow-hidden border-r border-slate-800 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_44%),linear-gradient(135deg,#0B1728,#08131E)] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-lg font-bold text-cyan-300">A</div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Build disciplined execution</p>
              <h1 className="text-2xl font-semibold text-white">ARVAN FINTECH</h1>
            </div>
          </div>

          <div className="space-y-6">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-300">
              <ShieldCheck className="h-4 w-4" />
              RISK-GATED PLATFORM
            </div>
            <h2 className="max-w-sm text-4xl font-semibold leading-tight text-white">Open a paper-trading desk built for structured decisions.</h2>
            <p className="max-w-md text-base leading-7 text-slate-300">
              Monitor index conditions, configure strategy states, and practice in a simulated environment with guardrails designed to protect your capital discipline.
            </p>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-lg">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Get started</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Create account</h2>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Full name</span>
                <input
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-teal-400"
                  placeholder="Aarav Shah"
                />
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-teal-400"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Mobile</span>
                  <input
                    value={form.mobile}
                    onChange={(event) => setForm({ ...form, mobile: event.target.value })}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-teal-400"
                    placeholder="+91 98765 43210"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Password</span>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(event) => setForm({ ...form, password: event.target.value })}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 pr-12 text-white outline-none focus:border-teal-400"
                    />
                    <button type="button" className="absolute inset-y-0 right-3 flex items-center text-slate-400" onClick={() => setShowPassword((value) => !value)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>

                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Confirm password</span>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 pr-12 text-white outline-none focus:border-teal-400"
                    />
                    <button type="button" className="absolute inset-y-0 right-3 flex items-center text-slate-400" onClick={() => setShowConfirmPassword((value) => !value)}>
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-950/60 p-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={(event) => setForm({ ...form, termsAccepted: event.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-950"
                />
                I agree to the terms and acknowledge that this is a paper-trading platform for simulated analysis and execution only.
              </label>

              {error ? (
                <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{error}</div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-teal-300 hover:text-teal-200">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
