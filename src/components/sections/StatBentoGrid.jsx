import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export function HeroStatCard({ value, label, delta }) {
  return (
    <div className="sm:col-span-2 bg-white border border-border-light rounded-[12px] p-6 sm:p-8 md:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col justify-end min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
      <span className="text-xs sm:text-sm font-semibold text-muted tracking-[0.05em] uppercase mb-2">
        {label}
      </span>
      <span className="font-display font-normal text-4xl sm:text-5xl md:text-6xl text-maroon-deep mb-3 sm:mb-4">
        {value}
      </span>
      <span className="flex items-center gap-2 text-sm text-muted">
        <TrendingUp size={16} className="shrink-0" /> {delta}
      </span>
    </div>
  );
}

export function StatCard({ value, label, variant = "white" }) {
  if (variant === "dark") {
    return (
      <div className="bg-maroon-deep rounded-[12px] p-6 sm:p-8 shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between h-full">
        <div />
        <div>
          <span className="font-display font-semibold text-2xl sm:text-3xl text-white block">
            {value}
          </span>
          <span className="text-white/80 text-sm sm:text-base">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-white border border-border-light rounded-[12px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] flex flex-col",
        variant === "compact"
          ? "p-6 sm:p-8 justify-center h-full"
          : "p-6 sm:p-8 items-center justify-center text-center h-full"
      )}
    >
      <span
        className={cn(
          "font-display font-semibold text-maroon-deep block",
          variant === "compact" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-muted",
          variant === "compact" ? "text-xs sm:text-sm uppercase tracking-[0.05em]" : "text-sm sm:text-base"
        )}
      >
        {label}
      </span>
    </div>
  );
}