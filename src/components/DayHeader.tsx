import type { TripDay } from "@/data/prague-trip";

export default function DayHeader({ day }: { day: TripDay }) {
  return (
    <header className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-bold">יום {day.id}</h1>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {day.date}
        </span>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">{day.dayOfWeek}</p>
      <p className="text-sm">
        אזור מרכזי:{" "}
        {day.mainArea.status === "known" ? (
          day.mainArea.value
        ) : (
          <span className="italic text-zinc-400">טרם נקבע</span>
        )}
      </p>
    </header>
  );
}
