import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

/**
 * Content card: image top (responsive height), floating status badge, title, description,
 * meta rows separated by a top border, full-width outline CTA button.
 * Was bg #f9f9f9 / border #bfc9c4 -> bg-white / border-border-mid.
 */
export function ContentCard({
  image,
  status,
  statusLabel,
  category,
  title,
  description,
  meta = [],
  ctaLabel = "View Programme",
  href,
}) {
  return (
    <div className="bg-white border border-border-mid rounded-card overflow-hidden flex flex-col w-full h-full">
      <div className="relative h-40 sm:h-44 md:h-48 w-full">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        {status && (
          <Badge status={status} className="absolute top-3 right-3 sm:top-4 sm:right-4">
            {statusLabel}
          </Badge>
        )}
      </div>
      <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-2 flex-1">
        {category && (
          <span className="flex items-center gap-2 text-sm text-maroon-deep">
            <Tag size={13} className="shrink-0" />
            {category}
          </span>
        )}
        <h3 className="text-charcoal text-lg sm:text-xl md:text-[22px] leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted">{description}</p>
        )}

        {meta.length > 0 && (
          <div className="border-t border-border-light pt-3 sm:pt-4 mt-2 flex flex-col gap-2">
            {meta.map((row, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-4 text-sm">
                {row.icon}
                <span
                  className={cn(
                    "min-w-0 break-words",
                    row.emphasis ? "font-semibold text-maroon-deep" : "text-muted"
                  )}
                >
                  {row.label}
                </span>
              </div>
            ))}
          </div>
        )}

        <Button
          variant="secondary"
          href={href}
          className="w-full mt-auto pt-4 sm:mt-4 justify-center text-sm"
        >
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

/**
 * Vision/Mission icon card. Was bg #f9f9f9 / border #e2e2e2, tinted icon circle.
 */
export function IconCard({ icon, title, description, tint = "maroon" }) {
  return (
    <div className="bg-white border border-border-light rounded-[12px] p-6 sm:p-8 md:p-12 flex flex-col gap-3 sm:gap-4 shadow-[0_4px_10px_rgba(110,15,26,0.04)] flex-1">
      <div
        className={cn(
          "size-10 sm:size-11 md:size-12 rounded-full flex items-center justify-center shrink-0",
          tint === "maroon" ? "bg-maroon-deep/10" : "bg-gold/10"
        )}
      >
        {icon}
      </div>
      <h3 className="text-maroon-deep text-lg sm:text-xl md:text-2xl">{title}</h3>
      <p className="text-sm sm:text-base text-muted">{description}</p>
    </div>
  );
}