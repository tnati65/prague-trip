"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { tripItinerary, tripConfig } from "@/data/tripData";
import DayCarousel from "@/components/DayCarousel";
import DayGallery from "@/components/DayGallery";
import Timeline from "@/components/Timeline";
import InfoCards from "@/components/InfoCards";
import BottomNav, { type TabId } from "@/components/BottomNav";
import Checklist from "@/components/Checklist";
import Trivia from "@/components/Trivia";
import WeatherWidget from "@/components/WeatherWidget";

// טוען את Leaflet רק בצד הלקוח — הספרייה נשענת על window/document ולא ניתנת ל-SSR.
const TripMap = dynamic(() => import("@/components/TripMap"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full animate-pulse rounded-2xl border border-zinc-100 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900" />
  ),
});

function formatBudget(cost: { amount: number }): string {
  return `€${cost.amount.toLocaleString("he-IL")}`;
}

function getCountdownLabel(startDateIso: string): string {
  const start = new Date(`${startDateIso}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round(
    (start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return "הטיול כבר בעיצומו!";
  if (diffDays === 0) return "טסים היום!";
  if (diffDays === 1) return "מחר טסים!";
  return `עוד ${diffDays} ימים לטיסה`;
}

const TAB_TITLES: Record<TabId, string> = {
  checklist: "צ'קליסט לפני הטיסה",
  weather: "תחזית מזג אוויר",
  info: "מידע שימושי ליום",
  trivia: "טריוויה משפחתית",
  search: "חיפוש",
};

export default function Home() {
  const [activeDayId, setActiveDayId] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>("checklist");
  const activeDay =
    tripItinerary.find((day) => day.id === activeDayId) ?? tripItinerary[0];

  return (
    <div dir="rtl" className="flex flex-1 flex-col">
      <header className="mx-auto w-full max-w-2xl px-4 pt-6 lg:max-w-4xl lg:px-8">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-100 bg-white p-6 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-2xl font-bold text-rose-900 dark:text-rose-300">
            תוכנית טיול לפראג
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            21-26/10/26 · 6 ימים
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-4 py-1.5 text-xs font-semibold text-amber-950 shadow-sm">
              {getCountdownLabel(tripConfig.startDate)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-white dark:text-zinc-900">
              תקציב משוער:
              <span dir="ltr">{formatBudget(tripConfig.totalBudget)}</span>
            </span>
          </div>
        </div>
      </header>

      <div className="mt-4">
        <DayCarousel activeDayId={activeDayId} onDaySelect={setActiveDayId} />
      </div>

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-6 lg:max-w-4xl lg:px-8">
        <section className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="text-lg font-semibold">{activeDay.title}</h2>
            <span
              dir="ltr"
              className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400"
            >
              {activeDay.dateString}
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {activeDay.summary}
          </p>
          <DayGallery images={activeDay.images} />
          <TripMap mapRoute={activeDay.mapRoute} />
          <Timeline activities={activeDay.activities} />
        </section>

        <section className="flex flex-col gap-3 pb-24">
          <h2 className="text-lg font-semibold">{TAB_TITLES[activeTab]}</h2>

          {activeTab === "checklist" && <Checklist />}
          {activeTab === "weather" && (
            <WeatherWidget forecasts={activeDay.weather} />
          )}
          {activeTab === "info" && <InfoCards cards={activeDay.infoCards} />}
          {activeTab === "trivia" && <Trivia />}
          {activeTab === "search" && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              חיפוש באתרי הטיול יגיע בקרוב.
            </p>
          )}
        </section>
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        whatsappUrl={tripConfig.whatsappGroupUrl}
      />
    </div>
  );
}
