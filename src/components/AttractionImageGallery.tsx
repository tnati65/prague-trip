"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { AttractionImage } from "@/data/prague-trip";

export function ImageCredit({ image }: { image: AttractionImage }) {
  if (!image.credit && !image.license) {
    return null;
  }

  const parts: string[] = [];
  if (image.credit) parts.push(`צילום: ${image.credit}`);
  if (image.license) parts.push(image.license);
  const label = parts.join(" · ");

  if (image.sourceUrl) {
    return (
      <a
        href={image.sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-zinc-400 underline-offset-2 hover:underline dark:text-zinc-500"
      >
        {label}
      </a>
    );
  }

  return <span className="text-xs text-zinc-400 dark:text-zinc-500">{label}</span>;
}

export function ImageWithCredit({
  image,
  wikipediaUrl,
  className = "",
}: {
  image: AttractionImage;
  wikipediaUrl?: string;
  className?: string;
}) {
  const photo = (
    <div className="relative h-44 w-full overflow-hidden rounded-xl sm:h-52 lg:h-56">
      <Image src={image.src} alt={image.alt} fill className="object-cover" />
    </div>
  );

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {wikipediaUrl ? (
        <a
          href={wikipediaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer transition-opacity hover:opacity-90"
        >
          {photo}
        </a>
      ) : (
        photo
      )}
      <ImageCredit image={image} />
    </div>
  );
}

export default function AttractionImageGallery({
  images,
  wikipediaUrl,
}: {
  images: AttractionImage[];
  wikipediaUrl?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ startX: 0, startScrollLeft: 0, moved: false });

  const handleMouseDown = (e: React.MouseEvent) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    e.preventDefault();
    drag.current = { startX: e.pageX, startScrollLeft: scroller.scrollLeft, moved: false };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollerRef.current) return;
    const delta = e.pageX - drag.current.startX;
    if (Math.abs(delta) > 5) {
      drag.current.moved = true;
    }
    scrollerRef.current.scrollLeft = drag.current.startScrollLeft - delta;
  };

  const stopDragging = () => setIsDragging(false);

  const handleClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={scrollerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onClickCapture={handleClickCapture}
      className={`no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto ${
        isDragging ? "cursor-grabbing select-none" : "cursor-grab"
      }`}
    >
      {images.map((img, i) => (
        <ImageWithCredit
          key={i}
          image={img}
          wikipediaUrl={wikipediaUrl}
          className="w-[90%] shrink-0 snap-center"
        />
      ))}
    </div>
  );
}
