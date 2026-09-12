import { cn } from "@/lib/utils";

/**
 * Small uppercase section label with a gold outline chip. `tone`
 * switches between the light (maroon text on pale bg) and dark
 * (white text on maroon band) variants.
 */
export default function Eyebrow({ children, icon, tone = "light", className }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-control border border-gold/25 bg-gold/10 px-4 py-1.5 text-xs font-semibold btn-tracking uppercase sm:px-6 sm:py-2 sm:text-sm",
        tone === "dark" ? "text-white" : "text-maroon-deep",
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}