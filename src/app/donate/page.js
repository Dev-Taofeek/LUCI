"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, HeartHandshake } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import DonationForm from "@/components/sections/DonationForm";

const IMPACT_STATS = [
  { value: "$25", label: "Provides school supplies for one child for a term" },
  { value: "$50", label: "Funds a family counseling session" },
  { value: "$100", label: "Sponsors a community health outreach day" },
];

export default function DonatePage() {
  return (
    <div className="flex flex-col items-center pb-12 sm:pb-16 md:pb-20">
      {/* Hero */}
      <section className="w-full bg-maroon-deep px-4 sm:px-6 py-12 sm:py-16 md:py-20 flex justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-xl sm:max-w-2xl flex flex-col items-center text-center gap-4 sm:gap-6"
        >
          <motion.span
            variants={fadeInUp}
            className="bg-gold/10 border border-gold/20 text-white text-xs sm:text-sm font-semibold btn-tracking rounded-full px-4 sm:px-6 py-1.5 sm:py-2 flex items-center gap-2"
          >
            <HeartHandshake size={16} className="shrink-0" /> Support LUCI
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="text-white text-3xl sm:text-4xl md:text-5xl leading-tight"
          >
            Your Gift Builds Bridges
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-white/90 text-base sm:text-lg">
            Every donation directly funds our family development, community,
            and youth programmes. Choose a one-time gift or become a monthly
            supporter of our mission.
          </motion.p>
        </motion.div>
      </section>

      {/* Form + impact context */}
      <section className="max-w-container w-full px-4 sm:px-6 py-10 sm:py-14 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12">
        <div className="md:col-span-5 flex flex-col gap-6 sm:gap-8 order-2 md:order-1">
          <div className="flex flex-col gap-3 sm:gap-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
              Where Your Money Goes
            </h2>
            <p className="text-base sm:text-lg">
              We believe in full transparency. Here&apos;s a sense of what
              your contribution makes possible.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {IMPACT_STATS.map((stat) => (
              <div
                key={stat.value}
                className="bg-white border border-border-light rounded-[12px] p-4 sm:p-5 md:p-6 flex items-center gap-4 sm:gap-6"
              >
                <span className="font-display font-semibold text-2xl sm:text-3xl text-maroon-deep shrink-0">
                  {stat.value}
                </span>
                <span className="text-sm sm:text-base text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-muted pt-2">
            <ShieldCheck size={18} className="text-gold shrink-0" />
            <span>
              Read our{" "}
              <Link
                href="/donation-policy"
                className="text-maroon-deep font-semibold hover:text-maroon-dark"
              >
                Donation Policy
              </Link>{" "}
              for details on how contributions are processed and allocated.
            </span>
          </div>
        </div>
        <div className="md:col-span-7 order-1 md:order-2">
          <DonationForm />
        </div>
      </section>
    </div>
  );
}