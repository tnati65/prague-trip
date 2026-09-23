import type { Activity } from "@/data/tripData";
import ActivityIcon, {
  ACTIVITY_ICON_LABELS,
} from "@/components/ActivityIcon";

function TagIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
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
      <path d="M12 2 20 10l-9 9-8-8V2h9Z" />
      <circle cx="7.5" cy="6.5" r="1.1" />
    </svg>
  );
}

function HeartIcon({ className = "h-4 w-4" }: { className?: string }) {
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
      <path d="M12 20s-7-4.4-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5c-2.5 4.6-9.5 9-9.5 9Z" />
    </svg>
  );
}

function ParkingIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
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
      <rect x="4" y="3" width="16" height="18" rx="3" />
      <path d="M9.5 16V7.5H12a2.75 2.75 0 0 1 0 5.5H9.5" />
    </svg>
  );
}

function WazeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#05C8F6" />
      <path d="M12 6.5 16.5 17l-4.5-2.6L7.5 17 12 6.5Z" fill="white" />
    </svg>
  );
}

function formatCost(cost: NonNullable<Activity["cost"]>): string {
  return `€${cost.amount}`;
}

export default function Timeline({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        טרם הוזן ציר זמן ליום זה.
      </p>
    );
  }

  return (
    <ol dir="rtl" className="flex flex-col">
      {activities.map((activity, index) => {
        const isLast = index === activities.length - 1;

        return (
          <li key={`${activity.time}-${index}`} className="flex gap-3">
            {/* עמודת השעה, עם קו אנכי עדין שממשיך כלפי מטה */}
            <div className="flex w-16 shrink-0 flex-col items-center">
              <span
                dir="ltr"
                className="whitespace-nowrap rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {activity.time}
              </span>
              {!isLast && (
                <span
                  aria-hidden="true"
                  className="mt-1 w-px flex-1 bg-zinc-200 dark:bg-zinc-800"
                />
              )}
            </div>

            {/* פרטי הפעילות */}
            <div className={`flex flex-1 flex-col gap-2 ${isLast ? "" : "pb-6"}`}>
              <div className="flex items-center gap-2">
                <span
                  title={ACTIVITY_ICON_LABELS[activity.iconType]}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  <ActivityIcon type={activity.iconType} className="h-4 w-4" />
                </span>
                <h3 className="font-semibold leading-snug">{activity.title}</h3>
                {activity.wazeUrl && (
                  <a
                    href={activity.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="ניווט ב-Waze"
                    className="ml-2 inline-flex items-center justify-center rounded-lg p-1 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <WazeIcon className="h-4 w-4" />
                  </a>
                )}
              </div>

              <p className="text-sm leading-snug text-zinc-600 dark:text-zinc-400">
                {activity.description}
              </p>

              {activity.childFriendlyNote && (
                <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-sm leading-snug text-emerald-800 dark:bg-emerald-900/25 dark:text-emerald-200">
                  <HeartIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{activity.childFriendlyNote}</p>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  <ParkingIcon />
                  {activity.parkingAndCost}
                </span>

                {activity.cost && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                    <TagIcon />
                    <span dir="ltr">{formatCost(activity.cost)}</span>
                  </span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
