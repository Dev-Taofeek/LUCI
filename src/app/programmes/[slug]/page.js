import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Calendar, Activity, Target, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/Card";
import CTASection from "@/components/sections/CTASection";
import { InfoBox, ObjectivesList, TagRow } from "@/components/sections/InfoBox";
import TimelineStep from "@/components/sections/TimelineStep";
import StatHighlightCard from "@/components/sections/StatHighlightCard";
import { getProgrammeBySlug, getRelatedProgrammes } from "@/lib/data/programmes";

export default async function ProgrammeDetailPage({ params }) {
  const { slug } = await params;
  const programme = getProgrammeBySlug(slug);
  if (!programme || !programme.detail) return notFound();

  const { detail } = programme;
  const related = getRelatedProgrammes(programme.slug);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[440px] flex items-end px-4 sm:px-6 md:px-10">
        <Image
          src={programme.heroImage || programme.image}
          alt={programme.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />

        <div className="relative z-10 max-w-container mx-auto px-2 sm:px-6 pb-6 sm:pb-8 md:pb-10 flex flex-col gap-3 sm:gap-4 w-full">
          <span className="bg-gold-light text-maroon-deep text-xs sm:text-sm font-semibold btn-tracking rounded-full px-3 py-1 w-fit">
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
              <MapPin size={16} className="shrink-0" /> {programme.location}
            </span>
            <span className="flex items-center gap-2">
              <Activity size={16} className="shrink-0" /> {programme.statusLabel}
            </span>
          </div>
        </div>
      </section>

      {/* Main content layout: 8/4 split */}
      <section className="max-w-container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
        {/* Left column */}
        <div className="md:col-span-8 flex flex-col gap-8 sm:gap-10 md:gap-12">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="!text-2xl sm:!text-[26px]">Overview</h2>
            <p className="text-base sm:text-lg">{detail.overview}</p>
          </div>

          <div className="flex gap-4 sm:gap-6 flex-col md:flex-row">
            <InfoBox icon={<Target className="text-maroon-deep" size={24} />} title="Objectives">
              <ObjectivesList items={detail.objectives} />
            </InfoBox>
            <InfoBox icon={<Users className="text-gold" size={24} />} title="Target Audience">
              <p className="text-sm sm:text-base text-muted">{detail.audience.description}</p>
              <TagRow tags={detail.audience.tags} />
            </InfoBox>
          </div>

          <div className="flex flex-col gap-4 sm:gap-5">
            <h2 className="!text-2xl sm:!text-[26px]">Key Activities</h2>
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

          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="!text-2xl sm:!text-[26px]">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {detail.gallery.map((src) => (
                <div
                  key={src}
                  className="relative h-32 sm:h-40 md:h-52 rounded-control overflow-hidden bg-border-light"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="md:col-span-4 flex flex-col gap-6 sm:gap-8">
          <StatHighlightCard stats={detail.stats} />

          <div className="bg-white border border-border-light rounded-[12px] p-5 sm:p-6 flex flex-col gap-4">
            <h3 className="text-xs sm:text-sm font-semibold text-muted btn-tracking uppercase">
              In Partnership With
            </h3>
            <div className="grid grid-cols-2 gap-3 opacity-70">
              {detail.partners.map((p) => (
                <div
                  key={p}
                  className="bg-border-light rounded h-10 sm:h-12 flex items-center justify-center text-xs sm:text-sm text-muted px-2 text-center"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-maroon-deep px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-14 flex justify-center">
        <div className="max-w-xl flex flex-col items-center text-center gap-3 sm:gap-4">
          <h2 className="text-white text-2xl sm:text-3xl">Support This Project</h2>
          <p className="text-warm-white/80 text-sm sm:text-base">
            Your contribution helps us expand the reach of the {programme.title},
            training more leaders and fostering stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto">
            <Button variant="accent" href="/donate" className="w-full sm:w-auto">
              Donate Now
            </Button>
            <Button variant="outlineOnDark" href="/get-involved" className="w-full sm:w-auto">
              Volunteer with Us
            </Button>
          </div>
        </div>
      </section>

      {/* Related Programmes */}
      <section className="max-w-container mx-auto px-4 sm:px-6 py-10 sm:py-12 md:py-14 border-t border-border-light flex flex-col gap-5 sm:gap-6">
        <h2 className="!text-2xl sm:!text-[26px]">Related Programmes</h2>
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
    </>
  );
}