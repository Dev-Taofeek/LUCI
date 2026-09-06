"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { IconCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ArrowLink from "@/components/ui/ArrowLink";
import { HeroStatCard, StatCard } from "@/components/sections/StatBentoGrid";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { HERO_STAT, STATS } from "@/lib/data/impact";
import { Eye, HeartHandshake } from "lucide-react";

const HERO_IMAGE = "/h-hero.webp";

export default function HomePage() {
  return (
    <>
      <HeroSection
        image={HERO_IMAGE}
        title="Building Bridges, One Family at a Time."
        subtitle="Strengthening families, celebrating diversity and building meaningful relationships for a more united society and nation."
        minHeight="min-h-[500px] sm:min-h-[560px] lg:min-h-[640px]"
        actions={
          <>
            <Button variant="primary" href="/programmes" className="w-full sm:w-auto">
              Explore Our Work
            </Button>
            <Button variant="accent" href="/donate" className="w-full sm:w-auto">
              Support LUCI
            </Button>
          </>
        }
      />

      {/* Introduction */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="section-padding"
      >
        <div className="container-luci max-w-3xl flex flex-col items-center gap-4 sm:gap-6 text-center">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl leading-snug">
            A stronger society begins with the relationships we build.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base">
            At LUCI, we believe that the foundation of any thriving nation
            lies in the strength of its families and communities. We are
            dedicated to fostering environments where diversity is
            celebrated, unity is nurtured, and meaningful connections are
            forged across all boundaries.
          </motion.p>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <section className="bg-white section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="container-luci grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-stretch"
        >
          <motion.div variants={fadeInUp} className="h-full">
            <IconCard
              icon={<Eye className="text-maroon-deep" size={20} />}
              title="Our Vision"
              description="To become a world-inspiring beacon of unity, demonstrating the power of strong families and cohesive communities in building a resilient nation."
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="h-full">
            <IconCard
              icon={<HeartHandshake className="text-maroon-deep" size={20} />}
              title="Our Mission"
              description="To design, implement, and support initiatives that strengthen family bonds, bridge cultural divides, and empower individuals to be active contributors to a united and prosperous society."
              tint="gold"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Impact Snapshot */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="section-padding"
      >
        <div className="container-luci flex flex-col gap-8 sm:gap-10 lg:gap-12">
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center text-center gap-2 sm:gap-3"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl">Our Impact So Far</h2>
            <p className="text-sm sm:text-base max-w-xl">
              A snapshot of the change we&apos;re building together, one
              family at a time.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6"
          >
            <HeroStatCard {...HERO_STAT} />
            <StatCard {...STATS[0]} />
            <StatCard {...STATS[1]} />
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center">
            <ArrowLink href="/impact">See our full impact</ArrowLink>
          </motion.div>
        </div>
      </motion.section>

      <CTASection
        title="Help Us Build More Bridges."
        actions={
          <>
            <Button variant="lightSolid" href="/get-involved" className="w-full sm:w-auto">
              Get Involved
            </Button>
            <Button variant="accentWhite" href="/donate" className="w-full sm:w-auto">
              Donate
            </Button>
          </>
        }
      />
    </>
  );
}