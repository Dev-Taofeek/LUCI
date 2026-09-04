import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center rounded-md font-sans font-semibold text-sm btn-tracking transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-maroon-deep text-white px-6 py-3 sm:px-8 sm:py-4 hover:bg-maroon-dark shadow-[0_1px_1px_rgba(0,0,0,0.05)] rounded-md",
  secondary:
    "border border-maroon-deep text-maroon-deep px-6 py-3 sm:px-8 sm:py-4 bg-transparent hover:bg-maroon-deep/5 rounded-md",
  accent:
    "bg-gold text-white px-6 py-3 sm:px-8 sm:py-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] hover:bg-maroon-deep transition-all ease-in-out duration-300 rounded-md",
  accentOutline:
    "border-2 border-gold text-white px-6 py-3 sm:px-8 sm:py-4 bg-transparent hover:bg-gold/10 rounded-md",
  pillActive: "bg-maroon-deep text-white rounded-full px-5 py-2 sm:px-6 text-sm font-normal rounded-md",
  pillInactive:
    "bg-white text-muted border border-border-mid rounded-full px-5 py-2 sm:px-6 text-sm font-normal hover:border-maroon-deep/40 rounded-md",
  ghost: "text-muted hover:text-maroon-deep px-2 py-1 rounded rounded-md",
  outlineOnDark:
    "border border-white rounded-md text-white px-6 py-3 sm:px-8 sm:py-4 bg-transparent hover:bg-white/10 rounded-md",
  lightSolid:
    "bg-warm-white text-maroon-deep px-6 py-3 sm:px-8 sm:py-4 hover:bg-white rounded-md",
  accentWhite:
    "bg-gold text-white px-6 py-3 sm:px-8 sm:py-4 hover:bg-gold/90 shadow-[0_1px_1px_rgba(0,0,0,0.05)] hover:bg-white hover:text-maroon-deep transition-all ease-in-out duration-300 rounded-md",
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