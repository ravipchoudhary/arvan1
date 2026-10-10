"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

type LocalStrategyState = "stopped" | "watching" | "paused";

const descriptions = [
  {
    name: "Support & Resistance Rejection",
    rule: "Observe a pre-configured level, then wait for a defined rejection confirmation.",
    conditions: ["Level must be configured", "Price interaction must be confirmed", "Risk checks must pass before any paper order"],
  },
  {
    name: "Breakout + Retest",
    rule: "Observe a confirmed level break, then check the retest and confirmation conditions.",
    conditions: ["Breakout must be confirmed", "Retest must occur", "Risk checks must pass before any paper order"],
  },
];

const localStatesKey = "arvan-local-strategy-states";
const localStatesEvent = "arvan:strategy-states";

function subscribeToLocalStates(onChange: () => void) {
  window.addEventListener(localStatesEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(localStatesEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getLocalStatesSnapshot() {
  return window.localStorage.getItem(localStatesKey);
}

function parseStates(raw: string | null): Record<string, LocalStrategyState> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as Record<string, LocalStrategyState>;
    const valid: Record<string, LocalStrategyState> = {};
    for (const strategy of descriptions) {
      const value = parsed[strategy.name];
      if (value === "stopped" || value === "watching" || value === "paused") {
        valid[strategy.name] = value;
      }
    }
    return valid;
  } catch {
    return {};
  }
}

function getPreferencesSnapshot() {
  return window.localStorage.getItem("arvan-preferences");
}

export function StrategyControls() {
  const stored = useSyncExternalStore(subscribeToLocalStates, getLocalStatesSnapshot, () => null);
  const states = parseStates(stored);
  const preferencesRaw = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("arvan:preferences", onChange);
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener("arvan:preferences", onChange);
        window.removeEventListener("storage", onChange);
      };
    },
    getPreferencesSnapshot,
    () => null,
  );
  let showExplanations = true;
  if (preferencesRaw) {
    try {
      const preferences = JSON.parse(preferencesRaw) as { strategyExplanations?: boolean };
      showExplanations = preferences.strategyExplanations ?? true;
    } catch {
      showExplanations = true;
    }
  }

  function update(name: string, status: LocalStrategyState) {
    const next = { ...states, [name]: status };
    window.localStorage.setItem(localStatesKey, JSON.stringify(next));
    window.dispatchEvent(new Event(localStatesEvent));
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {descriptions.map((strategy) => {
        const status = states[strategy.name] ?? "stopped";
        const stateLabel = status === "watching" ? "LOCAL WATCH CONFIGURED" : status === "paused" ? "PAUSED LOCALLY" : "NOT STARTED";

        return (
          <article key={strategy.name} className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500">Supported strategy</p>
                <h2 className="mt-1 text-base font-semibold text-white">{strategy.name}</h2>
              </div>
              <span className="rounded border border-slate-700 bg-slate-950/60 px-2 py-1 text-[9px] font-semibold tracking-wide text-slate-300">{stateLabel}</span>
            </div>

            {showExplanations ? (
              <>
                <p className="mt-3 text-xs leading-5 text-slate-300">{strategy.rule}</p>
                <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-slate-500">Conditions to review</p>
                  <ul className="mt-2 space-y-2">
                    {strategy.conditions.map((condition) => (
                      <li key={condition} className="flex gap-2 text-xs text-slate-300">
                        <span aria-hidden="true" className="text-amber-300">•</span>
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <p className="mt-3 text-xs text-slate-500">Rule explanations are hidden by your local preferences.</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {status === "stopped" ? (
                <button type="button" onClick={() => update(strategy.name, "watching")} className="rounded-lg bg-teal-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-teal-300">Start local review</button>
              ) : status === "watching" ? (
                <button type="button" onClick={() => update(strategy.name, "paused")} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">Pause local review</button>
              ) : (
                <button type="button" onClick={() => update(strategy.name, "watching")} className="rounded-lg bg-teal-400 px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-teal-300">Resume local review</button>
              )}
              {status !== "stopped" ? (
                <button type="button" onClick={() => update(strategy.name, "stopped")} className="rounded-lg border border-rose-500/30 px-3 py-2 text-xs text-rose-200 hover:bg-rose-500/10">Stop</button>
              ) : null}
              <Link href="/paper-trading" className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">Open Paper Terminal</Link>
            </div>
          </article>
        );
      })}
      <p className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-5 text-amber-100 xl:col-span-2">
        Local review controls save state in this browser only. No server strategy engine or market-data feed is connected, so these controls do not evaluate prices, create sessions on the server, issue signals, or place orders.
      </p>
    </div>
  );
}
