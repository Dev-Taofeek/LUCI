"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import PageHero from "@/components/ui/PageHero";
import { HeroStatCard, StatCard } from "@/components/sections/StatBentoGrid";
import GeoFootprintMap from "@/components/sections/GeoFootprintMap";
import { AllocationList, AllocationRadarChart } from "@/components/sections/ImpactAllocation";
import StoryCard from "@/components/sections/StoryCard";
import AnnualReportsSection from "@/components/sections/AnnualReportsSection";
import { HERO_STAT, STATS, STORIES } from "@/lib/data/impact";

export default function ImpactPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        tone="dark"
        eyebrow="Our Impact"
        title={
          <>
            Our Ripple Effect of Care:{" "}
            <span className="text-gold">Measuring Real Change.</span>
          </>
        }
        subtitle="Transparency, accountability, and real human stories. Explore how our initiatives are transforming lives and strengthening communities across regions."
      >
        <a
          href="#allocation"
          className="flex items-center gap-2 pt-1 text-sm font-semibold text-warm-white transition-colors hover:text-gold"
        >
          Explore the data <ArrowRight size={16} />
        </a>
      </PageHero>

      {/* Impact Statistics Bento Grid */}
      <section className="bg-white section-padding">
        <div className="container-luci flex flex-col gap-8 sm:gap-10 md:gap-12">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl">By the Numbers</h2>
            <p className="text-sm sm:text-base">A snapshot of our collective achievements.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <HeroStatCard {...HERO_STAT} />
            <StatCard {...STATS[0]} />
            {STATS.slice(1).map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Footprint */}
      <section className="bg-white border-y border-border-light py-12 sm:py-16 md:py-20">
        <div className="container-luci grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="flex flex-col gap-4 sm:gap-6 order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
              Our Geographic Footprint
            </h2>
            <p className="text-sm sm:text-base">
              We are expanding our reach across key regions, building
              regional hubs to deliver targeted, culturally contextualized
              care. Explore our primary operating areas.
            </p>
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-3 text-sm sm:text-base text-charcoal">
                <span className="size-3 rounded-full bg-gold shrink-0" /> Regional Hubs
              </span>
              <span className="flex items-center gap-3 text-sm sm:text-base text-charcoal">
                <span className="size-3 rounded-full bg-maroon-deep shrink-0" /> Active Programs
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <GeoFootprintMap />
          </div>
        </div>
      </section>

      {/* Impact Allocation */}
      <section id="allocation" className="bg-white section-padding">
        <div className="container-luci flex flex-col gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="text-center flex flex-col gap-2 max-w-xl sm:max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Impact Allocation</h2>
            <p className="text-sm sm:text-base">
              Understanding where our resources and efforts are concentrated
              across our core mission pillars.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center justify-center w-full">
            <AllocationList />
            <AllocationRadarChart />
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="bg-white py-10 sm:py-12">
        <div className="container-luci">
          <AnnualReportsSection />
        </div>
      </section>

      {/* Stories of Change */}
      <section className="bg-maroon-deep section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="container-luci flex flex-col gap-8 sm:gap-10 md:gap-12"
        >
          <div className="flex flex-col gap-2">
            <motion.h2 variants={fadeInUp} className="text-white text-2xl sm:text-3xl md:text-4xl">
              Stories of Change
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/70 text-sm sm:text-base max-w-xl">
              Beyond the numbers, our impact is defined by individual
              journeys of resilience and unity.
            </motion.p>
          </div>
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {STORIES.map((story) => (
              <StoryCard key={story.title} {...story} />
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}