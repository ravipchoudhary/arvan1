import { Suspense } from "react";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#07111F] text-slate-100">Loading…</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
