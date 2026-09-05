import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EventInfoCard, SpeakerCard } from "@/components/sections/EventInfoCard";
import RegistrationForm from "@/components/sections/RegistrationForm";
import { getEventBySlug, getRelatedEvents } from "@/lib/data/events";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary,
  };
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return notFound();

  const relatedEvents = getRelatedEvents(event.slug);

  return (
    <>
      <div className="container-luci py-8 sm:py-10 md:py-12 flex flex-col gap-8 sm:gap-10 md:gap-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
          <Link href="/events" className="hover:text-maroon-deep shrink-0">
            Events
          </Link>
          <ChevronRight size={12} className="shrink-0" />
          <span className="text-charcoal truncate">{event.title}</span>
        </nav>

        {/* Hero */}
        <div className="relative h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] rounded-card overflow-hidden">
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/80 to-transparent flex items-end p-4 sm:p-8 md:p-12">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              {event.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
          {/* Main content */}
          <div className="md:col-span-2 flex flex-col gap-8 sm:gap-10 md:gap-12">
            <div className="flex flex-col gap-4 text-sm sm:text-base">
              {event.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
              <h2 className="text-2xl sm:text-3xl">Featured Speakers</h2>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-wrap">
                {event.speakers.map((s) => (
                  <SpeakerCard key={s.name} {...s} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:gap-6 md:gap-8">
              <h2 className="text-2xl sm:text-3xl">Organised By</h2>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {event.organisers.map((org) => (
                  <span
                    key={org}
                    className="bg-white rounded-control px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium text-charcoal border border-border-mid"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5 sm:gap-6">
            <EventInfoCard
              dateRange={event.dateRange}
              time={event.time}
              venue={event.venue}
              seatsRemaining={event.seatsRemaining}
            />
            <RegistrationForm slug={event.slug} />
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="border-t border-border-mid pt-8 sm:pt-10 md:pt-12 flex flex-col gap-5 sm:gap-6 md:gap-8">
            <h2 className="text-2xl sm:text-3xl">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {relatedEvents.map((related) => (
                <Link
                  key={related.slug}
                  href={`/events/${related.slug}`}
                  className="bg-white border border-border-mid/40 rounded-card overflow-hidden block hover:border-border-mid transition-colors"
                >
                  <div className="relative h-40 sm:h-48 w-full">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 sm:p-6 flex flex-col gap-2">
                    <span className="text-sm text-maroon-deep">{related.date}</span>
                    <h3 className="text-lg sm:text-xl">{related.title}</h3>
                    <p className="text-sm text-muted">{related.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}