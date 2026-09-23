import type { FreeTimeBlock } from "@/data/prague-trip";

export default function FreeTimeSection({
  blocks,
}: {
  blocks: FreeTimeBlock[];
}) {
  if (blocks.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        אין זמן חופשי/קניות מתוכנן ליום זה.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, i) => (
        <div
          key={i}
          className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="font-medium">{block.title}</p>
          {block.description && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {block.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
