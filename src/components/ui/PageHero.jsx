"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Eyebrow from "@/components/ui/Eyebrow";
import { fadeInUp, staggerContainer } from "@/lib/motion";

/**
 * Standard interior-page hero. `tone` switches between a maroon band
 * (`dark`) and a light band with a bottom border (`light`). Every
 * subpage opens with the same centered header so the hierarchy between
 * pages stays consistent.
 */
export default function PageHero({
  tone = "light",
  eyebrow,
  icon,
  title,
  subtitle,
  children,
  className,
}) {
  const isDark = tone === "dark";

  return (
    <section
      className={cn(
        isDark ? "bg-maroon-deep" : "bg-white border-b border-border-light",
        className
      )}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="container-luci mx-auto flex w-full max-w-2xl flex-col items-center gap-4 py-12 text-center sm:max-w-3xl sm:gap-5 sm:py-16 md:py-20"
      >
        {eyebrow && (
          <motion.span variants={fadeInUp}>
            <Eyebrow tone={isDark ? "dark" : "light"} icon={icon}>
              {eyebrow}
            </Eyebrow>
          </motion.span>
        )}

        <motion.h1
          variants={fadeInUp}
          className={cn("text-3xl leading-tight sm:text-4xl md:text-5xl", isDark && "text-white")}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={fadeInUp}
            className={cn("max-w-xl text-sm sm:max-w-2xl sm:text-base", isDark && "text-white/90")}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            variants={fadeInUp}
            className="flex w-full flex-col items-center justify-center gap-3 pt-1 sm:flex-row sm:flex-wrap sm:gap-4"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}