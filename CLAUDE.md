# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Prague Trip App

אפליקציית תכנון טיול משפחתי לפראג, 21–26.10.2026 (6 ימים), במלון Hotel DUO Prague — מימוש ראשון של רעיון רחב יותר (אתר/אפליקציה לתכנון טיולים משפחתיים לחו"ל). האפליקציה הראשית היא single-page app תחת `src/app/page.tsx`; פרוסה ל-GitHub Pages.

**Live**: https://tnati65.github.io/prague-trip/
**Repo**: https://github.com/tnati65/prague-trip.git (remote `origin`, branch `master`)

## 🔴 חוק ברזל: עברית ו-RTL

**כל קוד, אתר, אפליקציה או מסמך שנוצרים בפרויקט חייבים לתמוך באופן מלא בשפה העברית וביישור מימין לשמאל (RTL).** זהו כלל שאינו ניתן לפשרה — מבנה HTML (`dir="rtl"`, `lang="he"`), פריסת CSS/Tailwind (תכונות לוגיות ולא `left`/`right` קשיחים כשמשמעותם כיוונית), אייקונים וחצים שמשקפים כיוון RTL, טפסים, הודעות שגיאה, ותיעוד. כל תוכן/קומפוננטה חדשים — בעברית, ונבדקים ב-RTL לפני שנחשבים גמורים.

## פקודות

```bash
npm run dev      # שרת פיתוח (localhost:3000, Turbopack)
npm run build    # next build --webpack — ראה "PWA / תמיכה אופליין" למטה למה, אל תחזיר ל-Turbopack
npm run start    # הרצת ה-build
npm run lint     # ESLint (eslint-config-next: core-web-vitals + typescript)
npm run deploy   # build + gh-pages -d out --nojekyll → דוחף ל-branch gh-pages, חי תוך 1-2 דק'
```

אין כרגע suite של טסטים בפרויקט. אחרי כל שינוי: `npx tsc --noEmit`, `npx eslint <קבצים ששונו>`, ואז `npm run build` לפני deploy.

**זהירות עם `git status`**: יש עבודה משמעותית שמעולם לא הייתה ב-commit לפני תחילת הסשן הזה — תמיד תבדקו `git status`/`git log` לפני פעולות הרסניות.

## עקרונות פרויקט

- **Stack**: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- **Mobile-first**: כל מסך מעוצב קודם לטלפון, ואז מורחב למסכים גדולים.
- **RTL/עברית**: ראה "חוק ברזל" למעלה.
- **ללא Database**: כל הנתונים סטטיים בקוד, בלי שכבת נתונים חיצונית.
- **ללא שירותים בתשלום**: Leaflet + OpenStreetMap (לא Google Maps API), Unsplash (לא iStock וכו'), בלי API keys בתשלום.
- **דיוק עובדתי**: אסור להמציא מידע חסר או לתאר יכולת כאילו היא חזקה/בטוחה יותר משהיא באמת (ראו "הגנת העתקה" למטה — דוגמה למקרה שתוקן בגלל זה).

## ערכת נושא (UI Theme)

עיצוב "מגזין" פרימיום: רקע לבן/קרם נקי, כותרות בגוון בורדו/יין עמוק (`text-rose-900`, כרטיס יום פעיל ב-`bg-rose-950`), קרוסלת ימים ממורכזת ומאוזנת ברוחב מסך מלא (`DayCarousel`). כרטיסים לבנים עגולים (`rounded-2xl border shadow-xs/sm`) לכל בלוק תוכן.

**Dark mode נתמך בפועל** (`dark:` variants ב-23 קבצים, לפי `prefers-color-scheme`) — זה לא "light mode כפוי". אם רוצים לשנות את זה בפועל (לכפות light mode תמיד), זו משימת קוד נפרדת, לא רק עדכון תיעוד.

## ארכיטקטורה

**האפליקציה הראשית**: `src/app/page.tsx` — client component יחיד, "app shell" קבוע: header קפוא (`fixed top-0`, כותרת ממוסגרת + `DayCarousel`) + `<main>` גוללי יחיד (`overflow-y-auto`, `pt-[310px] md:pt-[320px] pb-[100px]`) + `BottomNav` קבוע (`fixed bottom-0`). מצב `activeTab` (`'itinerary' | 'checklist' | 'weather' | 'info' | 'trivia'`) קובע איזה תוכן יחיד מוצג בתוך ה-`<main>` — הפרדה מוחלטת, לא הצגה משולבת. מצב `activeDayId` נשלט מ-`DayCarousel` ומשפיע על תוכן טאב "מסלול", "תחזית" ו"מידע".

**מקור האמת**: `src/data/tripData.ts` — כל הטיפוסים והנתונים של האפליקציה הראשית: `tripConfig` (WhatsApp, תקציב, תאריך התחלה, `hotel: HotelInfo` — Hotel DUO Prague, Střížkov, קו C), `tripItinerary: DayItinerary[]` (6 ימים, כולל `activities[]` עם `wazeUrl?` אופציונלי לפעילויות נסיעה, `mapRoute` עם `coordinates` למפה, `images[]` לגלריה, `infoCards`), ו-`weatherMatrix` (4 אזורים × 6 תאריכים, נפרד לגמרי מהימים עצמם). שדה `hotel` מוזרם דרך template literals לפעילויות יום 1/6 כדי שלא יופיע שם שונה בכל מקום.

**רכיבי הליבה** (`src/components`): `DayCarousel` (עצמאי — מייבא `tripItinerary` ישירות, לא מקבל props של נתונים; `getDayIconType` קובע אייקון takeoff/landing קשיח לימים 1/6), `Timeline` (מציג פעילויות + כפתור Waze כש-`wazeUrl` קיים), `DayGallery` (תמונות עם כיתוב בהעברה, `group-hover`), `TripMap` (Leaflet — **חייב** להיטען דרך `next/dynamic(..., {ssr:false})`, כי Leaflet נוגע ב-`window` בזמן import וקורס ב-SSR בלעדיו), `InfoCards`, `Checklist` (8 קבוצות; מצב מסומן נשמר ב-**`sessionStorage`** — לא `localStorage`, בכוונה, כדי למנוע hydration mismatch: הקריאה קורית ב-`useEffect` אחרי mount, לא ב-lazy initializer), `Trivia` (5 שאלות טריוויה על פראג), `WeatherWidget` (מטריצת השוואה — טבלה גוללת עם עמודת מיקום דביקה, לא תחזית ליום בודד), `BottomNav` (5 טאבים + כפתור WhatsApp מוטמע), `ActivityIcon` (סט אייקונים משותף, כולל `takeoff`/`landing` כטיפוסים ייעודיים לא רק ל-flight), `CopyProtection` (ראו למטה).

**מודל ישן/משני**: `src/data/prague-trip.ts` + `src/app/day/[dayId]/page.tsx` + קומפוננטות נלוות (`AttractionCard`, `DayHeader`, `DayNav`, `WeatherCard`, `PriceTag`, `TravelInfo`, `MealsSection`, `ClothingTips`, `FreeTimeSection`, `RainPlanB`, `AttractionImageGallery`) — עדיין קיימים ונבנים, אבל הדף הראשי כבר לא מקשר אליהם. `WhatsAppButton.tsx` ו-`TripInfoCard.tsx` נמחקו כשהפכו ללא בשימוש.

## הגנת העתקה (לא אבטחה אמיתית!)

`CopyProtection.tsx` (רכיב client, מוטמע ב-`layout.tsx`) חוסם `contextmenu`, `Ctrl/Cmd+C/A/U`, וגרירת תמונות; `globals.css` מגדיר `user-select: none` על ה-`body`. **זהו מחסום נוחות בלבד, לא הגנה אמיתית** — עוקפים בקלות דרך View Source / DevTools / כיבוי JS, כי זה אתר סטטי ללא אימות שכל התוכן שלו כבר ניתן להורדה במלואו. תועד ככה בכוונה גם בקוד וגם כאן — אם משנים את הרכיב, לשמור על התיעוד הזה, לא לתאר אותו כ"אבטחה" או "הגנת זכויות יוצרים" אמיתית.

## PWA / תמיכה אופליין

`@ducanh2912/next-pwa` (דרך `withPWA` ב-`next.config.ts`) מייצר service worker אמיתי עם precache + `runtimeCaching` (מיובא מהחבילה עצמה, כולל כלל `NetworkFirst` לדפי HTML — בלי זה רק JS/CSS נשמרים במטמון וטעינה קרה במצב אופליין נכשלת עוד לפני שהקוד השמור רץ). המשפחה צריכה לפתוח את האתר פעם אחת מחוברים כדי שהדף עצמו יישמר במטמון.

**קריטי — `--webpack` חובה**: החבילה תלויה ב-webpack config hook; Turbopack (ברירת המחדל ב-Next 16) לא מריץ אותו והבנייה **נכשלת** (לא רק "מתעלמת בשקט"). `package.json`'s `"build": "next build --webpack"` — **אל תחזירו ל-`next build` רגיל**. `dev` נשאר על Turbopack (ה-PWA מנוטרל בפיתוח ממילא).

**basePath לא מתווסף אוטומטית** ל-`metadata.manifest`/`metadata.icons` ב-Next.js (בניגוד ל-`<Image>`/`<Link>`) — נבדק אמפירית. `src/lib/basePath.ts` מייצא `BASE_PATH` שמשמש גם ב-`next.config.ts` (relative import, לא `@/`) וגם ב-`layout.tsx` לבניית נתיבים מלאים ידנית.

קבצי ה-service worker (`public/sw.js`, `public/workbox-*.js`, `public/swe-worker-*.js`) **נוצרים מחדש בכל build ולא נשמרים ב-git** (ב-`.gitignore`) — לא לערוך ידנית. אייקוני ה-manifest (`public/icons/*.png`) נוצרו פעם אחת מ-`scripts/icon-source.svg` דרך `scripts/generate-icons.mjs` (כלי חד-פעמי, לא תלות של הפרויקט).

## פריסה (GitHub Pages)

`next.config.ts`: `output: "export"`, `basePath: "/" + BASE_PATH` (="prague-trip", תואם לשם ה-repo). `images.unoptimized: true` (אין שרת ל-Image Optimization ב-static export) + `remotePatterns` ל-`images.unsplash.com`.

`npm run deploy` מריץ build ואז `gh-pages -d out --nojekyll`. **הדגל `--nojekyll` חובה** — בלעדיו GitHub Pages מתעלם מתיקיית `_next/` (Jekyll), וגם חבילת `gh-pages` בעצמה מסננת dotfiles כברירת מחדל כך ש-`.nojekyll` לא היה מגיע לענף בלעדיו.

אחרי `deploy`, ל-GitHub Pages/CDN לוקח כ-1-2 דקות לעדכן בפועל — לאמת עם hash של chunk ידוע (לא לסמוך על תגובת curl מיידית).
