import type { DayInfoCards } from "@/data/tripData";

type CardConfig = {
  key: keyof DayInfoCards;
  emoji: string;
  label: string;
  className: string;
  badgeClassName: string;
};

const CARDS: CardConfig[] = [
  {
    key: "parkingAndEntry",
    emoji: "🅿️",
    label: "חניה וכניסה",
    className:
      "bg-rose-50 text-rose-900 dark:bg-rose-900/20 dark:text-rose-100",
    badgeClassName: "bg-rose-100 dark:bg-rose-900/40",
  },
  {
    key: "whereToEat",
    emoji: "🍽️",
    label: "מקומות לאכול",
    className:
      "bg-indigo-50 text-indigo-900 dark:bg-indigo-900/20 dark:text-indigo-100",
    badgeClassName: "bg-indigo-100 dark:bg-indigo-900/40",
  },
  {
    key: "whereToShop",
    emoji: "🛒",
    label: "איפה עושים קניות",
    className:
      "bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-100",
    badgeClassName: "bg-amber-100 dark:bg-amber-900/40",
  },
  {
    key: "familyStrategy",
    emoji: "💡",
    label: "למה זה עובד / אסטרטגיה משפחתית",
    className:
      "bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100",
    badgeClassName: "bg-emerald-100 dark:bg-emerald-900/40",
  },
];

export default function InfoCards({ cards }: { cards: DayInfoCards }) {
  return (
    <div dir="rtl" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {CARDS.map((card) => (
        <div
          key={card.key}
          className={`flex flex-col gap-2 rounded-2xl p-4 ${card.className}`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base ${card.badgeClassName}`}
              aria-hidden="true"
            >
              {card.emoji}
            </span>
            <h3 className="text-sm font-semibold">{card.label}</h3>
          </div>
          <p className="text-sm leading-snug opacity-90">{cards[card.key]}</p>
        </div>
      ))}
    </div>
  );
}
