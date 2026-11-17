"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function AboutPage() {
  return (
    <>
      {/* Mission & Vision */}
      <section className="bg-white section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="container-luci flex flex-col gap-12 md:gap-16"
        >
          {/* MISSION: circle image left, text right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              className="relative mx-auto w-full max-w-[420px] aspect-square rounded-full overflow-hidden border-4 border-maroon-deep"
            >
              <Image
                src="/luci-logo1.png"
                alt="Families of diverse Nigerian cultures seated together"
                fill
                sizes="(min-width: 768px) 420px, 90vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div variants={fadeInUp} className="md:text-right">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-deep uppercase tracking-wide">
                Mission
              </h2>
              <p className="mt-3 text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-maroon-deep leading-relaxed">
                Promoting and fostering beauty in diversity through family space
                to achieve better society and nation: a more perfect union.
              </p>
              <p className="mt-6 text-sm sm:text-base text-gray-800 leading-8 text-justify">
                As families lending conscious commitment and co-operation to
                building and supporting relational bridges of humanity as:
                &ldquo;fullness of our creation&rdquo; and giving depth and
                meaning to living; using the instrumentality of strengthened
                human, physical and material structures as tools to achieving a
                better society and nation.
              </p>
            </motion.div>
          </div>

          {/* VISION: text left, photo right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              variants={fadeInUp}
              className="order-2 md:order-1 md:self-center"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-maroon-deep uppercase tracking-wide">
                Vision
              </h2>
              <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.18em] text-gray-500">
                To become a world-inspiring beacon of unity:
              </p>
              <p className="mt-2 text-base sm:text-lg italic font-semibold text-gray-600">
                &ldquo;So that we might fulfill our duty as leaven...&rdquo;
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="order-1 md:order-2 relative w-full aspect-[4/3] overflow-hidden"
            >
              <Image
                src="/luci-logo3.png"
                alt="A person seated on a mountain peak above the clouds"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>
    </>
  );
}