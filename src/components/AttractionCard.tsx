import type { Attraction, VisitDuration } from "@/data/prague-trip";
import PriceTag from "@/components/PriceTag";
import AttractionImageGallery, {
  ImageWithCredit,
} from "@/components/AttractionImageGallery";

function formatFixedDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) return `${rest} דקות`;
  if (rest === 0) return hours === 1 ? "שעה" : `${hours} שעות`;
  return hours === 1 ? `שעה ו-${rest} דקות` : `${hours} שעות ו-${rest} דקות`;
}

function VisitDurationText({ duration }: { duration: VisitDuration }) {
  if (duration.type === "fixed") {
    return <>{formatFixedDuration(duration.minutes)}</>;
  }

  return (
    <>
      <span dir="ltr">
        {duration.min}–{duration.max}
      </span>{" "}
      דקות
    </>
  );
}

export default function AttractionCard({
  attraction,
}: {
  attraction: Attraction;
}) {
  const images = attraction.images;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      {images && images.length === 1 && (
        <ImageWithCredit
          image={images[0]}
          wikipediaUrl={attraction.wikipediaUrl}
        />
      )}

      {images && images.length > 1 && (
        <AttractionImageGallery
          images={images}
          wikipediaUrl={attraction.wikipediaUrl}
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{attraction.name}</h3>
            {attraction.optional && (
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                אופציונלי
              </span>
            )}
          </div>
          {attraction.nameOriginal && (
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {attraction.nameOriginal}
            </span>
          )}
        </div>
        {attraction.price && <PriceTag price={attraction.price} />}
      </div>

      {(attraction.arrivalTime || attraction.visitDuration) && (
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          {attraction.arrivalTime && <span>הגעה: {attraction.arrivalTime}</span>}
          {attraction.visitDuration && (
            <span>
              משך ביקור: <VisitDurationText duration={attraction.visitDuration} />
            </span>
          )}
        </div>
      )}

      {attraction.description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {attraction.description}
        </p>
      )}

      {attraction.highlights && (
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
            מה רואים ועושים
          </span>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {attraction.highlights}
          </p>
        </div>
      )}

      {attraction.tip && (
        <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
          {attraction.tip}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 text-sm">
        {attraction.location?.mapsUrl && (
          <a
            href={attraction.location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
          >
            פתח במפות
          </a>
        )}
        {attraction.openingHours && (
          <span className="text-zinc-500 dark:text-zinc-400">
            שעות פתיחה:{" "}
            {attraction.openingHours.status === "known"
              ? attraction.openingHours.value
              : "טרם ידוע"}
          </span>
        )}
      </div>

      {attraction.travelToNext && (
        <div className="flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-2 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          <span>
            מעבר לתחנה הבאה: {attraction.travelToNext.mode}
            {attraction.travelToNext.durationMinutes && (
              <>
                {" · "}
                {attraction.travelToNext.durationMinutes.status === "known"
                  ? `${attraction.travelToNext.durationMinutes.value} דקות`
                  : "משך זמן לא ידוע"}
              </>
            )}
          </span>
          {attraction.travelToNext.mapsUrl && (
            <a
              href={attraction.travelToNext.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              פתח במפות
            </a>
          )}
        </div>
      )}
    </div>
  );
}
