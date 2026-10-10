"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Link2, Building2, Globe2, Flag, Eye, HeartHandshake } from "lucide-react";
import { IconCard } from "@/components/ui/Card";
import ProgressStep from "@/components/sections/ProgressStep";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import TeamMemberCard from "@/components/sections/TeamMemberCard";
import CorporateCatalystsCarousel from "@/components/sections/CorporateCatalystsCarousel";

const ABOUT_IMAGE = "/luci-emblem.png";

const STEPS = [
  { icon: <Users size={24} />, label: "Family", state: "active" },
  { icon: <Link2 size={22} />, label: "Relationships", state: "inactive" },
  { icon: <Building2 size={22} />, label: "Community", state: "active" },
  { icon: <Globe2 size={22} />, label: "Society", state: "inactive" },
  { icon: <Flag size={22} />, label: "Nation", state: "highlight" },
];

const TEAM = [
  {
    name: "Felix O. Omusi",
    role: "General Co-ordinator",
    bio: "General Co-ordinator of LUCI — Living Unity Core Initiative, making \"Beauty in Diversity\" work. Compiler of the LUCI Reflection: \"Unity: The Good News.\"",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* 1. Who We Are — split hero (text left, image right) */}
      <section className="container-luci py-10 sm:py-14 lg:py-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center"
        >
          <motion.div variants={fadeInUp} className="flex flex-col gap-4 sm:gap-6 order-2 md:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">
              Building Bridges,
              <br className="hidden sm:block" />
              {" "}Building Communities.
            </h1>
            <p className="text-sm sm:text-base">
              The Living Unity Core Initiative (LUCI) is a non-political,
              non-governmental organization dedicated to promoting and
              fostering beauty in diversity through family space. We believe
              that sound families make a sound society, and sound families
              make a sound nation.
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <span className="bg-gold-light text-maroon-deep text-xs font-semibold btn-tracking rounded-control px-3 py-1.5">
                Non-Political
              </span>
              <span className="bg-maroon-deep text-white text-xs font-semibold btn-tracking rounded-control px-3 py-1.5">
                Non-Governmental Organization
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="relative h-[260px] sm:h-[360px] md:h-[420px] lg:h-[500px] w-full rounded-card overflow-hidden order-1 md:order-2 bg-white border border-border-light"
          >
            <Image
              src={ABOUT_IMAGE}
              alt="LUCI — The Bridge Building Family Organization emblem"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 sm:p-6"
              priority
            />
          </motion.div>
        </motion.div>
      </section>


      {/* Vision & Mission */}
      <section className="bg-white section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="container-luci grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <motion.div variants={fadeInUp}>
            <IconCard
              icon={<Eye className="text-maroon-deep" size={20} />}
              title="Our Vision"
              description="So that we might fulfill our duty as leaven — families with a transcendental perspective, seeing beyond the horizon and naturally committing to fostering unity and charity."
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <IconCard
              icon={<HeartHandshake className="text-maroon-deep" size={20} />}
              title="Our Mission"
              description="Promoting and fostering beauty in diversity through family space to achieve better society and nation(s): A more perfect union."
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
        className="section-padding"
      >
        <div className="container-luci flex flex-col items-center gap-6 sm:gap-8">
          <motion.h2 variants={fadeInUp} className="text-center text-2xl sm:text-3xl lg:text-4xl">
            The Ripple Effect of Care
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-sm sm:text-base text-center max-w-2xl">
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
        </div>
      </motion.section>

      {/* Leadership Team */}
      <section className="bg-white section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="container-luci flex flex-col gap-8 sm:gap-10 lg:gap-12"
        >
          <motion.h2 variants={fadeInUp} className="text-center text-2xl sm:text-3xl lg:text-4xl">
            Our Leadership
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-2xl mx-auto sm:max-w-none">
            {TEAM.map((member) => (
              <motion.div key={member.name} variants={fadeInUp}>
                <TeamMemberCard {...member} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Partners Marquee */}
      <section className="bg-white border-t border-border-light py-10 sm:py-12">
        <div className="container-luci flex flex-col gap-6 sm:gap-8 items-center">
          <span className="text-xs sm:text-sm font-semibold text-muted btn-tracking uppercase text-center">
            Our Corporate Catalysts
          </span>
          <CorporateCatalystsCarousel />
        </div>
      </section>
    </>
  );
}