import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Download, PlayCircle } from "lucide-react";
import Button from "@/components/ui/Button";

const DOWNLOADABLE_TYPES = ["GUIDE", "RESEARCH"];

export function ResourceCard({ slug, type, title, summary, date, ctaLabel, image }) {
  const CtaIcon = DOWNLOADABLE_TYPES.includes(type) ? Download : PlayCircle;
  return (
    <div className="bg-white border border-border-mid rounded-card overflow-hidden flex flex-col h-full">
      <div className="relative h-40 sm:h-44 md:h-48 w-full bg-border-light">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        {type === "VIDEO" && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-warm-white/90 size-10 sm:size-12 flex items-center justify-center rounded-full">
              <PlayCircle size={18} className="text-maroon-deep" />
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-warm-white/90 border border-border-mid/50 text-maroon-deep text-xs tracking-[0.05em] rounded-full px-3 py-1">
          {type}
        </span>
      </div>
      <div className="p-5 sm:p-6 flex flex-col gap-2 flex-1">
        <h3 className="text-lg sm:text-xl leading-snug">{title}</h3>
        <p className="text-sm text-muted flex-1">{summary}</p>
        <div className="border-t border-border-light/60 pt-3 sm:pt-4 flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs sm:text-sm text-muted min-w-0">
            {type === "VIDEO" ? (
              <Clock size={14} className="shrink-0" />
            ) : (
              <Calendar size={14} className="shrink-0" />
            )}
            <span className="truncate">{date}</span>
          </span>
          <Link
            href={`/resources/${slug}`}
            className="flex items-center gap-1.5 text-sm font-semibold text-maroon-deep btn-tracking hover:text-maroon-dark shrink-0"
          >
            {ctaLabel} <CtaIcon size={13} className="shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeaturedResourceBanner({ category, title, summary, author, date, image, slug }) {
  return (
    <div className="bg-maroon-deep rounded-card overflow-hidden grid grid-cols-1 md:grid-cols-2">
      <div className="p-6 sm:p-8 md:p-12 flex flex-col gap-4 sm:gap-5 md:gap-6 order-2 md:order-1">
        <span className="bg-white/10 border border-white/20 text-white text-xs tracking-[0.05em] rounded-full px-3 py-1 w-fit flex items-center gap-2">
          {category}
        </span>
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl leading-tight">{title}</h2>
        <p className="text-white/80 text-sm sm:text-base">{summary}</p>
        <span className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-sm text-white/70">
          <span>{author}</span>
          <span>{date}</span>
        </span>
        <Button
          variant="accent"
          href={`/resources/${slug}`}
          className="w-full sm:w-fit justify-center"
        >
          View Full Report
        </Button>
      </div>
      <div className="relative min-h-[200px] sm:min-h-[260px] md:min-h-[300px] order-1 md:order-2">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}