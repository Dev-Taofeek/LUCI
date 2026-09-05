import { cn } from "@/lib/utils";

export default function ProgressStep({ icon, label, state = "active", isLast }) {
  const circleStyles = {
    active: "bg-maroon-deep text-white",
    inactive: "bg-white border border-border-mid text-muted",
    highlight: "bg-gold text-charcoal",
  };

  return (
    <div className="flex items-center shrink-0">
      <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4 w-14 sm:w-16 md:w-20">
        <div
          className={cn(
            "size-12 sm:size-16 md:size-20 rounded-full flex items-center justify-center shrink-0",
            circleStyles[state]
          )}
        >
          {icon}
        </div>
        <span className="text-xs sm:text-sm font-semibold text-maroon-deep btn-tracking text-center leading-tight">
          {label}
        </span>
      </div>
      {!isLast && (
        <div className="w-5 sm:w-8 md:w-10 h-px bg-border-mid mx-1 sm:mx-2 mb-5 sm:mb-6 md:mb-7 shrink-0" />
      )}
    </div>
  );
}