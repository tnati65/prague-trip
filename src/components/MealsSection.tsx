import type { Meal } from "@/data/prague-trip";
import PriceTag from "@/components/PriceTag";

export default function MealsSection({ meals }: { meals: Meal[] }) {
  if (meals.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        טרם הוזנו הצעות אוכל ליום זה.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {meals.map((meal, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">{meal.type}</span>
            {meal.price && <PriceTag price={meal.price} />}
          </div>
          {meal.suggestion && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {meal.suggestion}
            </p>
          )}
          {meal.location?.mapsUrl && (
            <a
              href={meal.location.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              {meal.location.name}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
