"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState("");

  async function logout() {
    setIsLoggingOut(true);
    setError("");

    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Unable to sign out.");
      }

      router.replace("/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
      setError("Sign out failed. Please retry.");
    }
  }

  return (
    <span className={compact ? "inline-flex flex-col" : "block"}>
      <button
        type="button"
        onClick={logout}
        disabled={isLoggingOut}
        className={`flex items-center gap-2 rounded-lg text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:opacity-60 ${compact ? "px-3 py-2" : "w-full px-3 py-2"}`}
      >
        <LogOut className="h-4 w-4" />
        {isLoggingOut ? "Signing out..." : "Logout"}
      </button>
      {error ? <span role="alert" className="px-3 text-[10px] text-rose-300">{error}</span> : null}
    </span>
  );
}
