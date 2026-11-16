"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDE_DURATION = 1.1; // seconds for a new image to slide in and cover the old one

export default function HeroCarousel({
  images,
  title,
  subtitle,
  actions,
  interval = 5000, // ms each image stays on screen before auto-advancing
}) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = images.length;

  // True only for the very first slide (page load): no sliding, text starts almost immediately
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);
  const isFirst = isFirstRender.current;

  // Infinite: modulo wraps 9 -> 1 and 1 -> 9
  const paginate = useCallback(
    (dir) => setIndex((i) => (i + dir + total) % total),
    [total]
  );

  // Auto-play: moves on `interval` ms after the current image appeared.
  // Never paused by hover/focus. A manual change restarts the countdown.
  useEffect(() => {
    if (total < 2) return;
    const id = setTimeout(() => paginate(1), interval);
    return () => clearTimeout(id);
  }, [index, interval, total, paginate]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") paginate(1);
    if (e.key === "ArrowLeft") paginate(-1);
  };

  // Text rises from the bottom, one element after another, but only AFTER
  // the new image has finished sliding in and covered the previous slide.
  const textDelay = isFirst ? 0.25 : SLIDE_DURATION + 0.1;

  const textContainer = {
    hidden: {},
    show: {
      transition: {
        delayChildren: textDelay,
        staggerChildren: reduceMotion ? 0.05 : 0.18,
      },
    },
  };
  const textItem = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 48 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      // Fills the entire screen. The negative top margin cancels the space the layout
      // reserves for the navbar (pt-16 / lg:pt-20), so no white strip shows above the image.
      className="-mt-16 lg:-mt-20 flex h-svh min-h-[480px] w-full flex-col"
      onKeyDown={onKeyDown}
      aria-roledescription="carousel"
      aria-label="LUCI highlights"
    >
      <motion.div
        className="relative flex min-h-0 flex-1 touch-pan-y items-center overflow-hidden bg-black"
        onPanEnd={(_, info) => {
          // swipe / drag to navigate
          if (info.offset.x > 80) paginate(-1);
          else if (info.offset.x < -80) paginate(1);
        }}
      >
        {/*
          Each slide = image + overlay + its own text.
          The old slide stays completely still (text included) until the new
          slide has slid in from the right and covered it. Then the new
          slide's text rises in.
        */}
        <AnimatePresence>
          <motion.div
            key={index}
            initial={isFirst ? false : reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            // Near-invisible change that keeps the old slide mounted while the new one covers it
            exit={{ opacity: 0.99, transition: { duration: SLIDE_DURATION } }}
            transition={{ duration: SLIDE_DURATION, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-0 flex items-center"
          >
            {/* Background image: slow, constant zoom-out that runs the whole time an
                image is on screen (linear, so it never visibly slows or stops) */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: reduceMotion ? 1 : 1.12 }}
              animate={{ scale: 1 }}
              transition={{
                duration: interval / 1000 + SLIDE_DURATION + 1,
                ease: "linear",
              }}
            >
              <Image
                src={images[index]}
                alt=""
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>

            {/* Overlay for text legibility */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

            {/* Text */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <motion.div
                variants={textContainer}
                initial="hidden"
                animate="show"
                className="max-w-2xl text-white"
              >
                <motion.h1
                  variants={textItem}
                  className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
                  style={{ color: "#fff" }}
                >
                  {title}
                </motion.h1>
                {subtitle && (
                  <motion.p
                    variants={textItem}
                    className="mt-5 text-base font-bold leading-relaxed text-white sm:text-lg"
                    style={{ color: "#fff" }}
                  >
                    {subtitle}
                  </motion.p>
                )}
                {actions && (
                  <motion.div
                    variants={textItem}
                    className="mt-8 flex flex-col gap-3 sm:flex-row"
                  >
                    {actions}
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation — on the image */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-4"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/35 p-2 text-white backdrop-blur-sm transition hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-4"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}