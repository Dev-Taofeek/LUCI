import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Download, ArrowRight, PlayCircle } from "lucide-react";
import { RESOURCE_DETAIL } from "@/lib/data/resources";

const TYPE_ICON = {
  VIDEO: PlayCircle,
};

// Only one full detail page exists in this mock-data phase (matching the
// single Figma detail frame) — every card routes there for now. Once each
// resource has its own `detail` record, swap back to `/resources/${slug}`.
const DETAIL_HREF = `/resources/${RESOURCE_DETAIL.slug}`;

export function ResourceCard({ slug, type, title, summary, date, ctaLabel, image }) {
  const Icon = TYPE_ICON[type];
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
        {Icon && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-warm-white/90 backdrop-blur-sm rounded-full size-10 sm:size-12 flex items-center justify-center">
              <Icon size={18} className="text-maroon-deep" />
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 backdrop-blur-sm bg-warm-white/90 border border-border-mid/50 text-maroon-deep text-xs tracking-[0.05em] rounded-full px-3 py-1">
          {type}
        </span>
      </div>
      <div className="p-5 sm:p-6 flex flex-col gap-2 flex-1">
        <h3 className="text-lg sm:text-xl md:!text-[22px] leading-snug">{title}</h3>
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
            href={slug === RESOURCE_DETAIL.slug ? `/resources/${slug}` : DETAIL_HREF}
            className="flex items-center gap-1.5 text-sm font-semibold text-maroon-deep btn-tracking hover:text-maroon-dark shrink-0"
          >
            {ctaLabel} {type !== "VIDEO" && <Download size={13} />}
            {type === "VIDEO" && <ArrowRight size={13} />}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function FeaturedResourceBanner({ category, title, summary, author, date, image, slug }) {
  return (
    <div className="bg-maroon-deep rounded-card overflow-hidden shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] grid grid-cols-1 md:grid-cols-2">
      <div className="p-6 sm:p-8 md:p-12 flex flex-col gap-4 sm:gap-5 md:gap-6 order-2 md:order-1">
        <span className="bg-gold/20 text-gold text-xs tracking-[0.05em] rounded-full px-3 py-1 w-fit flex items-center gap-2">
          {category}
        </span>
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl leading-tight">{title}</h2>
        <p className="text-white/80 text-sm sm:text-base">{summary}</p>
        <span className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-sm text-white/70">
          <span>{author}</span>
          <span>{date}</span>
        </span>
        <Link
          href={slug === RESOURCE_DETAIL.slug ? `/resources/${slug}` : DETAIL_HREF}
          className="bg-gold text-charcoal rounded-control px-5 sm:px-6 py-2.5 sm:py-3 w-full sm:w-fit text-sm font-semibold btn-tracking flex items-center justify-center gap-2 hover:bg-gold/90"
        >
          Download Full Report <Download size={16} />
        </Link>
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