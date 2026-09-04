"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import { ResourceCard, FeaturedResourceBanner } from "@/components/sections/ResourceCard";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { FEATURED_RESOURCE, RESOURCES } from "@/lib/data/resources";
const FILTERS = ["All Resources", "Research", "Reports", "Guides", "Videos"];
export default function ResourcesIndexPage() {
  const [activeFilter, setActiveFilter] = useState("All Resources");
  const [query, setQuery] = useState("");
  const filtered = RESOURCES.filter((r) => {
    const matchesQuery = r.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter =
      activeFilter === "All Resources" ||
      r.type.toLowerCase() === activeFilter.toLowerCase().replace(/s$/, "");
    return matchesQuery && matchesFilter;
  });
  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 flex flex-col items-center gap-8 sm:gap-10 md:gap-12">
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
        <motion.p variants={fadeInUp} className="text-sm sm:text-md font-thin">
          Explore our collection of research, reports, and practical guides
          designed to share insights and empower communities across the
          continent.
        </motion.p>
        <motion.div variants={fadeInUp} className="relative w-full max-w-2xl mt-1 sm:mt-2">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted rounded" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources, topics, or authors..."
            className="w-full bg-white border border-border-mid rounded-md pl-11 pr-4 py-3 sm:py-4 text-base text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          />
        </motion.div>
      </motion.div>

      <FeaturedResourceBanner {...FEATURED_RESOURCE} />

      {/* Filters & Grid */}
      <div className="w-full flex flex-col gap-8 sm:gap-10 md:gap-12 pt-4 sm:pt-6 md:pt-8">
        <div className="flex gap-2 sm:gap-3 md:gap-4 flex-nowrap sm:flex-wrap overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-border-mid pb-4 sm:pb-6">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "bg-maroon-deep text-white rounded-md px-4 py-2 text-sm whitespace-nowrap shrink-0"
                  : "bg-border-light/40 text-muted border border-border-mid/30 rounded-md px-4 py-2 text-sm hover:border-maroon-deep/40 whitespace-nowrap shrink-0"
              }
            >
              {filter}
            </button>
          ))}
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
            <p className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-muted py-10 sm:py-12 px-4">
              No resources match your search.
            </p>
          )}
        </motion.div>

        <div className="flex justify-center">
          <Button variant="secondary" className="w-full sm:w-auto">
            Load More Resources
          </Button>
        </div>
      </div>
    </div>
  );
}