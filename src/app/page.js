"use client";

import HeroCarousel from "@/components/sections/HeroCarousel";
import Button from "@/components/ui/Button";

// /luci-logo1.png ... /luci-logo9.png (files live in /public)
const HERO_IMAGES = Array.from({ length: 9 }, (_, i) => `/luci-logo${i + 1}.png`);

export default function HomePage() {
  return (
    <>
      <HeroCarousel
        images={HERO_IMAGES}
        title="Sound Families make Sound Society and Sound Nation."
        subtitle={
          <>
            To promote and foster the well-being of <strong>THE FAMILY</strong> and the
            growing of commitment to the building of relational bridges of humanity{" "}
            <strong>FOR A BETTER SOCIETY</strong> and nation.
          </>
        }
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