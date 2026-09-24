"use client";

import { useEffect } from "react";

/**
 * חסימות בסיסיות נגד העתקה מזדמנת: תפריט קליק ימני, קיצורי מקלדת להעתקה,
 * וגרירת תמונות. זהו מחסום נוחות בלבד ולא הגנה אמיתית — קל לעקוף אותו
 * דרך View Source, DevTools, או כיבוי JavaScript בדפדפן.
 */
export default function CopyProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => e.preventDefault();

    const blockCopyShortcuts = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const isModifier = e.ctrlKey || e.metaKey;
      if (isModifier && (key === "c" || key === "a" || key === "u")) {
        e.preventDefault();
      }
    };

    const blockImageDrag = (e: DragEvent) => {
      if (e.target instanceof HTMLImageElement) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockCopyShortcuts);
    document.addEventListener("dragstart", blockImageDrag);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockCopyShortcuts);
      document.removeEventListener("dragstart", blockImageDrag);
    };
  }, []);

  return null;
}
