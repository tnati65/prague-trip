import type { TravelSegment } from "@/data/prague-trip";
import PriceTag from "@/components/PriceTag";

export default function TravelInfo({
  segments,
}: {
  segments: TravelSegment[];
}) {
  if (segments.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        טרם הוזנו פרטי נסיעה ליום זה.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {segments.map((seg, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium">
              {seg.from} ← {seg.to}
            </span>
            {seg.price && <PriceTag price={seg.price} />}
          </div>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {seg.mode}
            {seg.durationMinutes && (
              <>
                {" · "}
                {seg.durationMinutes.status === "known"
                  ? `${seg.durationMinutes.value} דקות`
                  : "משך זמן לא ידוע"}
              </>
            )}
          </span>
          {seg.mapsUrl && (
            <a
              href={seg.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              פתח במפות
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
