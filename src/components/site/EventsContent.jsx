"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function EventsContent({ events }) {
  const featured = events.find((e) => e.featured) ?? events[0];

  return (
    <section className="container-luci py-10 sm:py-12 md:py-16 flex flex-col items-center gap-10 sm:gap-12 md:gap-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-3 sm:gap-4 text-center max-w-xl sm:max-w-2xl"
      >
        <motion.span
          variants={fadeInUp}
          className="bg-gold/10 border border-gold/25 text-maroon-deep text-xs sm:text-sm font-semibold btn-tracking uppercase rounded-control px-4 sm:px-6 py-1.5 sm:py-2"
        >
          Events &amp; Gatherings
        </motion.span>
        <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl leading-tight">
          Come Together. Connect. Build.
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-sm sm:text-base">
          Join the Love, Unity, and Care Initiative at our upcoming
          gatherings. Whether it&apos;s a community workshop, a large-scale
          conference, or a volunteer day, your presence helps us build
          stronger foundations together.
        </motion.p>
      </motion.div>

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
    </section>
  );
}