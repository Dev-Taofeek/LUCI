import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export default function StoryCard({ location, title, quote, image }) {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-md overflow-hidden flex flex-col">
      <div className="relative h-40 sm:h-44 md:h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 backdrop-blur-sm bg-maroon-dark/80 text-white text-xs rounded-full px-3 py-1 flex items-center gap-1">
          <MapPin size={12} className="shrink-0" /> {location}
        </span>
      </div>
      <div className="p-5 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4">
        <h3 className="text-white text-lg sm:text-xl md:!text-[22px]">{title}</h3>
        <blockquote className="border-l-2 border-gold pl-4 italic text-warm-white/80 text-sm sm:text-md font-thin">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold w-fit hover:text-white"
        >
          Read Full Story <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}