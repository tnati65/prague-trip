"use client";

import { useEffect, useState } from "react";

type ChecklistItem = { id: string; label: string; subtitle?: string };
type ChecklistGroup = { id: string; title: string; items: ChecklistItem[] };

const GROUPS: ChecklistGroup[] = [
  {
    id: "documents",
    title: "מסמכים",
    items: [
      {
        id: "passports",
        label: "דרכונים בתוקף לכל בני המשפחה",
        subtitle: "לוודא תוקף של לפחות 6 חודשים מיום החזרה",
      },
      { id: "travel-insurance", label: "ביטוח נסיעות כולל כיסוי לילדים" },
      {
        id: "international-license",
        label: "רישיון נהיגה בינלאומי",
        subtitle: "לנהגים בלבד – נדרש בצ'כיה לצד הרישיון הישראלי",
      },
      { id: "flight-confirmations", label: "אישורי טיסה שמורים בטלפון" },
      { id: "hotel-booking-doc", label: "אישור הזמנה – Hotel DUO Prague" },
      { id: "car-rental-doc", label: "אישור הזמנת רכב שכור" },
    ],
  },
  {
    id: "tickets",
    title: "כרטיסים",
    items: [
      { id: "flight-tickets", label: "כרטיסי טיסה (הלוך ושוב)" },
      { id: "car-rental", label: "אישור השכרת רכב" },
      { id: "hotel-booking", label: "אישור הזמנת Hotel DUO Prague" },
    ],
  },
  {
    id: "gear",
    title: "ציוד אישי",
    items: [
      { id: "chargers", label: "מטענים ומצברים ניידים" },
      { id: "medicine", label: "תרופות ותיק עזרה ראשונה" },
    ],
  },
  {
    id: "clothing",
    title: "ביגוד אישי",
    items: [
      {
        id: "underwear-socks",
        label: "הלבשה תחתונה וגרביים",
        subtitle: "ל-10 ימים – או פחות אם עושים כביסה באמצע הטיול",
      },
      {
        id: "shirts-tshirts",
        label: "חולצות קצרות וארוכות",
        subtitle:
          "בספטמבר–אוקטובר הטמפרטורות נעות בין 5° ל-17° — בבוקר ובערב מומלץ להתלבש בשכבות (בצל)",
      },
      {
        id: "fleece-sweatshirt",
        label: "סווטשירט או פליז – שניים לפחות",
        subtitle: "שכבת האמצע החשובה ביותר",
      },
      {
        id: "warm-coat",
        label: "מעיל חם",
        subtitle: "למקומות הגבוהים והטבע – מעל 1,000 מ' קר ויורד גם גשם",
      },
      {
        id: "rain-jacket",
        label: "מעיל גשם או פונצ'ו",
        subtitle: "קל משקל, שיהיה לכל אחד בתיק",
      },
      { id: "long-pants", label: "מכנסיים ארוכים" },
      {
        id: "sweatpants-pajamas",
        label: "טרנינגים ופיג'מות",
        subtitle: "ללילות הקרים (החימום בדירה/מלון)",
      },
      { id: "swimwear", label: "בגדי ים" },
      {
        id: "spare-outfit",
        label: "בגדים לכל אחד",
        subtitle:
          "חולצות וגרביים בתיק, למקרה של התלכלכות באמצע הטיול",
      },
      { id: "warm-hat-scarf-gloves", label: "כובע חם, צעיף וכפפות" },
      {
        id: "thin-gloves-buff",
        label: "כפפות דקות, צעיף או באנדנה",
        subtitle: "בעיקר למקומות הגבוהים",
      },
      { id: "walking-shoes", label: "נעלי הליכה נוחות וטובות" },
      {
        id: "sandals-slippers",
        label: "כפכפים",
        subtitle: "למלון, למקלחת ולבריכה",
      },
      {
        id: "festive-light",
        label: "בגדים חגיגיים קלים",
        subtitle: "לערב חגיגי או למסעדות מיוחדות",
      },
      { id: "laundry-bag", label: "שקית לכביסה מלוכלכת" },
    ],
  },
  {
    id: "toiletries",
    title: "תמרוקים והיגיינה",
    items: [
      { id: "toothbrush-toothpaste", label: "מברשות שיניים ומשחה" },
      { id: "shampoo-conditioner-soap", label: "שמפו, מרכך וסבון גוף" },
      { id: "deodorant", label: "דאודורנט" },
      {
        id: "sunscreen",
        label: "קרם הגנה",
        subtitle: "הקרינה בגובה חזקה יותר משנדמה, גם ביום מעונן",
      },
      {
        id: "lip-balm",
        label: "שפתון לחות",
        subtitle: "האוויר ההררי מייבש",
      },
      { id: "hairbrush-hair-ties", label: "מברשת שיער וגומיות" },
      { id: "shaving-kit", label: "ציוד גילוח" },
      { id: "feminine-hygiene", label: "היגיינה נשית" },
      {
        id: "wet-wipes-hand-sanitizer",
        label: "מגבונים לחים וג'ל אלכוהול",
      },
      {
        id: "quick-dry-towel",
        label: "מגבת מהירת ייבוש",
        subtitle: "למרחצאות ולאגמים",
      },
      {
        id: "personal-medications",
        label: "תרופות אישיות ומרשמים",
        subtitle: "בכמות מספקת לכל הטיול",
      },
      {
        id: "first-aid-kit",
        label: "ערכת עזרה ראשונה ופלסטרים",
        subtitle: "גם לשלפוחיות מהליכה",
      },
      {
        id: "kids-medications",
        label: "תרופות ילדים",
        subtitle:
          "מורידי חום ותרופה נגד בחילה – הכבישים ההרריים מפותלים",
      },
    ],
  },
];

