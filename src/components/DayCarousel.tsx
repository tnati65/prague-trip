"use client";

import { tripItinerary } from "@/data/tripData";
import type { DayItinerary, IconType } from "@/data/tripData";
import ActivityIcon from "@/components/ActivityIcon";

// לוגיסטיקה (רכב/מלון) לא מייצגת את "האטרקציה" המרכזית של היום.
const LOGISTIC_ICONS: ReadonlySet<IconType> = new Set(["car", "hotel"]);

function getDayIconType(day: DayItinerary): IconType {
  if (day.activities.some((activity) => activity.iconType === "flight")) {
    return "flight";
  }

  const counts = new Map<IconType, number>();
  for (const activity of day.activities) {
    if (LOGISTIC_ICONS.has(activity.iconType)) continue;
    counts.set(activity.iconType, (counts.get(activity.iconType) ?? 0) + 1);
  }

  let bestIcon: IconType | undefined;
  let bestCount = 0;
  for (const [icon, count] of counts) {
    if (count > bestCount) {
      bestIcon = icon;
      bestCount = count;
    }
  }

  return bestIcon ?? day.activities[0]?.iconType ?? "attraction";
}

// צבע ייעודי וחי לכל סוג אייקון, כדי שהאייקון יבלוט על רקע הכרטיס הלבן.
const ICON_COLORS: Record<IconType, string> = {
  flight: "text-sky-500",
  car: "text-slate-500",
  hotel: "text-indigo-500",
  attraction: "text-violet-500",
  restaurant: "text-orange-500",
  shopping: "text-pink-500",
  park: "text-emerald-500",
};

export default function DayCarousel({
  activeDayId,
  onDaySelect,
}: {
  activeDayId: number;
  onDaySelect: (dayId: number) => void;
}) {
  return (
    <nav
      dir="rtl"
      aria-label="ימי הטיול"
      className="mx-auto flex w-full max-w-2xl justify-center px-4 pt-2 pb-4 lg:max-w-4xl lg:px-8"
    >
      <div
        role="tablist"
        aria-label="ימי הטיול"
        className="flex w-full flex-row items-center justify-between gap-2 sm:justify-center sm:gap-4"
      >
        {tripItinerary.map((day) => {
          const isActive = day.id === activeDayId;
          const iconType = getDayIconType(day);

          return (
            <button
              key={day.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onDaySelect(day.id)}
              className={`flex max-w-[120px] flex-1 flex-col items-center justify-between gap-2 rounded-2xl border px-2 py-3 text-center transition-colors duration-200 ${
                isActive
                  ? "border-transparent bg-rose-950 shadow-md shadow-rose-950/30"
                  : "border-zinc-100 bg-white shadow-sm hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              }`}
            >
              <span
                className={`text-[11px] font-normal ${
                  isActive
                    ? "text-white/80"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {day.dayOfWeek}
              </span>

              <ActivityIcon
                type={iconType}
                className={`h-6 w-6 ${isActive ? "text-white" : ICON_COLORS[iconType]}`}
              />

              <span
                dir="ltr"
                className={`text-base font-medium leading-none ${
                  isActive ? "text-white" : "text-zinc-700 dark:text-zinc-200"
                }`}
              >
                {day.dateString}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
