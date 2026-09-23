export default function ClothingTips({ tips }: { tips: string[] }) {
  if (tips.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        טרם הוזנו המלצות לבוש ליום זה.
      </p>
    );
  }

  return (
    <ul className="flex list-disc flex-col gap-1 ps-5 text-sm">
      {tips.map((tip, i) => (
        <li key={i}>{tip}</li>
      ))}
    </ul>
  );
}
