import type { WeatherInfo } from "@/data/prague-trip";

export default function WeatherCard({ weather }: { weather: WeatherInfo }) {
  if (weather.status === "placeholder") {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        מזג האוויר יתעדכן בהמשך, סמוך למועד הטיול (אין עדיין תחזית או מידע
        אקלימי מאומת).
      </div>
    );
  }

  const { avgHighC, avgLowC, rainNote } = weather.value;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="font-medium">
        {avgLowC}°–{avgHighC}°C
      </p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{rainNote}</p>
    </div>
  );
}
