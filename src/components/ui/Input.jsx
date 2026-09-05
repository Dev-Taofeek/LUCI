import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-charcoal block mb-1.5">
      {children}
    </label>
  );
}

const controlBase =
  "w-full bg-white border border-border-mid rounded-control px-3.5 py-3 text-base text-charcoal placeholder:text-muted/70 focus:outline-none focus:ring-2 focus:ring-maroon-deep/25 focus:border-maroon-deep transition-colors";

export function Input({ className, ...props }) {
  return <input className={cn(controlBase, className)} {...props} />;
}

export function SearchInput({ placeholder = "Search...", className, ...props }) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="search"
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(controlBase, "pl-11 pr-4", className)}
        {...props}
      />
    </div>
  );
}

export function Textarea({ className, rows = 5, ...props }) {
  return (
    <textarea rows={rows} className={cn(controlBase, "resize-y", className)} {...props} />
  );
}

export function Select({ className, children, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(controlBase, "appearance-none pr-10 cursor-pointer", className)}
        {...props}
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-muted"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

export function CheckboxChip({ label, ...props }) {
  return (
    <label className="flex items-center gap-2.5 border border-border-mid rounded-control px-3 py-2.5 min-w-[140px] flex-1 cursor-pointer hover:border-maroon-deep/40 focus-within:border-maroon-deep transition-colors">
      <input
        type="checkbox"
        className="size-4 rounded border-border-mid text-maroon-deep focus:ring-maroon-deep/30 shrink-0"
        {...props}
      />
      <span className="text-sm text-charcoal">{label}</span>
    </label>
  );
}