"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { IconCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Eye, HeartHandshake } from "lucide-react";

const HERO_IMAGE = "/luci-logo.png";

export default function HomePage() {
  return (
    <>
      <HeroSection
        variant="solid"
        emblem={HERO_IMAGE}
        title="Sound Families make Sound Society and Sound Nation."
        subtitle="To promote and foster the well-being of the family and the growing of commitment to the building of relational bridges of humanity for a better society and nation."
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
            Sound families create a better society and therefore a better nation.
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base">
            At LUCI, we believe that where diversity is, unity flourishes
            and the nation prospers. We are dedicated to building families
            who see humanity as one family — bridging divides, pulling down
            walls, and promoting the beauty in diversity, as willed by our
            Creator after His image and likeness.
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
              description="So that we might fulfill our duty as leaven — families with a transcendental perspective, seeing beyond the horizon and naturally committing to fostering unity and charity."
            />
          </motion.div>
          <motion.div variants={fadeInUp} className="h-full">
            <IconCard
              icon={<HeartHandshake className="text-maroon-deep" size={20} />}
              title="Our Mission"
              description="Promoting and fostering beauty in diversity through family space to achieve better society and nation: A more perfect union."
              tint="gold"
            />
          </motion.div>
        </motion.div>
      </section>

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