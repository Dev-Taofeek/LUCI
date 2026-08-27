import { cn } from "@/lib/utils";

export function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-semibold text-maroon-deep btn-tracking block mb-2"
    >
      {children}
    </label>
  );
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full bg-warm-white border border-border-mid rounded-control px-3 py-3 sm:px-4 sm:py-3.5 text-base text-charcoal placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep",
        className
      )}
      {...props}
    />
  );
}

export function Textarea({ className, rows = 5, ...props }) {
  return (
    <textarea
      rows={rows}
      className={cn(
        "w-full bg-warm-white border border-border-mid rounded-control px-3 py-3 sm:px-4 sm:py-3.5 text-base text-charcoal placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep",
        className
      )}
      {...props}
    />
  );
}

export function CheckboxChip({ label, ...props }) {
  return (
    <label className="flex items-center gap-2 border border-border-mid rounded-control p-2.5 min-w-[140px] flex-1 cursor-pointer hover:border-maroon-deep/40">
      <input
        type="checkbox"
        className="size-4 rounded border-border-mid text-maroon-deep focus:ring-maroon-deep/30 shrink-0"
        {...props}
      />
      <span className="text-sm text-charcoal">{label}</span>
    </label>
  );
}