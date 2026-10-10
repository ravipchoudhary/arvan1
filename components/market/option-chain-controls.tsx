"use client";

import Link from "next/link";
import { useState } from "react";

type Row = {
  strike: number;
  ce: { oi: number; ltp: number; change: number };
  pe: { oi: number; ltp: number; change: number };
};

export function OptionChainControls({ rows }: { rows: Row[] }) {
  const [index, setIndex] = useState("NIFTY 50");
  const [expiry, setExpiry] = useState("");
  const [selected, setSelected] = useState<{ strike: number; side: "CE" | "PE" } | null>(null);
  const [saved, setSaved] = useState(false);

  function selectContract(strike: number, side: "CE" | "PE") {
    setSelected({ strike, side });
    setSaved(false);
  }

  function saveContract() {
    if (!selected) return;
    window.sessionStorage.setItem(
      "arvan-selected-contract",
      JSON.stringify({ ...selected, index, expiry }),
    );
    window.dispatchEvent(new Event("arvan:selected-contract"));
    setSaved(true);
  }

  return (
    <div>
      <div className="grid gap-3 rounded-xl border border-slate-800 bg-[#0b1728] p-4 sm:grid-cols-2">
        <label className="text-xs text-slate-400">
          Index
          <select value={index} onChange={(event) => setIndex(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white">
            <option>NIFTY 50</option>
            <option>BANKNIFTY</option>
            <option>FINNIFTY</option>
          </select>
        </label>
        <label className="text-xs text-slate-400">
          Expiry
          <select value={expiry} onChange={(event) => setExpiry(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white">
            <option value="">Select expiry</option>
            <option value="DEMO-WEEKLY">Weekly · demo</option>
            <option value="DEMO-MONTHLY">Monthly · demo</option>
          </select>
        </label>
        <p className="text-[10px] leading-5 text-amber-200 sm:col-span-2">
          DEMO DATA — selected index, expiry, prices and open interest are illustrative. This is not a live option chain.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-[#0b1728]">
        <table className="min-w-[760px] w-full text-left text-xs">
          <thead className="bg-slate-950/70 text-slate-400">
            <tr>
              <th colSpan={3} className="px-3 py-2 text-center text-cyan-300">CALL OPTIONS</th>
              <th className="px-3 py-2 text-center text-white">STRIKE</th>
              <th colSpan={3} className="px-3 py-2 text-center text-rose-300">PUT OPTIONS</th>
            </tr>
            <tr>
              <th className="px-3 py-2">OI</th><th className="px-3 py-2">LTP</th><th className="px-3 py-2">Change</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Change</th><th className="px-3 py-2">LTP</th><th className="px-3 py-2">OI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.strike} className={`border-t border-slate-800 ${row.strike === 24800 ? "bg-teal-500/5" : ""}`}>
                <td className="px-3 py-3 text-slate-300">{row.ce.oi.toLocaleString("en-IN")}</td>
                <td className="px-3 py-3 text-slate-200">{row.ce.ltp.toFixed(2)}</td>
                <td className={`px-3 py-3 ${row.ce.change >= 0 ? "text-emerald-300" : "text-rose-300"}`}>{row.ce.change > 0 ? "+" : ""}{row.ce.change}%</td>
                <td className="px-3 py-3 text-center font-semibold text-white">{row.strike.toLocaleString("en-IN")}{row.strike === 24800 ? " · ATM*" : ""}</td>
                <td className={`px-3 py-3 ${row.pe.change >= 0 ? "text-emerald-300" : "text-rose-300"}`}>{row.pe.change > 0 ? "+" : ""}{row.pe.change}%</td>
                <td className="px-3 py-3 text-slate-200">{row.pe.ltp.toFixed(2)}</td>
                <td className="px-3 py-3 text-slate-300">{row.pe.oi.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-slate-800">
              <td colSpan={3} className="px-3 py-3 text-right">
                <div className="inline-flex gap-2">
                  {rows.map((row) => (
                    <button key={`ce-${row.strike}`} type="button" onClick={() => selectContract(row.strike, "CE")} className={`rounded px-2 py-1 text-[10px] ${selected?.strike === row.strike && selected.side === "CE" ? "bg-teal-400 text-slate-950" : "border border-slate-700 text-cyan-200"}`}>
                      {row.strike} CE
                    </button>
                  ))}
                </div>
              </td>
              <td className="px-3 py-3 text-center text-[10px] text-slate-500">SELECT</td>
              <td colSpan={4} className="px-3 py-3">
                <div className="flex flex-wrap gap-2">
                  {rows.map((row) => (
                    <button key={`pe-${row.strike}`} type="button" onClick={() => selectContract(row.strike, "PE")} className={`rounded px-2 py-1 text-[10px] ${selected?.strike === row.strike && selected.side === "PE" ? "bg-teal-400 text-slate-950" : "border border-slate-700 text-rose-200"}`}>
                      {row.strike} PE
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0b1728] p-4">
        <div className="text-xs text-slate-300">
          {selected ? (
            <>
              Selected demo contract: <strong className="text-white">{index} {selected.strike} {selected.side}</strong>
              {expiry ? <span className="text-slate-400"> · {expiry.replace("DEMO-", "")}</span> : null}
            </>
          ) : "Select a call or put contract to add it to the current browser session."}
          {saved ? <p role="status" className="mt-1 text-emerald-300">Selection saved for this browser session.</p> : null}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={saveContract} disabled={!selected || !expiry} className="rounded-lg bg-teal-400 px-3 py-2 text-xs font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">
            Save selection
          </button>
          <Link href="/paper-trading" onClick={saveContract} className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 hover:border-slate-500">
            Open paper terminal
          </Link>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-500">*ATM mark is illustrative and reflects only this sample table, not a live underlying quote.</p>
    </div>
  );
}
