import { cn } from "@/lib/utils";

export function StatTile({ label, value, icon: Icon }) {
  return (
    <div className="bg-white border border-border-light rounded-card p-4 sm:p-5 md:p-6 flex items-center gap-3 sm:gap-4">
      {Icon && (
        <span className="bg-maroon-deep/10 rounded-full size-9 sm:size-10 md:size-11 flex items-center justify-center shrink-0">
          <Icon size={16} className="text-maroon-deep" />
        </span>
      )}
      <div className="min-w-0">
        <span className="font-display font-semibold text-xl sm:text-2xl md:text-3xl text-maroon-deep block truncate">
          {value}
        </span>
        <span className="text-xs sm:text-sm text-muted truncate block">{label}</span>
      </div>
    </div>
  );
}

const STATUS_STYLES = {
  ACTIVE: "bg-gold-light text-maroon-deep",
  UPCOMING: "bg-white border border-border-mid text-muted",
  COMPLETED: "bg-border-light text-muted",
  PUBLISHED: "bg-gold-light text-maroon-deep",
  DRAFT: "bg-border-light text-muted",
  PENDING: "bg-border-light text-muted",
  SUCCESS: "bg-gold-light text-maroon-deep",
  FAILED: "bg-maroon-deep/10 text-maroon-deep",
  NEW: "bg-gold-light text-maroon-deep",
  REVIEWED: "bg-white border border-border-mid text-muted",
  CONTACTED: "bg-white border border-border-mid text-muted",
  ONBOARDED: "bg-gold-light text-maroon-deep",
  OPEN: "bg-maroon-deep/10 text-maroon-deep",
  INVESTIGATING: "bg-white border border-border-mid text-muted",
  RESOLVED: "bg-gold-light text-maroon-deep",
};

export function StatusPill({ status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-[0.05em] whitespace-nowrap",
        STATUS_STYLES[status] || "bg-border-light text-muted"
      )}
    >
      {status}
    </span>
  );
}

export function AdminLoading({ label = "Loading" }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center py-16 sm:py-20"
    >
      <div className="relative size-12 sm:size-14">
        <span className="absolute -inset-2.5 rounded-full border border-maroon-deep/10" />
        <span
          className="absolute -inset-2.5 rounded-full border-2 border-transparent border-t-gold animate-spin"
          style={{ animationDuration: "2.4s", animationDirection: "reverse" }}
        />
        <span className="absolute inset-0 rounded-full border-2 border-border-light border-t-maroon-deep animate-spin" />
        <span className="absolute inset-0 m-auto size-2 rounded-full bg-maroon-deep" />
      </div>
      <p className="mt-5 flex items-center gap-2 text-sm font-medium text-muted">
        <span>{label}</span>
        <span className="inline-flex items-center gap-0.5" aria-hidden="true">
          <span
            className="size-1 rounded-full bg-maroon-deep/70 animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <span
            className="size-1 rounded-full bg-maroon-deep/70 animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="size-1 rounded-full bg-maroon-deep/70 animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
        </span>
      </p>
    </div>
  );
}