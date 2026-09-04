"use client";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { ContactInfoCard, MapCard } from "@/components/sections/ContactInfoCard";
import ContactForm from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center pb-12 sm:pb-16 md:pb-20">
      {/* Hero */}
      <section className="relative max-w-container w-full px-4 sm:px-6 py-12 sm:py-16 md:py-20 flex justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="size-[320px] sm:size-[450px] md:size-[600px] rounded-full bg-gold blur-[60px] sm:blur-[80px]" />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center text-center gap-3 sm:gap-4 max-w-xl sm:max-w-2xl"
        >
          <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl leading-tight">
            Get in Touch
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-sm sm:text-md font-thin">
            We&apos;re here to listen, collaborate, and support our
            community. Reach out to us through any of our channels.
          </motion.p>
        </motion.div>
      </section>

      {/* Bento grid: contact info + map / form */}
      <section className="max-w-container w-full px-4 sm:px-6 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-6">
        <div className="md:col-span-5 flex flex-col gap-5 sm:gap-6 order-2 md:order-1">
          <ContactInfoCard />
          <MapCard />
        </div>
        <div className="md:col-span-7 order-1 md:order-2">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}