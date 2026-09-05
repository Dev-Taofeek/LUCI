import Image from "next/image";
import { MapPin } from "lucide-react";

export default function StoryCard({ location, title, quote, image }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-card overflow-hidden flex flex-col">
      <div className="relative h-40 sm:h-44 md:h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-maroon-dark/80 text-white text-xs font-medium rounded-full px-3 py-1 flex items-center gap-1">
          <MapPin size={12} className="shrink-0" /> {location}
        </span>
      </div>
      <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4">
        <h3 className="text-white text-xl sm:text-2xl">{title}</h3>
        <blockquote className="border-l-2 border-gold pl-4 italic text-warm-white/85 text-sm sm:text-base">
          &ldquo;{quote}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}