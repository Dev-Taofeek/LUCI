"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { IconCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Eye, HeartHandshake } from "lucide-react";

const HERO_IMAGE =
  "/h-hero.webp";

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
            <Button
              variant="primary"
              href="/programmes"
              className="w-full sm:w-auto"
            >
              Explore Our Work
            </Button>
            <Button
              variant="accent"
              href="/donate"
              className="w-full sm:w-auto"
            >
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
        className="bg-white section-padding flex justify-center px-4 sm:px-6"
      >
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl flex flex-col items-center gap-4 sm:gap-6 text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-2xl sm:text-4xl lg:text-6xl leading-snug"
          >
            A stronger society begins with the relationships we build.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-md font-thin"
          >
            At LUCI, we believe that the foundation of any thriving nation
            lies in the strength of its families and communities. We are
            dedicated to fostering environments where diversity is
            celebrated, unity is nurtured, and meaningful connections are
            forged across all boundaries.
          </motion.p>
        </div>
      </motion.section>

      {/* Vision & Mission */}
      <section className="bg-white section-padding flex justify-center px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-container grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full items-stretch"
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
              icon={<HeartHandshake className="text-gold" size={20} />}
              title="Our Mission"
              description="To design, implement, and support initiatives that strengthen family bonds, bridge cultural divides, and empower individuals to be active contributors to a united and prosperous society."
              tint="gold"
            />
          </motion.div>
        </motion.div>
      </section>

      <CTASection
        title="Help Us Build More Bridges."
        actions={
          <>
            <Button
              variant="lightSolid"
              href="/get-involved"
              className="w-full sm:w-auto"
            >
              Get Involved
            </Button>
            <Button
              variant="accentWhite"
              href="/donate"
              className="w-full sm:w-auto"
            >
              Donate
            </Button>
          </>
        }
      />
    </>
  );
}