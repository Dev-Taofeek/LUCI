"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Link2, Building2, Globe2, Flag, Eye, HeartHandshake } from "lucide-react";
import { IconCard } from "@/components/ui/Card";
import ProgressStep from "@/components/sections/ProgressStep";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import TeamMemberCard from "@/components/sections/TeamMemberCard";

const ABOUT_IMAGE =
  "/a-hero.webp";

const STEPS = [
  { icon: <Users size={24} />, label: "Family", state: "active" },
  { icon: <Link2 size={22} />, label: "Relationships", state: "inactive" },
  { icon: <Building2 size={22} />, label: "Community", state: "active" },
  { icon: <Globe2 size={22} />, label: "Society", state: "inactive" },
  { icon: <Flag size={22} />, label: "Nation", state: "highlight" },
];

const TEAM = [
  {
    name: "Amina Bello",
    role: "Founder & Executive Director",
    bio: "With over 15 years in social development, Amina founded LUCI to bridge gaps in community cohesion.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "David Ojo",
    role: "Director of Programmes",
    bio: "David oversees all grassroots initiatives, ensuring our educational and bridge-building work stays impactful.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
];

const PARTNERS = ["GlobalFund", "GreenEarth", "CareNet", "UN Dev"];

export default function AboutPage() {
  return (
    <>
      {/* 1. Who We Are — split hero (text left, image right) */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 pt-10 sm:pt-12 lg:pt-16 pb-10 sm:pb-12 lg:pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center max-w-container mx-auto"
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:gap-6 order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              Building Bridges,
              <br className="hidden sm:block" />
              {" "}Building Communities.
            </h1>
            <p className="text-sm sm:text-md font-thin">
              The Love, Unity, and Care Initiative (LUCI) is an NGO dedicated
              to fostering social cohesion through family and community
              building. We believe that strong, united families are the
              bedrock of a thriving, inclusive society.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <span className="bg-gold-light text-maroon-deep text-xs font-semibold btn-tracking rounded-md px-3 py-1">
                Est. 2010
              </span>
              <span className="bg-maroon-deep text-white text-xs font-semibold btn-tracking rounded-md px-3 py-1">
                Global Impact
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative h-[260px] sm:h-[360px] md:h-[420px] lg:h-[500px] w-full rounded-md overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] order-1 md:order-2"
          >
            <Image
              src={ABOUT_IMAGE}
              alt="LUCI community"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/40 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white section-padding flex justify-center relative overflow-hidden px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-container grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full relative z-10"
        >
          <motion.div variants={fadeInUp}>
            <IconCard
              icon={<Eye className="text-maroon-deep" size={20} />}
              title="Our Vision"
              description="A world where every community is united, every family is empowered, and diverse individuals coexist peacefully, driving sustainable societal growth."
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <IconCard
              icon={<HeartHandshake className="text-gold" size={20} />}
              title="Our Mission"
              description="To build relational bridges by providing resources, education, and support systems that strengthen families and promote inclusive community development."
              tint="gold"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Why We Exist — progressive flow */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="section-padding flex flex-col items-center gap-6 sm:gap-8 max-w-container mx-auto px-4 sm:px-6"
      >
        <motion.h2 variants={fadeInUp} className="text-center text-2xl sm:text-3xl lg:text-4xl">
          The Ripple Effect of Care
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-sm sm:text-md font-thin text-center max-w-2xl">
          We believe that societal transformation begins at home. By
          nurturing the smallest unit, we impact the whole.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="flex items-start justify-center flex-wrap gap-y-6 pt-4 sm:pt-6 w-full overflow-x-auto"
        >
          {STEPS.map((step, i) => (
            <ProgressStep key={step.label} {...step} isLast={i === STEPS.length - 1} />
          ))}
        </motion.div>
      </motion.section>

      {/* Leadership Team */}
      <section className="bg-white section-padding flex justify-center px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-container w-full flex flex-col gap-8 sm:gap-10 lg:gap-12"
        >
          <motion.h2 variants={fadeInUp} className="text-center text-2xl sm:text-3xl lg:text-4xl">
            Our Leadership
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl sm:max-w-none mx-auto">
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <TeamMemberCard {...member} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Partners Marquee */}
      <section className="bg-white border-t border-border-light px-4 sm:px-6 md:px-10 py-10 sm:py-12 flex justify-center">
        <div className="max-w-container w-full flex flex-col gap-6 sm:gap-8 items-center">
          <span className="text-xs sm:text-sm font-semibold text-muted btn-tracking uppercase text-center">
            Trusted By Our Partners
          </span>
          <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 opacity-60 flex-wrap">
            {PARTNERS.map((name) => (
              <span
                key={name}
                className="font-display font-bold text-lg sm:text-xl text-charcoal"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}