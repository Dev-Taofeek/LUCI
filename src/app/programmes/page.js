"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/Card";
import CTASection from "@/components/sections/CTASection";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { PROGRAMMES } from "@/lib/data/programmes";

const FILTERS = ["All", "Active", "Upcoming", "Completed", "Family", "Community", "Youth"];

export default function ProgrammesIndexPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = PROGRAMMES.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      p.statusLabel === activeFilter ||
      p.category.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-white border-b border-border-light px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 flex justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-xl sm:max-w-2xl lg:max-w-3xl flex flex-col items-center gap-4 sm:gap-6 text-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl leading-tight"
          >
            Where Our Mission Becomes Action.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-base sm:text-lg">
            Explore the tangible ways we are driving positive change in
            communities, families, and youth through dedicated projects and
            unified efforts.
          </motion.p>
        </motion.div>
      </section>

      {/* Filter & Search */}
     {/* Filter & Search */}
      <section className="max-w-container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 lg:gap-8">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search programmes..."
              className="w-full bg-warm-white border border-border-mid rounded-control pl-11 pr-4 py-3 text-base text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
            />
          </div>

          <div className="flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={
                  activeFilter === filter
                    ? "bg-maroon-deep text-white rounded-full px-4 sm:px-6 py-2 text-sm whitespace-nowrap shrink-0"
                    : "bg-white text-muted border border-border-mid rounded-full px-4 sm:px-6 py-2 text-sm hover:border-maroon-deep/40 whitespace-nowrap shrink-0"
                }
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Programme Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filtered.map((programme) => (
            <motion.div key={programme.slug} variants={fadeInUp}>
              <ContentCard
                image={programme.image}
                status={programme.status}
                statusLabel={programme.statusLabel}
                category={programme.category}
                title={programme.title}
                description={programme.summary}
                ctaLabel={programme.ctaLabel}
                href={`/programmes/${programme.slug}`}
                meta={[
                  { icon: <MapPin size={14} className="text-muted shrink-0" />, label: programme.location },
                  { icon: <Calendar size={14} className="text-muted shrink-0" />, label: programme.dateRange },
                  {
                    icon: <Users size={14} className="text-maroon-deep shrink-0" />,
                    label: programme.impactStat,
                    emphasis: true,
                  },
                ]}
              />
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-muted py-10 sm:py-12 px-4">
              No programmes match your search.
            </p>
          )}
        </motion.div>
      </section>

      <CTASection
        title="Join Us in Making a Difference"
        subtitle="Your support helps us expand these vital programmes to reach more communities in need. Partner with LUCI today."
        actions={
          <>
            <Button variant="accent" href="/get-involved#donate" className="w-full sm:w-auto">
              Donate Now
            </Button>
            <Button variant="outlineOnDark" href="/get-involved" className="w-full sm:w-auto">
              Become a Volunteer
            </Button>
          </>
        }
      />
    </>
  );
}