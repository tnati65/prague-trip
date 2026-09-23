"use client";

import { useEffect, useState } from "react";

type ChecklistItem = { id: string; label: string };
type ChecklistGroup = { id: string; title: string; items: ChecklistItem[] };

const GROUPS: ChecklistGroup[] = [
  {
    id: "documents",
    title: "מסמכים",
    items: [
      { id: "passports", label: "דרכונים בתוקף לכל המשפחה" },
      { id: "insurance", label: "ביטוח רפואי בינלאומי" },
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
    title: "לבוש",
    items: [
      { id: "warm-clothes", label: "בגדים חמים לערב" },
      { id: "festive-light", label: "בגדים חגיגיים קלים" },
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
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-2 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleItem(item.id)}
                          className="h-4 w-4 shrink-0 rounded border-zinc-300 text-rose-900 focus:ring-rose-900 dark:border-zinc-600"
                        />
                        <span
                          className={
                            isChecked
                              ? "text-zinc-400 line-through dark:text-zinc-500"
                              : ""
                          }
                        >
                          {item.label}
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
