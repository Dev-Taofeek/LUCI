import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center font-sans font-semibold text-sm btn-tracking transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-maroon-deep text-white rounded-control px-6 py-3 sm:px-8 sm:py-4 hover:bg-maroon-dark shadow-[0_1px_1px_rgba(0,0,0,0.05)]",
  secondary:
    "border border-maroon-deep text-maroon-deep rounded-control px-6 py-3 sm:px-8 sm:py-4 bg-transparent hover:bg-maroon-deep/5",
  accent:
    "bg-gold text-white rounded-control px-6 py-3 sm:px-8 sm:py-4 hover:bg-gold/90 shadow-[0_1px_1px_rgba(0,0,0,0.05)]",
  accentOutline:
    "border-2 border-gold text-white rounded-control px-6 py-3 sm:px-8 sm:py-4 bg-transparent hover:bg-gold/10",
  pillActive: "bg-maroon-deep text-white rounded-full px-5 py-2 sm:px-6 text-sm font-normal",
  pillInactive:
    "bg-white text-muted border border-border-mid rounded-full px-5 py-2 sm:px-6 text-sm font-normal hover:border-maroon-deep/40",
  ghost: "text-muted hover:text-maroon-deep px-2 py-1 rounded",
  outlineOnDark:
    "border border-white text-white rounded-control px-6 py-3 sm:px-8 sm:py-4 bg-transparent hover:bg-white/10",
  lightSolid:
    "bg-warm-white text-maroon-deep rounded-control px-6 py-3 sm:px-8 sm:py-4 hover:bg-white",
};

export default function Button({
  variant = "primary",
  href,
  as,
  className,
  children,
  ...props
}) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const Component = as || "button";
  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}