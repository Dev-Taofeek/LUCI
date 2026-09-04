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
    <article className="px-4 sm:px-6 md:px-10">
      <div
        className={`max-w-container mx-auto px-0 sm:px-6 flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="flex-1 flex flex-col gap-3 sm:gap-4 w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl leading-snug">
            {title}
          </h2>
          <p className="text-sm font-thin">{description}</p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex-1 bg-white border border-border-light rounded-md p-4 flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-maroon-deep btn-tracking">
                {objectivesLabel}
              </h3>
              <ul className="list-disc pl-4 text-sm text-muted flex flex-col gap-1">
                {objectives.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1 bg-white border border-border-light rounded-md p-4 flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-maroon-deep btn-tracking">
                Impact
              </h3>
              <span className="text-sm font-semibold text-gold">
                {impactStat}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gold-light/40 text-maroon-deep text-sm rounded-md px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <ArrowLink href={href}>View Related Programmes</ArrowLink>
        </div>

        <div className="flex-1 relative h-[240px] sm:h-[320px] md:h-[400px] w-full rounded-md overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          {image && (
            <Image
              src={image}
              alt={title}
              width={1200}
              height={1000}
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