"use client";

import { FormEvent, useState, useSyncExternalStore } from "react";
import { Check, Save } from "lucide-react";

type Preferences = {
  defaultIndex: string;
  emailAlerts: boolean;
  browserAlerts: boolean;
  strategyExplanations: boolean;
  soundAlerts: boolean;
};

const initialPreferences: Preferences = {
  defaultIndex: "NIFTY 50",
  emailAlerts: false,
  browserAlerts: false,
  strategyExplanations: true,
  soundAlerts: false,
};

const fieldClass = "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-teal-400";
const preferencesEvent = "arvan:preferences";

function subscribeToPreferences(onChange: () => void) {
  window.addEventListener(preferencesEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(preferencesEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getPreferencesSnapshot() {
  return window.localStorage.getItem("arvan-preferences");
}

function parsePreferences(raw: string | null): Preferences {
  if (!raw) return initialPreferences;
  try {
    return { ...initialPreferences, ...JSON.parse(raw) as Partial<Preferences> };
  } catch {
    return initialPreferences;
  }
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-slate-800 py-4 last:border-b-0">
      <span>
        <span className="block text-sm font-medium text-slate-200">{label}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-400">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 shrink-0 accent-teal-400"
      />
    </label>
  );
}

export function SettingsControls({
  user,
}: {
  user: { name: string; email: string };
}) {
  const [tab, setTab] = useState("Trading preferences");
  const [draft, setDraft] = useState<Preferences | null>(null);
  const [feedback, setFeedback] = useState("");
  const savedRaw = useSyncExternalStore(subscribeToPreferences, getPreferencesSnapshot, () => null);
  const preferences = draft ?? parsePreferences(savedRaw);

  function updatePreferences(patch: Partial<Preferences>) {
    setDraft({ ...preferences, ...patch });
    setFeedback("");
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem("arvan-preferences", JSON.stringify(preferences));
    window.dispatchEvent(new Event(preferencesEvent));
    setDraft(null);
    setFeedback("Preferences saved on this device.");
  }

  function reset() {
    window.localStorage.removeItem("arvan-preferences");
    window.dispatchEvent(new Event(preferencesEvent));
    setDraft(null);
    setFeedback("Preferences restored to defaults.");
  }

  const tabs = ["Profile", "Security", "Notifications", "Trading preferences", "Broker connection"];

  return (
    <div className="grid gap-4 xl:grid-cols-[210px_1fr]">
      <nav aria-label="Settings sections" className="flex gap-2 overflow-x-auto xl:flex-col">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setTab(item);
              setFeedback("");
            }}
            className={`shrink-0 rounded-lg border px-3 py-2.5 text-left text-sm transition ${tab === item ? "border-teal-500/30 bg-teal-500/10 text-teal-200" : "border-slate-800 bg-[#0b1728] text-slate-300 hover:border-slate-600"}`}
          >
            {item}
          </button>
        ))}
      </nav>

      <section className="rounded-xl border border-slate-800 bg-[#0b1728] p-4 md:p-5">
        {tab === "Profile" ? (
          <>
            <h2 className="text-base font-semibold text-white">Profile</h2>
            <p className="mt-1 text-xs text-slate-400">Identity currently comes from the authenticated account session.</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                <dt className="text-[10px] uppercase tracking-wide text-slate-500">Full name</dt>
                <dd className="mt-1 text-sm text-slate-200">{user.name}</dd>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                <dt className="text-[10px] uppercase tracking-wide text-slate-500">Email</dt>
                <dd className="mt-1 text-sm text-slate-200">{user.email}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-amber-200">Profile edits require persistent account storage, which is not connected in this demo environment.</p>
          </>
        ) : null}

        {tab === "Trading preferences" ? (
          <form onSubmit={save}>
            <h2 className="text-base font-semibold text-white">Trading preferences</h2>
            <p className="mt-1 text-xs text-slate-400">These preferences affect this browser only; the order safety rules are not configurable here.</p>
            <div className="mt-5 max-w-sm">
              <label className="block text-xs text-slate-400">
                Default index
                <select value={preferences.defaultIndex} onChange={(event) => updatePreferences({ defaultIndex: event.target.value })} className={`${fieldClass} mt-2`}>
                  <option>NIFTY 50</option>
                  <option>BANKNIFTY</option>
                  <option>FINNIFTY</option>
                </select>
              </label>
            </div>
            <div className="mt-5">
              <Toggle label="Strategy explanations" description="Show rule context alongside strategy states." checked={preferences.strategyExplanations} onChange={(value) => updatePreferences({ strategyExplanations: value })} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-teal-300">
                <Save className="h-4 w-4" /> Save preferences
              </button>
              <button type="button" onClick={reset} className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm text-slate-300 hover:border-slate-500">Reset</button>
            </div>
          </form>
        ) : null}

        {tab === "Notifications" ? (
          <form onSubmit={save}>
            <h2 className="text-base font-semibold text-white">Notifications</h2>
            <p className="mt-1 text-xs text-slate-400">Browser preferences save locally. External alert delivery is not configured.</p>
            <div className="mt-4">
              <Toggle label="Browser notifications" description="Remember the preference; no push service is connected." checked={preferences.browserAlerts} onChange={(value) => updatePreferences({ browserAlerts: value })} />
              <Toggle label="Email alerts" description="Email delivery will not start until an email provider is configured." checked={preferences.emailAlerts} onChange={(value) => updatePreferences({ emailAlerts: value })} />
              <Toggle label="Sound alerts" description="Remember the preference; no market alert engine is connected." checked={preferences.soundAlerts} onChange={(value) => updatePreferences({ soundAlerts: value })} />
            </div>
            <button type="submit" className="mt-5 inline-flex items-center gap-2 rounded-lg bg-teal-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-teal-300">
              <Save className="h-4 w-4" /> Save notification preferences
            </button>
          </form>
        ) : null}

        {tab === "Security" ? (
          <>
            <h2 className="text-base font-semibold text-white">Security</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
                <p className="text-sm text-slate-200">Current session</p>
                <p className="mt-1 text-xs text-slate-400">Signed session cookie · HttpOnly · SameSite=Lax</p>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <p className="text-sm text-amber-100">Password reset delivery unavailable</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">Email/SMS reset provider is not configured, so password changes cannot be safely completed here.</p>
              </div>
            </div>
          </>
        ) : null}

        {tab === "Broker connection" ? (
          <>
            <h2 className="text-base font-semibold text-white">Broker connection</h2>
            <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-200">Broker adapter</p>
                <span className="rounded border border-slate-700 px-2 py-1 text-[10px] font-semibold tracking-wide text-slate-300">NOT CONFIGURED</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-400">Broker credentials are not detected. Live orders and broker authorization remain disabled.</p>
            </div>
          </>
        ) : null}

        {feedback ? (
          <p role="status" className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-300">
            <Check className="h-4 w-4" /> {feedback}
          </p>
        ) : null}
      </section>
    </div>
  );
}
