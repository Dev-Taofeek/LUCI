"use client";

import { motion } from "framer-motion";
import {
  Ear,
  Lightbulb,
  Link2,
  Users2,
  Rocket,
  BarChart3,
} from "lucide-react";
import FocusArea from "@/components/sections/FocusArea";
import StrategyStep from "@/components/sections/StrategyStep";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const FOCUS_AREAS = [
  {
    title: "Family Development",
    description:
      "Empowering families as the core unit of society through counseling, economic empowerment, and educational support systems to ensure resilience and stability.",
    objectivesLabel: "Objectives",
    objectives: ["Strengthen bonds", "Economic resilience"],
    impactStat: "1,500+ families supported",
    tags: ["Parents", "Children"],
    href: "/programmes?category=family",
    image:
      "/w-w-d1.webp",
  },
  {
    title: "Diversity & Inclusion",
    description:
      "Fostering environments where every individual feels valued and respected. We champion initiatives that break down systemic barriers and promote equitable opportunities for marginalized groups.",
    objectivesLabel: "Activities",
    objectives: ["Advocacy workshops", "Policy reform dialogues"],
    impactStat: "50+ inclusive policies shaped",
    tags: ["Marginalized Groups", "Local Leaders"],
    href: "/programmes?category=diversity",
    image:
      "/w-w-d2.webp",
    reverse: true,
  },
];

const STRATEGY_STEPS = [
  { icon: <Ear size={20} />, title: "Listen", description: "Gathering insights directly from the ground." },
  { icon: <Lightbulb size={20} />, title: "Understand", description: "Analyzing needs and systemic challenges." },
  { icon: <Link2 size={20} />, title: "Connect", description: "Building relational bridges across groups." },
  { icon: <Users2 size={20} />, title: "Collaborate", description: "Partnering for sustainable solutions." },
  { icon: <Rocket size={20} />, title: "Act", description: "Implementing targeted, impactful programs." },
  { icon: <BarChart3 size={20} />, title: "Measure", description: "Evaluating outcomes to refine our impact." },
];

export default function WhatWeDoPage() {
  return (
    <>
      {/* Hero */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-container mx-auto px-4 sm:px-6 pt-10 sm:pt-12 lg:pt-16 pb-10 sm:pb-12 lg:pb-16 flex flex-col items-center gap-4 sm:gap-6 text-center"
      >
        <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl leading-tight">
          Our Focus Areas
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-sm sm:text-md font-thin max-w-xl sm:max-w-3xl">
          Driving social change through relational bridge building. We
          believe that by strengthening families and fostering unity within
          communities, we can create a sustainable foundation for holistic
          development across the region.
        </motion.p>
      </motion.section>

      {/* Focus Areas */}
      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 pb-12 sm:pb-16 lg:pb-20">
        {FOCUS_AREAS.map((area) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <FocusArea {...area} />
          </motion.div>
        ))}
      </div>

      {/* Our Strategic Approach */}
      <section className="bg-white section-padding flex justify-center px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-container w-full flex flex-col gap-8 sm:gap-10 lg:gap-12"
        >
          <motion.h2 variants={fadeInUp} className="text-center text-2xl sm:text-3xl lg:text-4xl">
            Our Strategic Approach
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap gap-x-6 gap-y-8 sm:gap-x-8 justify-center"
          >
            {STRATEGY_STEPS.map((step) => (
              <StrategyStep key={step.title} {...step} />
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}