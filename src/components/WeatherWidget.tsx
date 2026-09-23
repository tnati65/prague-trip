import type { WeatherForecast } from "@/data/tripData";

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
      <path d="M7 16a4 4 0 0 1 .5-7.97A5.5 5.5 0 0 1 18 10.5 3.5 3.5 0 0 1 17.5 17H7Z" />
      <path d="M9 19v1M13 19v1M17 19v1" />
    </svg>
  );
}

export default function WeatherWidget({
  forecasts,
}: {
  forecasts: WeatherForecast[];
}) {
  if (forecasts.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        אין עדיין תחזית זמינה ליום זה.
      </p>
    );
  }

  return (
    <div
      dir="rtl"
      className="flex flex-col gap-3 rounded-2xl border border-zinc-100 bg-white p-4 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex items-center gap-2">
        <CloudRainIcon className="h-5 w-5 text-sky-500" />
        <h3 className="text-sm font-semibold">תחזית מזג אוויר</h3>
      </div>

      <p className="text-xs leading-snug text-zinc-400 dark:text-zinc-500">
        אקלים עונתי ממוצע לאוקטובר — לא תחזית מאומתת. יש לבדוק תחזית מדויקת
        סמוך למועד הטיול.
      </p>

      <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium text-zinc-400 dark:text-zinc-500">
        <span>יום</span>
        <span>תאריך</span>
        <span>מקס׳ / מינ׳</span>
        <span>סיכוי גשם</span>
      </div>

      {forecasts.map((forecast, i) => (
        <div
          key={i}
          className="grid grid-cols-4 items-center gap-2 rounded-xl bg-zinc-50 py-2 text-center text-sm dark:bg-zinc-800/60"
        >
          <span className="font-semibold">{forecast.day}</span>
          <span dir="ltr">{forecast.date}</span>
          <span dir="ltr">
            {forecast.highC}°/{forecast.lowC}°
          </span>
          <span className="inline-flex items-center justify-center gap-1 text-sky-600 dark:text-sky-400">
            💧<span dir="ltr">{forecast.rainChancePercent}%</span>
          </span>
        </div>
      ))}

      {forecasts.length > 0 && (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          אזור: {forecasts.map((f) => f.area).join(" · ")}
        </p>
      )}
    </div>
  );
}
