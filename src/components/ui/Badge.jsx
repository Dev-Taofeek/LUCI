import { cn } from "@/lib/utils";

const styles = {
  active: "bg-gold-light text-maroon-deep",
  upcoming: "bg-white border border-border-mid text-muted",
  completed: "bg-border-light text-muted",
};

const isActive = (status) => status === "active";

export default function Badge({ status = "active", children, className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-control px-3 py-1.5 text-xs font-semibold tracking-[0.05em]",
        styles[status] ?? styles.completed,
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          isActive(status) ? "bg-gold" : "bg-muted/50"
        )}
      />
      {children}
    </span>
  );
}