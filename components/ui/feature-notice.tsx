import Link from "next/link";

export function FeatureNotice({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href?: string;
  action?: string;
}) {
  return (
    <section className="rounded-xl border border-slate-800 bg-[#0b1728] p-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">No persisted data</p>
      <h2 className="mt-2 text-base font-semibold text-white">{title}</h2>
      <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">{description}</p>
      {href && action ? (
        <Link href={href} className="mt-4 inline-flex rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-teal-500/40 hover:text-teal-200">
          {action}
        </Link>
      ) : null}
    </section>
  );
}
