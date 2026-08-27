"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function CTASection({ title, subtitle, actions }) {
  return (
    <section className="bg-maroon-deep py-10 sm:py-12 flex justify-center px-4 sm:px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-xl sm:max-w-2xl lg:max-w-3xl flex flex-col items-center text-center gap-3 sm:gap-4"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-white text-2xl sm:text-3xl lg:text-4xl leading-snug"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            variants={fadeInUp}
            className="text-warm-white/80 text-base sm:text-lg"
          >
            {subtitle}
          </motion.p>
        )}
        {actions && (
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 pt-1 w-full sm:w-auto"
          >
            {actions}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}