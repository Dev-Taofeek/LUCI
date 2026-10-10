"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users } from "lucide-react";
import Button from "@/components/ui/Button";
import { ContentCard } from "@/components/ui/Card";
import { SearchInput } from "@/components/ui/Input";
import FilterPills from "@/components/ui/FilterPills";
import CTASection from "@/components/sections/CTASection";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const STATUSES = ["Active", "Upcoming", "Completed"];
const CATEGORIES = ["Family", "Community", "Youth"];

export default function ProgrammesContent({ programmes }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const FILTERS = ["All", ...STATUSES, ...CATEGORIES];

  const filtered = programmes.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      p.statusLabel === activeFilter ||
      (p.category || "").toLowerCase().includes(activeFilter.toLowerCase());
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-white border-b border-border-light py-12 sm:py-16 md:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="container-luci flex flex-col items-center gap-4 sm:gap-6 text-center max-w-2xl"
        >
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl leading-tight">
            Where Our Mission Becomes Action.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base">
            Our inspired activities, thus programmes, are rather "cradle to grave" in nature:
            our activities begin with the family (existing and potential), through to
            collaborative spirit for common good, and fruiting to stronger families,
            sound citizenry and deepening patriotic well-being.
          </motion.p>
        </motion.div>
      </section>

      {/* Filter & Search */}
      <section className="container-luci py-8 sm:py-10 md:py-12 flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 lg:gap-8">
          <SearchInput
            placeholder="Search programmes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full lg:max-w-sm"
          />

          <FilterPills
            filters={FILTERS}
            active={activeFilter}
            onChange={setActiveFilter}
          />
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
            <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-muted py-10 sm:py-12">
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
            <Button variant="accentWhite" href="/donate" className="w-full sm:w-auto">
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