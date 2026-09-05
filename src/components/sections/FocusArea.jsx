import Image from "next/image";
import ArrowLink from "@/components/ui/ArrowLink";

export default function FocusArea({
  reverse = false,
  image,
  title,
  description,
  objectivesLabel = "Objectives",
  objectives,
  impactStat,
  tags,
  href,
}) {
  return (
    <article>
      <div
        className={`container-luci flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-snug">{title}</h2>
          <p className="text-sm sm:text-base">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex-1 bg-white border border-border-mid rounded-card p-4 sm:p-5 flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-maroon-deep btn-tracking">
                {objectivesLabel}
              </h3>
              <ul className="list-disc pl-4 text-sm text-muted flex flex-col gap-1">
                {objectives.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-white border border-border-mid rounded-card p-4 sm:p-5 flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-maroon-deep btn-tracking">
                Impact
              </h3>
              <span className="text-lg font-display font-semibold text-maroon-deep">
                {impactStat}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gold-light/40 text-maroon-deep text-sm font-medium rounded-control px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <ArrowLink href={href}>View Related Programmes</ArrowLink>
        </div>

        <div className="flex-1 relative h-[240px] sm:h-[320px] md:h-[400px] w-full rounded-card overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </article>
  );
}