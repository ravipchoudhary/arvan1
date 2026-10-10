"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) {
        setFeedback(data.error ?? "Unable to process password reset request.");
        return;
      }

      setFeedback("Password reset delivery is not configured in this environment.");
    } catch {
      setFeedback("The password reset service is unavailable.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111F] px-4 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-[28px] border border-slate-800 bg-[#0B1728] p-8 shadow-2xl shadow-slate-950/40">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Account recovery</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Forgot password</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Email address</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-teal-400"
              placeholder="you@example.com"
            />
          </label>

          {feedback ? (
            <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">{feedback}</div>
          ) : (
            <p className="text-sm text-slate-400">No reset email is configured in this environment. Use a trusted admin-approved flow to reset access.</p>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-3 font-semibold text-slate-950 disabled:opacity-60">
            {isSubmitting ? "Checking availability..." : "Reset password"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Back to <Link href="/login" className="font-medium text-teal-300">Login</Link>
        </div>
      </div>
    </main>
  );
}
