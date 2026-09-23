import type { Fact, RainPlanB as RainPlanBInfo } from "@/data/prague-trip";
import AttractionCard from "@/components/AttractionCard";

export default function RainPlanB({ plan }: { plan: Fact<RainPlanBInfo> }) {
  if (plan.status === "placeholder") {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        טרם נקבעה תוכנית חלופית לגשם ליום זה.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {plan.value.description}
      </p>
      {plan.value.alternativeAttractions?.map((a, i) => (
        <AttractionCard key={i} attraction={a} />
      ))}
    </div>
  );
}
