"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
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
      <section className="relative bg-maroon-deep px-4 sm:px-6 md:px-10 py-14 sm:py-16 md:py-20 overflow-hidden flex justify-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -right-48 -top-48 size-[600px] rounded-md bg-gold blur-3xl" />
          <div className="absolute -left-24 bottom-0 size-96 rounded-md bg-maroon-dark blur-3xl" />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-xl sm:max-w-2xl lg:max-w-3xl flex flex-col items-center text-center gap-4 sm:gap-6"
        >
          <motion.span
            variants={fadeInUp}
            className="bg-gold/10 border border-gold/20 text-white text-xs sm:text-sm tracking-[0.05em] rounded-md px-4 sm:px-6 py-1.5 sm:py-2"
          >
            OUR IMPACT
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-white text-2xl sm:text-3xl md:text-4xl leading-tight font-bold"
          >
            Our Ripple Effect of Care:{" "}
            <span className="text-gold">Measuring Real Change.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-white/90 text-sm sm:text-md font-thin">
            Transparency, accountability, and real human stories. Explore how
            our initiatives are transforming lives and strengthening
            communities across regions.
          </motion.p>
          <motion.a
            variants={fadeInUp}
            href="#allocation"
            className="flex items-center gap-2 text-white pt-2 hover:bg-white hover:text-maroon-deep ease-in-out duration-200 transition-all px-3 py-2 rounded-md"
          >
            Explore the data <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </section>

      {/* Impact Statistics Bento Grid */}
      <section className="bg-white section-padding flex justify-center px-4 sm:px-6">
        <div className="max-w-container w-full flex flex-col gap-8 sm:gap-10 md:gap-12">
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
      <section className="bg-white border-y border-border-light px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-16 md:py-20 flex justify-center">
        <div className="max-w-container w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="flex flex-col gap-4 sm:gap-6 order-2 md:order-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
              Our Geographic Footprint
            </h2>
            <p className="text-sm sm:text-md font-thin">
              We are expanding our reach across key regions, building
              regional hubs to deliver targeted, culturally contextualized
              care. Explore our primary operating areas.
            </p>
            <div className="flex flex-col gap-3">
              <span className="flex items-center gap-3 text-sm sm:text-base text-charcoal">
                <span className="size-3 rounded-md bg-gold shrink-0" /> Regional Hubs
              </span>
              <span className="flex items-center gap-3 text-sm sm:text-base text-charcoal">
                <span className="size-3 rounded-md bg-maroon-deep shrink-0" /> Active Programs
              </span>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <GeoFootprintMap />
          </div>
        </div>
      </section>

      {/* Impact Allocation */}
      <section id="allocation" className="bg-white section-padding flex justify-center px-4 sm:px-6">
        <div className="max-w-container w-full flex flex-col gap-8 sm:gap-10 md:gap-12 items-center">
          <div className="text-center flex flex-col gap-2 max-w-xl sm:max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl">Impact Allocation</h2>
            <p className="text-sm sm:text-md font-thin">
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
      <section className="bg-white px-4 sm:px-6 md:px-10 py-10 sm:py-12 flex justify-center">
        <div className="max-w-container w-full">
          <AnnualReportsSection />
        </div>
      </section>

      {/* Stories of Change */}
      <section className="bg-maroon-deep section-padding flex justify-center px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-container w-full flex flex-col gap-8 sm:gap-10 md:gap-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.div variants={fadeInUp} className="flex flex-col gap-2 max-w-xl">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl">Stories of Change</h2>
              <p className="text-white/70 text-sm sm:text-md font-thin">
                Beyond the numbers, our impact is defined by individual
                journeys of resilience and unity.
              </p>
            </motion.div>
            <motion.a
              variants={fadeInUp}
              href="#"
              className="flex items-center gap-2 text-white shrink-0"
            >
              View all stories <ArrowRight size={16} />
            </motion.a>
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