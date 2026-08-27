import { cn } from "@/lib/utils";

// was: gold #fed65b (Active) / bordered white (Upcoming) / gray #e2e2e2 (Completed)
const styles = {
  active: "bg-gold-light text-maroon-deep",
  upcoming: "bg-white border border-border-mid text-muted",
  completed: "bg-border-light text-muted",
};

export default function Badge({ status = "active", children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.05em]",
        styles[status],
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          status === "active" ? "bg-gold" : "bg-muted/50"
        )}
      />
      {children}
    </span>
  );
}