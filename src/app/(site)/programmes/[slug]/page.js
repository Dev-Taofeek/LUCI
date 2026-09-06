import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, Activity, Target, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/Card";
import CTASection from "@/components/sections/CTASection";
import { InfoBox, ObjectivesList, TagRow } from "@/components/sections/InfoBox";
import TimelineStep from "@/components/sections/TimelineStep";
import StatHighlightCard from "@/components/sections/StatHighlightCard";
import { getProgrammeBySlug, listRelatedProgrammes } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const programme = await getProgrammeBySlug(slug);
  if (!programme) return {};
  return {
    title: programme.title,
    description: programme.summary,
  };
}

export default async function ProgrammeDetailPage({ params }) {
  const { slug } = await params;
  const programme = await getProgrammeBySlug(slug);
  if (!programme) return notFound();

  const { detail } = programme;
  const related = await listRelatedProgrammes(programme.slug);
  const heroImage = programme.heroImage || programme.image;

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[440px] flex items-end">
        {heroImage ? (
          <Image
            src={heroImage}
            alt={programme.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-maroon-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

        <div className="relative z-10 container-luci pb-6 sm:pb-8 md:pb-10 flex flex-col gap-3 sm:gap-4 w-full">
          <span className="bg-gold-light text-maroon-deep text-xs sm:text-sm font-semibold btn-tracking rounded-control px-3 py-1.5 w-fit">
            {programme.category}
          </span>
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
            {programme.title}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-white/80">
            <span className="flex items-center gap-2">
              <Calendar size={16} className="shrink-0" /> {programme.dateRange}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0" /> {programme.location || "—"}
            </span>
            <span className="flex items-center gap-2">
              <Activity size={16} className="shrink-0" /> {programme.statusLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Main content layout: 8/4 split */}
      <section className="container-luci py-10 sm:py-12 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
        {/* Left column */}
        <div className="md:col-span-8 flex flex-col gap-8 sm:gap-10 md:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl">Overview</h2>
            <p className="text-sm sm:text-base">{detail.overview || programme.summary || "Details coming soon."}</p>
          </div>

          {detail.objectives?.length > 0 || detail.audience?.tags?.length > 0 ? (
            <div className="flex gap-4 sm:gap-6 flex-col md:flex-row">
              {detail.objectives?.length > 0 && (
                <InfoBox icon={<Target className="text-maroon-deep" size={24} />} title="Objectives">
                  <ObjectivesList items={detail.objectives} />
                </InfoBox>
              )}
              {detail.audience?.tags?.length > 0 && (
                <InfoBox icon={<Users className="text-maroon-deep" size={24} />} title="Target Audience">
                  <p className="text-sm sm:text-base text-muted">{detail.audience.description}</p>
                  <TagRow tags={detail.audience.tags} />
                </InfoBox>
              )}
            </div>
          ) : null}

          {detail.activities?.length > 0 ? (
            <div className="flex flex-col gap-4 sm:gap-5">
              <h2 className="text-2xl sm:text-3xl">Key Activities</h2>
              <div>
                {detail.activities.map((activity, i) => (
                  <TimelineStep
                    key={activity.title}
                    number={i + 1}
                    title={activity.title}
                    description={activity.description}
                    isLast={i === detail.activities.length - 1}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {detail.gallery?.length > 0 && (
            <div className="flex flex-col gap-3 sm:gap-4">
              <h2 className="text-2xl sm:text-3xl">Gallery</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {detail.gallery.map((src, i) => (
                  <div
                    key={src}
                    className="relative h-32 sm:h-40 md:h-52 rounded-card overflow-hidden bg-border-light"
                  >
                    <Image
                      src={src}
                      alt={`${programme.title} — gallery image ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="md:col-span-4 flex flex-col gap-6 sm:gap-8">
          {detail.stats?.length > 0 && <StatHighlightCard stats={detail.stats} />}

          {detail.partners?.length > 0 && (
            <div className="bg-white border border-border-mid rounded-card p-5 sm:p-6 flex flex-col gap-4">
              <h3 className="text-xs sm:text-sm font-semibold text-muted btn-tracking uppercase">
                In Partnership With
              </h3>
              <div className="grid grid-cols-2 gap-3 opacity-70">
                {detail.partners.map((p) => (
                  <div
                    key={p}
                    className="bg-border-light rounded-card h-10 sm:h-12 flex items-center justify-center text-xs sm:text-sm text-muted px-2 text-center"
                  >
                    {p}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-maroon-deep py-10 sm:py-12 md:py-14">
        <div className="container-luci max-w-xl flex flex-col items-center text-center gap-3 sm:gap-4">
          <h2 className="text-white text-2xl sm:text-3xl">Support This Project</h2>
          <p className="text-white/80 text-sm sm:text-base">
            Your contribution helps us expand the reach of the {programme.title},
            training more leaders and fostering stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
            <Button variant="accentWhite" href="/donate" className="w-full sm:w-auto">
              Donate Now
            </Button>
            <Button variant="outlineOnDark" href="/get-involved" className="w-full sm:w-auto">
              Volunteer with Us
            </Button>
          </div>
        </div>
      </section>

      {/* Related Programmes */}
      {related.length > 0 && (
        <section className="container-luci py-10 sm:py-12 md:py-14 border-t border-border-light flex flex-col gap-5 sm:gap-6">
          <h2 className="text-2xl sm:text-3xl">Related Programmes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {related.map((p) => (
              <ContentCard
                key={p.slug}
                image={p.image}
                category={p.category}
                title={p.title}
                description={p.summary}
                ctaLabel={p.ctaLabel}
                href={`/programmes/${p.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}