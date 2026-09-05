"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ResourceCard, FeaturedResourceBanner } from "@/components/sections/ResourceCard";
import { SearchInput } from "@/components/ui/Input";
import FilterPills from "@/components/ui/FilterPills";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { FEATURED_RESOURCE, RESOURCES } from "@/lib/data/resources";

const TYPE_LABELS = { GUIDE: "Guides", RESEARCH: "Research", VIDEO: "Videos" };
const FILTERS = [
  "All Resources",
  ...new Set(RESOURCES.map((r) => TYPE_LABELS[r.type] ?? r.type)),
];

export default function ResourcesIndexPage() {
  const [activeFilter, setActiveFilter] = useState("All Resources");
  const [query, setQuery] = useState("");

  const filtered = RESOURCES.filter((r) => {
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "All Resources" || TYPE_LABELS[r.type] === activeFilter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="container-luci pb-12 sm:pb-16 md:pb-20 flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
      {/* Hero */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4 sm:gap-6 text-center pt-10 sm:pt-12 md:pt-16 max-w-xl sm:max-w-2xl"
      >
        <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl leading-tight">
          Knowledge for Change
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-sm sm:text-base">
          Explore our collection of research, reports, and practical guides
          designed to share insights and empower communities across the
          continent.
        </motion.p>
        <motion.div variants={fadeInUp} className="w-full max-w-2xl mt-1 sm:mt-2">
          <SearchInput
            placeholder="Search resources, topics, or authors..."
            className="sm:py-3.5"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </motion.div>
      </motion.div>

      <FeaturedResourceBanner {...FEATURED_RESOURCE} />

      {/* Filters & Grid */}
      <div className="w-full flex flex-col gap-8 sm:gap-10 md:gap-12 pt-4 sm:pt-6 md:pt-8">
        <div className="border-b border-border-mid pb-4 sm:pb-6">
          <FilterPills filters={FILTERS} active={activeFilter} onChange={setActiveFilter} />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filtered.map((resource) => (
            <motion.div key={resource.slug} variants={fadeInUp}>
              <ResourceCard {...resource} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-muted py-10 sm:py-12">
              No resources match your search.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}