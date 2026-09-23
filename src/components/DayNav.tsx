"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tripDays } from "@/data/prague-trip";

export default function DayNav({ activeDayId }: { activeDayId?: number }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex w-full max-w-2xl gap-2 overflow-x-auto px-3 py-2 snap-x snap-mandatory lg:max-w-4xl lg:px-8">
        {tripDays.map((day) => {
          const href = `/day/${day.id}`;
          const isActive = activeDayId
            ? day.id === activeDayId
            : pathname === href;

          return (
            <Link
              key={day.id}
              href={href}
              className={`flex shrink-0 snap-start flex-col items-center rounded-xl px-4 py-2 text-sm transition ${
                isActive
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              <span className="font-semibold">יום {day.id}</span>
              <span className="text-xs opacity-80">{day.dayOfWeek}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
