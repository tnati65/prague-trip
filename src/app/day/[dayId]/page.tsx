import { notFound } from "next/navigation";
import { tripDays, getTripDay } from "@/data/prague-trip";
import { tripItinerary } from "@/data/tripData";
import DayNav from "@/components/DayNav";
import DayHeader from "@/components/DayHeader";
import Timeline from "@/components/Timeline";
import InfoCards from "@/components/InfoCards";
import AttractionCard from "@/components/AttractionCard";
import TravelInfo from "@/components/TravelInfo";
import MealsSection from "@/components/MealsSection";
import WeatherCard from "@/components/WeatherCard";
import ClothingTips from "@/components/ClothingTips";
import FreeTimeSection from "@/components/FreeTimeSection";
import RainPlanB from "@/components/RainPlanB";

export function generateStaticParams() {
  return tripDays.map((day) => ({ dayId: String(day.id) }));
}

export default async function DayPage({
  params,
}: PageProps<"/day/[dayId]">) {
  const { dayId } = await params;
  const day = getTripDay(Number(dayId));

  if (!day) {
    notFound();
  }

  const tripDataDay = tripItinerary.find((d) => d.id === day.id);

  return (
    <div className="flex flex-1 flex-col">
      <DayNav activeDayId={day.id} />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-6 lg:max-w-4xl lg:px-8">
        <DayHeader day={day} />

        {day.shortPlan && (
          <section className="flex flex-col gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
            <h2 className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              מסלול מקוצר: {day.shortPlan.title}
            </h2>
            <p className="text-sm text-amber-800/90 dark:text-amber-200/90">
              {day.shortPlan.description}
            </p>
          </section>
        )}

        <WeatherCard weather={day.weather} />

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">ציר זמן</h2>
          <Timeline activities={tripDataDay?.activities ?? []} />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">אטרקציות</h2>
          {day.attractions.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              טרם נקבעו אטרקציות ליום זה.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {day.attractions.map((a, i) => (
                <AttractionCard key={i} attraction={a} />
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">נסיעות</h2>
          <TravelInfo segments={day.travelSegments} />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">אוכל</h2>
          <MealsSection meals={day.meals} />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">לבוש מומלץ</h2>
          <ClothingTips tips={day.clothingTips} />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">זמן חופשי / קניות</h2>
          <FreeTimeSection blocks={day.freeTime} />
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">תוכנית B לגשם</h2>
          <RainPlanB plan={day.rainPlanB} />
        </section>

        {tripDataDay && (
          <section className="flex flex-col gap-3 pb-20">
            <h2 className="text-lg font-semibold">מידע שימושי ליום</h2>
            <InfoCards cards={tripDataDay.infoCards} />
          </section>
        )}
      </div>
    </div>
  );
}
