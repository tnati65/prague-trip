import type { ReactNode } from "react";
import type { IconType } from "@/data/tripData";

// אוסף אייקוני SVG מינימליים, בלי תלות בספרייה חיצונית — עקבי עם "ללא שירותים בתשלום".

const ICON_PATHS: Record<IconType, ReactNode> = {
  flight: (
    <>
      <path d="M21 3 3 10.5l7 2.5 2 7L21 3Z" />
      <path d="M12 13.5 21 3" />
    </>
  ),
  car: (
    <>
      <rect x="4" y="10" width="16" height="6" rx="2" />
      <path d="M6 10l2-4h8l2 4" />
      <circle cx="8" cy="17.5" r="1.5" />
      <circle cx="16" cy="17.5" r="1.5" />
    </>
  ),
  hotel: (
    <>
      <path d="M3 19V9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3" />
      <path d="M3 12h17a1 1 0 0 1 1 1v6" />
      <path d="M3 19h18" />
      <circle cx="6.5" cy="9.5" r="1.25" />
    </>
  ),
  attraction: (
    <>
      <path d="M3 21h18" />
      <path d="M4 21V10M8 21V10M12 21V10M16 21V10M20 21V10" />
      <path d="M2 10 12 4l10 6" />
    </>
  ),
  restaurant: (
    <>
      <path d="M7 2v7a2 2 0 1 1-4 0V2" />
      <path d="M5 9v13" />
      <path d="M17 2v6c0 1.5-1 3-2.5 3" />
      <path d="M17 2v19" />
    </>
  ),
  shopping: (
    <>
      <path d="M6 8h12l1 13H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  park: <path d="M12 3 7 11h3l-4 6h4v4h4v-4h4l-4-6h3L12 3Z" />,
};

export const ACTIVITY_ICON_LABELS: Record<IconType, string> = {
  flight: "טיסה",
  car: "נסיעה ברכב",
  hotel: "מלון",
  attraction: "אטרקציה",
  restaurant: "מסעדה",
  shopping: "קניות",
  park: "פארק",
};

export default function ActivityIcon({
  type,
  className = "h-5 w-5",
}: {
  type: IconType;
  className?: string;
}) {
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
      {ICON_PATHS[type]}
    </svg>
  );
}
