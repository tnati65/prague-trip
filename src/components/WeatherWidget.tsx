"use client";

import { useRef } from "react";
import { weatherMatrix } from "@/data/tripData";
import type { WeatherCondition } from "@/data/tripData";

function SunIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2.5 12H5M19 12h2.5M4.2 19.8 6 18M18 6l1.8-1.8" />
    </svg>
  );
}

function CloudIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17a4 4 0 0 1 .5-7.97A5.5 5.5 0 0 1 18 10.5 3.5 3.5 0 0 1 17.5 17H7Z" />
    </svg>
  );
}

function CloudRainIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 15a4 4 0 0 1 .5-7.97A5.5 5.5 0 0 1 18 8.5 3.5 3.5 0 0 1 17.5 15H7Z" />
      <path d="M9 18v1M13 18v1M17 18v1" />
    </svg>
  );
}

function PartlyCloudyIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" />
      <path d="M8 2.5v1.5M3.5 8H5M4.5 4.5l1 1" />
      <path d="M9.5 17a4 4 0 0 1 .4-7.97 5.3 5.3 0 0 1 1.9.35A5.5 5.5 0 0 1 20 10.5 3.5 3.5 0 0 1 19.5 17h-10Z" />
    </svg>
  );
}

function ChevronIcon({
  direction,
  className = "h-4 w-4",
}: {
  direction: "left" | "right";
  className?: string;
}) {
  const d = direction === "left" ? "m14 6-6 6 6 6" : "m10 6 6 6-6 6";
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const CONDITION_STYLES: Record<
  WeatherCondition,
  { Icon: typeof SunIcon; className: string }
> = {
  sunny: { Icon: SunIcon, className: "text-amber-500" },
  "partly-cloudy": { Icon: PartlyCloudyIcon, className: "text-amber-400" },
  cloudy: { Icon: CloudIcon, className: "text-zinc-400" },
  rainy: { Icon: CloudRainIcon, className: "text-sky-500" },
};

export default function WeatherWidget() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (delta: number) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  const { dates, rows } = weatherMatrix;

  return (
    <div dir="rtl" className="flex flex-col gap-4">
      <div className="relative">
        <button
          type="button"
          onClick={() => scrollByAmount(-160)}
          aria-label="גלול לתאריכים קודמים"
          className="absolute right-0 top-1/2 z-30 -translate-y-1/2 rounded-full bg-zinc-100/90 p-1.5 text-zinc-500 shadow-sm backdrop-blur transition hover:bg-zinc-200 dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <ChevronIcon direction="right" />
        </button>
        <button
          type="button"
          onClick={() => scrollByAmount(160)}
          aria-label="גלול לתאריכים הבאים"
          className="absolute left-0 top-1/2 z-30 -translate-y-1/2 rounded-full bg-zinc-100/90 p-1.5 text-zinc-500 shadow-sm backdrop-blur transition hover:bg-zinc-200 dark:bg-zinc-800/90 dark:text-zinc-300 dark:hover:bg-zinc-700"
        >
          <ChevronIcon direction="left" />
        </button>

        <div
          ref={scrollerRef}
          className="scrollbar-none flex w-full flex-col overflow-x-auto"
        >
          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="sticky right-0 z-20 w-28 shrink-0 border-b border-zinc-100 bg-white px-2 py-2 text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                  מיקום
                </th>
                {dates.map((d) => (
                  <th
                    key={d.date}
                    className="min-w-[72px] border-b border-zinc-100 px-2 py-2 text-center text-xs font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-200">
                        {d.dayOfWeek}
                      </span>
                      <span dir="ltr">{d.date}</span>
                      <span className="max-w-[70px] text-[10px] leading-tight text-zinc-400 dark:text-zinc-500">
                        {d.destination}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.location}>
                  <td className="sticky right-0 z-10 border-b border-zinc-100 bg-white px-2 py-3 text-xs font-semibold dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex flex-col gap-0.5">
                      <span>{row.location}</span>
                      {row.meta && (
                        <span className="text-[10px] font-normal text-zinc-400 dark:text-zinc-500">
                          {row.meta}
                        </span>
                      )}
                    </div>
                  </td>
                  {row.cells.map((cell, i) => {
                    const { Icon, className } =
                      CONDITION_STYLES[cell.condition];
                    return (
                      <td
                        key={i}
                        className="border-b border-zinc-100 px-2 py-3 text-center align-top dark:border-zinc-800"
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Icon className={`h-5 w-5 ${className}`} />
                          <span
                            dir="ltr"
                            className="text-xs font-semibold text-zinc-700 dark:text-zinc-200"
                          >
                            {cell.tempMax}° {cell.tempMin}°
                          </span>
                          <span
                            dir="ltr"
                            className="text-[11px] text-sky-600 dark:text-sky-400"
                          >
                            {cell.rainChance}%
                          </span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-2xl bg-rose-50/50 p-4 text-sm leading-snug text-rose-900 dark:bg-rose-900/15 dark:text-rose-200">
          <p className="mb-1 font-semibold">💡 איך להשתמש בזה</p>
          <p>
            השוו בין המיקומים באותו יום כדי לזהות אילו אזורים צפויים להיות
            יבשים ושטופי שמש יותר. אם יום מסוים נראה גשום במיקום המתוכנן אבל
            נקי יותר במיקום אחר, שווה לשקול להחליף בין ימי הטיול ולעבור לאזור
            עם החלון הכי שמשי באותו שבוע.
          </p>
        </div>

        <div className="rounded-2xl bg-amber-50/50 p-4 text-sm leading-snug text-amber-900 dark:bg-amber-900/15 dark:text-amber-200">
          <p className="mb-1 font-semibold">⚠️ עד כמה לסמוך על זה</p>
          <p>
            תחזיות ל-1–3 ימים קדימה מדויקות ברוב המקרים. תחזיות ל-4–7 ימים
            משקפות מגמה כללית בלבד ועשויות להשתנות. מעבר ל-10 ימים קדימה
            (כמו בתחילת תכנון הטיול) מדובר בכיוון עונתי גס בלבד — יש לבדוק
            תחזית מעודכנת סמוך בפועל למועד הנסיעה.
          </p>
        </div>
      </div>
    </div>
  );
}