const STORAGE_KEY = "prague-trip-checklist";

function ChevronIcon({
  open,
  className = "h-4 w-4",
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Checklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set([GROUPS[0].id])
  );

  // "נשאר מסומן לאורך הסשן" — נשמר ב-sessionStorage, נמחק כשהטאב נסגר.
  // הקריאה חייבת לקרות אחרי ה-mount (לא ב-lazy initializer), כי sessionStorage
  // לא קיים בזמן ה-render בצד השרת ותקריאה משם תגרום לאי-התאמה בין שרת ללקוח.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- הידרציה חד-פעמית ממקור חיצוני בצד הלקוח בלבד
      if (saved) setChecked(new Set(JSON.parse(saved) as string[]));
    } catch {
      // אחסון לא זמין (למשל גלישה פרטית) — ממשיכים בלי שמירה
    }
  }, []);

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // אחסון לא זמין — ממשיכים בלי שמירה
      }
      return next;
    });
  };

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalItems = GROUPS.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div dir="rtl" className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">צ&apos;קליסט לפני הטיסה</h3>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {checked.size}/{totalItems} הושלמו
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {GROUPS.map((group) => {
          const isOpen = openGroups.has(group.id);
          const doneInGroup = group.items.filter((item) =>
            checked.has(item.id)
          ).length;

          return (
            <div
              key={group.id}
              className="overflow-hidden rounded-2xl border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            >
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold"
              >
                <span className="flex items-center gap-2">
                  {group.title}
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {doneInGroup}/{group.items.length}
                  </span>
                </span>
                <ChevronIcon open={isOpen} />
              </button>

              {isOpen && (
                <div className="flex flex-col gap-1 border-t border-zinc-100 px-4 py-2 dark:border-zinc-800">
                  {group.items.map((item) => {
                    const isChecked = checked.has(item.id);
                    return (
                      <label
                        key={item.id}
                        className="flex cursor-pointer items-start gap-3 rounded-lg px-1 py-2 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(item.id)}
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-rose-900 focus:ring-rose-900 dark:border-zinc-600"
                        />
                        <span className="flex flex-col">
                          <span
                            className={
                              isChecked
                                ? "text-zinc-400 line-through dark:text-zinc-500"
                                : ""
                            }
                          >
                            {item.label}
                          </span>
                          {item.subtitle && (
                            <span className="text-xs text-zinc-400 dark:text-zinc-500">
                              {item.subtitle}
                            </span>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
