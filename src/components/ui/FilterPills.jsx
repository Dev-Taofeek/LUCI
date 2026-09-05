import { cn } from "@/lib/utils";

/**
 * Row of toggle pills for filtering list pages. Scrolls horizontally on
 * mobile, wraps on larger screens.
 */
export default function FilterPills({ filters, active, onChange, className }) {
  return (
    <div
      className={cn(
        "flex flex-nowrap sm:flex-wrap gap-2 sm:gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto sm:overflow-visible",
        className
      )}
    >
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={active === filter}
          onClick={() => onChange(filter)}
          className={cn(
            "rounded-control border px-4 sm:px-5 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors",
            active === filter
              ? "bg-maroon-deep border-maroon-deep text-white"
              : "bg-white border-border-mid text-muted hover:border-maroon-deep/40 hover:text-maroon-deep"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}