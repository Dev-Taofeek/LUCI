"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Our Mission", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Impact", href: "/impact" },
  { label: "Resources", href: "/resources" },
];

export default function TopNavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent background scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-white/90 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="container-luci h-16 sm:h-18 lg:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-2xl sm:text-[28px] font-semibold text-maroon-deep shrink-0"
        >
          LUCI
        </Link>

        {/* Desktop nav — only from lg up, so tablets don't get squeezed */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href) && link.href !== "/";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm xl:text-base px-2 py-1 rounded transition-colors whitespace-nowrap",
                  active
                    ? "text-maroon-deep font-bold border-b-2 border-maroon-deep"
                    : "text-muted hover:text-maroon-deep"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <Button variant="secondary" href="/programmes" className="px-4 xl:px-6 py-2.5 xl:py-3 text-sm whitespace-nowrap">
            Explore Our Work
          </Button>
          <Button variant="primary" href="/donate" className="px-4 xl:px-6 py-2.5 xl:py-3 text-sm whitespace-nowrap">
            Support LUCI
          </Button>
        </div>

        {/* Menu trigger — visible on mobile AND tablet now */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-maroon-deep p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6l-12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu panel — mobile: full-width stack. Tablet (sm+): centered card-like panel */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out bg-warm-white border-t border-border-light",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-luci px-4 sm:px-6">
          <nav className="flex flex-col gap-1 py-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:py-6">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href) && link.href !== "/";
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-base px-3 py-3 rounded-control transition-colors",
                    active
                      ? "text-maroon-deep font-bold bg-maroon-deep/5"
                      : "text-muted hover:text-maroon-deep hover:bg-maroon-deep/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col sm:flex-row gap-3 pb-6 pt-2 sm:pt-0">
            <Button variant="secondary" href="/programmes" className="w-full sm:w-auto sm:flex-1 justify-center py-3 text-sm">
              Explore Our Work
            </Button>
            <Button variant="primary" href="/get-involved#donate" className="w-full sm:w-auto sm:flex-1 justify-center py-3 text-sm">
              Support LUCI
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}