"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { CandlestickChart } from "@/components/charts/candlestick-chart";

type SelectedContract = {
  index: string;
  expiry: string;
  strike: number;
  side: "CE" | "PE";
};

type MarketChoice = {
  index: string;
  strike: number;
  side: "CE" | "PE";
  expiry: string;
};

const instrumentPrices: Record<string, number> = {
  "NIFTY 50 24800 CE": 127.2,
  "NIFTY 50 24800 PE": 281.4,
};

function subscribeToContract(onChange: () => void) {
  window.addEventListener("arvan:selected-contract", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("arvan:selected-contract", onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getContractSnapshot() {
  return window.sessionStorage.getItem("arvan-selected-contract");
}

function getSelectedContract(raw: string | null): SelectedContract | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as SelectedContract;
    if (
      typeof value.index === "string" &&
      Number.isInteger(value.strike) &&
      (value.side === "CE" || value.side === "PE")
    ) {
      return value;
    }
  } catch {
    window.sessionStorage.removeItem("arvan-selected-contract");
  }
  return null;
}

function getPreferenceSnapshot() {
  return window.localStorage.getItem("arvan-preferences");
}

export function OrderPreview() {
  const [manualChoice, setManualChoice] = useState<MarketChoice | null>(null);
  const [quantity, setQuantity] = useState(25);
  const [hasPreview, setHasPreview] = useState(false);
  const contractRaw = useSyncExternalStore(subscribeToContract, getContractSnapshot, () => "");
  const preferencesRaw = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("arvan:preferences", onChange);
      window.addEventListener("storage", onChange);
      return () => {
        window.removeEventListener("arvan:preferences", onChange);
        window.removeEventListener("storage", onChange);
      };
    },
    getPreferenceSnapshot,
    () => null,
  );
  const contract = getSelectedContract(contractRaw);
  let preferredIndex = "NIFTY 50";
  if (preferencesRaw) {
    try {
      const preferences = JSON.parse(preferencesRaw) as { defaultIndex?: string };
      if (preferences.defaultIndex) preferredIndex = preferences.defaultIndex;
    } catch {
      preferredIndex = "NIFTY 50";
    }
  }
  const underlying = manualChoice?.index ?? contract?.index ?? preferredIndex;
  const strike = manualChoice?.strike ?? contract?.strike ?? 24800;
  const optionSide = manualChoice?.side ?? contract?.side ?? "CE";
  const selectedExpiry = manualChoice?.expiry ?? contract?.expiry ?? "";
  const symbol = `${underlying} ${strike} ${optionSide}`;
  const demoPrice = instrumentPrices[symbol] ?? null;
  const estimate = useMemo(
    () => (demoPrice === null ? null : demoPrice * quantity),
    [demoPrice, quantity],
  );

  function calculatePreview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (estimate === null) return;
    setHasPreview(true);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr]">
      <section className="rounded-xl border border-slate-800 bg-[#0b1728] p-3 md:p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500">Index chart</p>
            <h2 className="mt-1 text-sm font-semibold text-white">{underlying} · 5 minute</h2>
          </div>
          <Link href="/markets" className="text-xs text-teal-300 hover:text-teal-200">Markets</Link>
        </div>
        <CandlestickChart />
        <p className="mt-2 text-[10px] text-amber-200">DEMO DATA · This is a NIFTY sample chart, not a live or selected-index candle series.</p>
      </section>

      <section className="rounded-xl border border-slate-800 bg-[#0b1728] p-4">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[9px] uppercase tracking-[0.16em] text-slate-500">Simulated order ticket</p>
            <h2 className="mt-1 text-base font-semibold text-white">Paper order preview</h2>
          </div>
          <span className="rounded border border-teal-500/30 bg-teal-500/10 px-2 py-1 text-[9px] font-semibold tracking-wide text-teal-200">PAPER ONLY</span>
        </div>

        <form onSubmit={calculatePreview} className="space-y-4">
          <label className="block text-xs text-slate-400">
            Underlying
            <select value={underlying} onChange={(event) => { setManualChoice({ index: event.target.value, strike, side: optionSide, expiry: "" }); setHasPreview(false); }} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white">
              <option>NIFTY 50</option>
              <option>BANKNIFTY</option>
              <option>FINNIFTY</option>
            </select>
          </label>

          <label className="block text-xs text-slate-400">
            Strike
            <select value={strike} onChange={(event) => { setManualChoice({ index: underlying, strike: Number(event.target.value), side: optionSide, expiry: "" }); setHasPreview(false); }} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white">
              {[24000, 24200, 24500, 24800, 25000].map((value) => <option key={value} value={value}>{value.toLocaleString("en-IN")}</option>)}
            </select>
          </label>

          <fieldset>
            <legend className="mb-2 text-xs text-slate-400">Option side</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["CE", "PE"] as const).map((side) => (
                <button key={side} type="button" onClick={() => { setManualChoice({ index: underlying, strike, side, expiry: "" }); setHasPreview(false); }} className={`rounded-lg border px-3 py-2 text-sm font-semibold ${optionSide === side ? "border-teal-400 bg-teal-400/10 text-teal-200" : "border-slate-700 text-slate-300"}`}>
                  {side}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block text-xs text-slate-400">
            Quantity (units)
            <input type="number" min={1} max={1000} step={1} value={quantity} onChange={(event) => { setQuantity(Math.max(1, Number(event.target.value))); setHasPreview(false); }} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white" />
          </label>

          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">Contract</span>
              <span className="text-right text-slate-200">{symbol}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">Demo price</span>
              <span className="text-slate-200">{demoPrice === null ? "Unavailable for selected demo contract" : `₹${demoPrice.toFixed(2)}`}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3 text-xs">
              <span className="text-slate-400">Estimated value</span>
              <span className="font-semibold text-white">{estimate === null ? "Unavailable" : `₹${estimate.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`}</span>
            </div>
            {selectedExpiry ? <p className="mt-2 text-[10px] text-slate-500">Selected expiry: {selectedExpiry}</p> : null}
          </div>

          <button type="submit" disabled={estimate === null} title={estimate === null ? "No sample price is available for this contract" : undefined} className="w-full rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-50">
            {estimate === null ? "Preview unavailable for this demo contract" : "Calculate paper preview"}
          </button>
        </form>

        {hasPreview ? (
          <div role="status" className="mt-3 rounded-lg border border-cyan-500/25 bg-cyan-500/5 p-3 text-xs leading-5 text-cyan-100">
            Preview calculated for {quantity} units at a sample estimate of ₹{estimate?.toLocaleString("en-IN", { maximumFractionDigits: 2 })}. This is not a placed or persisted order.
          </div>
        ) : null}

        <div className="mt-3 rounded-lg border border-rose-500/25 bg-rose-500/5 p-3 text-[11px] leading-5 text-rose-100">
          Order submission is unavailable: server-side risk enforcement and order persistence are not configured. No order has been submitted.
        </div>
        <Link href="/system-status" className="mt-3 inline-flex text-xs text-teal-300 hover:text-teal-200">Review required system services</Link>
      </section>
    </div>
  );
}
