import Image from "next/image";
import type { DayImage } from "@/data/tripData";

export default function DayGallery({ images }: { images: DayImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className="my-4 grid w-full grid-cols-2 gap-4">
      {images.map((image, i) => (
        <div
          key={i}
          className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-100 shadow-xs dark:border-zinc-800"
        >
          <Image
            src={image.url}
            alt={image.caption}
            fill
            sizes="(min-width: 1024px) 380px, 45vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p
              dir="rtl"
              className="w-full text-right text-sm font-medium tracking-wide text-white"
            >
              {image.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
