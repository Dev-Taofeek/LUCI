"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function HeroSection({
  variant = "image",
  image,
  eyebrow,
  title,
  subtitle,
  actions,
  minHeight = "min-h-[500px] sm:min-h-[560px] lg:min-h-[640px]",
}) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden ${minHeight} ${
        variant === "solid" ? "bg-maroon-deep py-16 sm:py-20 lg:py-24" : ""
      }`}
    >
      {variant === "image" && image && (
        <>
          {/* Background image */}
          <div className="absolute inset-0 scale-105">
            <Image
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover blur-[2px]"
            />
          </div>

          {/* Light maroon overlay */}
          <div className="absolute inset-0 bg-maroon-deep/45" />
        </>
      )}

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 container-luci flex flex-col items-center text-center gap-4 sm:gap-5 lg:gap-6 max-w-xl sm:max-w-2xl lg:max-w-3xl px-4 sm:px-6"
      >
        {eyebrow && (
          <motion.span
            variants={fadeInUp}
            className="text-warm-white/80 text-xs sm:text-sm font-semibold btn-tracking"
          >
            {eyebrow}
          </motion.span>
        )}

        <motion.h1
          variants={fadeInUp}
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            variants={fadeInUp}
            className="text-warm-white/90 text-sm sm:text-md max-w-md sm:max-w-xl lg:max-w-2xl font-thin"
          >
            {subtitle}
          </motion.p>
        )}

        {actions && (
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-6 pt-2 w-full sm:w-auto"
          >
            {actions}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}