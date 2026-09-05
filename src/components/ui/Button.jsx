import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center rounded-control font-sans font-semibold text-sm btn-tracking transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none";

const size = "px-5 py-3 sm:px-7";

const variants = {
  primary: cn(
    "bg-maroon-deep text-white hover:bg-maroon-dark",
    size
  ),
  secondary: cn(
    "border border-maroon-deep text-maroon-deep bg-transparent hover:bg-maroon-deep/5",
    size
  ),
  accent: cn(
    "bg-gold text-charcoal hover:bg-maroon-deep hover:text-white",
    size
  ),
  accentOutline: cn(
    "border-2 border-gold/80 text-white bg-transparent hover:bg-gold/10",
    size
  ),
  outlineOnDark: cn(
    "border border-white text-white bg-transparent hover:bg-white/10",
    size
  ),
  lightSolid: cn(
    "bg-warm-white text-maroon-deep hover:bg-white",
    size
  ),
  accentWhite: cn(
    "bg-gold text-charcoal hover:bg-white hover:text-maroon-deep",
    size
  ),
  pillActive: "bg-maroon-deep text-white rounded-full px-5 py-2 cursor-default",
  pillInactive: cn(
    "bg-white text-muted border border-border-mid rounded-full px-5 py-2 hover:border-maroon-deep/40 hover:text-maroon-deep",
  ),
  ghost: "text-muted hover:text-maroon-deep py-1",
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