"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { fadeInUp } from "@/lib/motion";

export default function EventsContent({ events }) {
  const featured = events.find((e) => e.featured) ?? events[0];
  const otherEvents = events.filter((e) => e.slug !== featured?.slug);

  return (
    <>
      <PageHero
        eyebrow="Events & Gatherings"
        title="Come Together. Connect. Build."
        subtitle="Join the Love, Unity, and Care Initiative at our upcoming gatherings. Whether it's a community workshop, a large-scale conference, or a volunteer day, your presence helps us build stronger foundations together."
      />

      <section className="container-luci py-10 sm:py-12 md:py-16 flex flex-col items-center gap-10 sm:gap-12 md:gap-16">
        {featured && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-white border border-border-mid rounded-card overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full"
          >
          <div className="relative h-56 sm:h-64 md:h-auto">
            {featured.image ? (
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-border-light" />
            )}
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-warm-white/90 text-maroon-deep text-xs sm:text-sm font-semibold btn-tracking rounded-control px-4 sm:px-6 py-1.5 sm:py-2">
              Featured
            </span>
          </div>
          <div className="bg-white p-6 sm:p-8 md:p-12 flex flex-col gap-3 sm:gap-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-maroon-deep">
              <Calendar size={15} className="shrink-0" /> {featured.date}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl leading-snug">{featured.title}</h2>
            <p className="text-sm sm:text-base">{featured.summary}</p>
            <span className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={12} className="shrink-0" /> {featured.location}
            </span>
            <div className="pt-2">
              <Button variant="primary" href={`/events/${featured.slug}`} className="w-full sm:w-auto">
                Register Now
              </Button>
            </div>
          </div>
        </motion.div>
        )}

        {otherEvents.length > 0 && (
          <div className="w-full flex flex-col items-center gap-6 sm:gap-8">
            <h2 className="text-2xl sm:text-3xl leading-snug text-center">
              More Gatherings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
              {otherEvents.map((e) => (
                <motion.div
                  key={e.slug}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="h-full"
                >
                  <Link
                    href={`/events/${e.slug}`}
                    className="group bg-white border border-border-mid rounded-card overflow-hidden flex flex-col h-full transition-all duration-300 hover:border-maroon-deep/30 hover:shadow-lg"
                  >
                    <div className="relative h-44 sm:h-48">
                      {e.image ? (
                        <Image
                          src={e.image}
                          alt={e.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-border-light" />
                      )}
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col gap-2.5 flex-1">
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-maroon-deep">
                        <Calendar size={13} className="shrink-0" />
                        {e.date}
                        {e.time ? ` · ${e.time}` : ""}
                      </span>
                      <h3 className="text-lg leading-snug font-semibold text-charcoal">
                        {e.title}
                      </h3>
                      {e.summary && (
                        <p className="text-sm text-muted line-clamp-2 mb-0">{e.summary}</p>
                      )}
                      <span className="mt-auto flex items-center gap-1.5 text-sm text-muted pt-2">
                        <MapPin size={12} className="shrink-0" /> {e.location}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}