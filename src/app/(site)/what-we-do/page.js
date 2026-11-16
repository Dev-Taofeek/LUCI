"use client";

import { motion } from "framer-motion";
import { Ear, Lightbulb, Link2, Users2, Rocket, BarChart3 } from "lucide-react";
import FocusArea from "@/components/sections/FocusArea";
import StrategyStep from "@/components/sections/StrategyStep";
import PageHero from "@/components/ui/PageHero";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const FOCUS_AREAS = [
  {
    title: "Family Life",
    description:
      "Pre-Marriage, Married Life & Family Inspiring/Support Programmes; Seminars/Workshops and Counselling Services. It is an outright fallacy to fight against juvenile delinquency or against the prostitution of women while favouring the discrediting or deterioration of the institution of the family.",
    objectivesLabel: "Components",
    objectives: ["With Pre-Marriage Persons", "With Married & Family Life", "A Daily Reach-out Programme", "The Unity-Flame Programme", "Robust Counselling Services"],
    impactStat: "Cradle-to-grave family support",
    tags: ["Family", "Counselling"],
    href: "/programmes?filter=Family",
    image: "/hero-wwd-family.jpg",
  },
  {
    title: "In-depth Family Enrichment",
    description:
      "Advancing studies and human development programmes for a better society. LUCI actively works to create these programmes and be sustained organically, as an integral element of the overall transcendental goal of our families, their children and wards.",
    objectivesLabel: "Focus",
    objectives: ["Family bonding", "Bridge-building", "Counselling"],
    impactStat: "Human development & formation",
    tags: ["Enrichment", "Development"],
    href: "/programmes?filter=Community",
    image: "/hero-wwd-enrichment.jpg",
    reverse: true,
  },
]

export default function WhatWeDoPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        title="Our Focus Areas"
        subtitle={'Our inspired activities, thus programmes, are rather "cradle to grave" in nature: our activities begin with the family (existing and potential), and going through the family (by family development & enrichment programmes), through to collaborative spirit for common good, and fruiting to stronger families, sound citizenry and deepening patriotic well-being.'}
      />

      {/* Focus Areas */}
      <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 pb-12 sm:pb-16 lg:pb-20">
        {FOCUS_AREAS.map((area) => (
          <motion.div
            key={area.title}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <FocusArea {...area} />
          </motion.div>
        ))}
      </div>
    </>
  );
}