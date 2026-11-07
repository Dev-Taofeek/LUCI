"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import CTASection from "@/components/sections/CTASection";
import { IconCard } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Eye, HeartHandshake } from "lucide-react";

const HERO_IMAGE = "/luci-logo.png";

export default function HomePage() {
  return (
    <>
      <HeroSection
        image={HERO_IMAGE}
        title="Sound Families make Sound Society and Sound Nation."
subtitle={
  <>
    To promote and foster the well-being of <strong>THE FAMILY</strong> and the growing of
    commitment to the building of relational bridges of humanity <strong>FOR A BETTER SOCIETY</strong> and nation.
  </>
}
        minHeight="min-h-[500px] sm:min-h-[560px] lg:min-h-[640px]"
        actions={
          <>
            <Button variant="primary" href="/programmes" className="w-full sm:w-auto">
              Explore Our Work
            </Button>
            <Button variant="accent" href="/donate" className="w-full sm:w-auto">
              Support LUCI
            </Button>
          </>
        }
      />
    </>
  );
}