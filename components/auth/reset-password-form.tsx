"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback("");

    try {
      const token = searchParams.get("token") ?? "";
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await response.json();
      setFeedback(data.error ?? "Password reset is not configured for this environment.");
      if (!response.ok) {
        return;
      }
    } catch {
      setFeedback("Password reset is not configured for this environment.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#07111F] px-4 py-10 text-slate-100">
      <div className="w-full max-w-md rounded-[28px] border border-slate-800 bg-[#0B1728] p-8 shadow-2xl shadow-slate-950/40">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Account recovery</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Reset password</h1>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">New password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-teal-400"
            />
          </label>

          <label className="block text-sm text-slate-300">
            <span className="mb-2 block">Confirm password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-teal-400"
            />
          </label>

          {feedback ? (
            <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">{feedback}</div>
          ) : (
            <p className="text-sm text-slate-400">Reset links are only enabled when the email or SMS provider is configured.</p>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-3 font-semibold text-slate-950 disabled:opacity-60">
            {isSubmitting ? "Submitting..." : "Update password"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Back to <Link href="/login" className="font-medium text-teal-300">Login</Link>
        </div>
      </div>
    </main>
  );
}
