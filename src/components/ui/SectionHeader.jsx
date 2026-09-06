import { cn } from "@/lib/utils";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Standard section heading block: optional eyebrow chip, a consistent
 * h2 scale, and an optional subtitle. Used across the public site so every
 * section opens the same way.
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  align = "center",
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className="text-2xl leading-snug sm:text-3xl lg:text-4xl">{title}</h2>
      {subtitle && (
        <p className="max-w-2xl text-sm sm:text-base">{subtitle}</p>
      )}
    </div>
  );
}