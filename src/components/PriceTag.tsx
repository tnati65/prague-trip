import type { Price } from "@/data/prague-trip";

export default function PriceTag({ price }: { price: Price }) {
  if (price.status === "placeholder") {
    return (
      <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        מחיר לא ידוע
      </span>
    );
  }

  const label = price.status === "verified" ? "מאומת" : "משוער";
  const badgeClass =
    price.status === "verified"
      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
      : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
    >
      {price.amount} {price.currency}
      <span className="opacity-70">· {label}</span>
    </span>
  );
}
