import Image from "next/image";
import { cn } from "@/lib/utils";
import { MAP_PINS } from "@/lib/data/impact";

const MAP_IMAGE =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1400&auto=format&fit=crop";

export default function GeoFootprintMap() {
  return (
    <div className="relative h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] w-full bg-white border border-border-light rounded-md overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <Image
        src={MAP_IMAGE}
        alt="Map of LUCI's operating regions"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover opacity-80"
      />
      {MAP_PINS.map((pin) => (
        <div
          key={pin.name}
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{ top: pin.top, left: pin.left }}
          title={pin.name}
        >
          {pin.highlighted && (
            <span className="absolute rounded-md border-2 border-maroon-deep size-5 sm:size-6" />
          )}
          <span
            className={cn(
              "rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
              pin.type === "hub" ? "bg-gold size-3 sm:size-4" : "bg-maroon-deep size-2.5 sm:size-3"
            )}
          />
        </div>
      ))}
    </div>
  );
}