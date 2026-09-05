import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tag } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

/**
 * Content card: image top (responsive height), floating status badge, title, description,
 * meta rows separated by a top border, full-width outline CTA button.
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
      {/* Image */}
      <div className="relative h-40 sm:h-44 md:h-48 w-full shrink-0">
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
          <Badge
            status={status}
            className="absolute top-3 right-3 sm:top-4 sm:right-4"
          >
            {statusLabel}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1 gap-2.5">
        {category && (
          <span className="flex items-center gap-2 text-sm font-semibold text-maroon-deep shrink-0">
            <Tag size={13} className="shrink-0" />
            {category}
          </span>
        )}

        <h3 className="text-charcoal leading-snug">{title}</h3>

        {description && <p className="text-sm text-muted">{description}</p>}

        {meta.length > 0 && (
          <div className="border-t border-border-light pt-3 sm:pt-4 mt-1 flex flex-col gap-2.5">
            {meta.map((row, i) => (
              <div
                key={i}
                className="flex items-center gap-3 sm:gap-4 text-sm"
              >
                {row.icon}

                <span
                  className={cn(
                    "min-w-0 break-words",
                    row.emphasis
                      ? "font-semibold text-maroon-deep"
                      : "text-muted"
                  )}
                >
                  {row.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Push button to bottom */}
        <div className="mt-auto pt-5">
          <Button
            variant="secondary"
            href={href}
            className="w-full justify-center text-sm"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Vision/Mission icon card with tinted icon circle.
 */
export function IconCard({ icon, title, description, tint = "maroon" }) {
  return (
    <div className="bg-white border border-border-mid rounded-card p-6 sm:p-8 md:p-10 flex flex-col gap-4 h-full">
      <div
        className={cn(
          "size-10 sm:size-11 md:size-12 rounded-full flex items-center justify-center shrink-0",
          tint === "maroon" ? "bg-maroon-deep/10" : "bg-gold/15"
        )}
      >
        {icon}
      </div>
      <h3 className="text-maroon-deep">{title}</h3>
      <p className="text-sm sm:text-base text-muted">{description}</p>
    </div>
  );
}