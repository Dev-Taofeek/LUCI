import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center rounded-control font-sans font-semibold text-sm btn-tracking transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none";

const size = "px-5 py-3 sm:px-7";

const variants = {
  primary: "bg-maroon-deep text-white hover:bg-maroon-dark",
  secondary:
    "border border-maroon-deep text-maroon-deep bg-transparent hover:bg-maroon-deep/5",
  accent: "bg-gold text-charcoal hover:bg-maroon-deep hover:text-white",
  accentOutline: "border-2 border-gold/80 text-white bg-transparent hover:bg-gold/10",
  outlineOnDark: "border border-white text-white bg-transparent hover:bg-white/10",
  lightSolid: "bg-warm-white text-maroon-deep hover:bg-white",
  accentWhite: "bg-gold text-charcoal hover:bg-white hover:text-maroon-deep",
};

function isExternal(href) {
  return typeof href === "string" && (href.startsWith("http://") || href.startsWith("https://"));
}

export default function Button({
  variant = "primary",
  href,
  as,
  className,
  children,
  target,
  rel,
  ...props
}) {
  const classes = cn(base, variants[variant], size, className);

  if (href) {
    const linkTarget = target || (isExternal(href) ? "_blank" : undefined);
    const linkRel = rel || (linkTarget === "_blank" ? "noopener noreferrer" : undefined);

    return (
      <Link href={href} className={classes} target={linkTarget} rel={linkRel} {...props}>
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