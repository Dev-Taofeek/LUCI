"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Programme index that follows the reader down the section so it is always
 * on screen, and glides into place instead of snapping.
 *
 * It is moved with a transform (eased by CSS), so there is no jump when it
 * starts following and no overlap when the section ends. It also works when a
 * parent has overflow set.
 *
 * - Mobile/tablet: bar under the site header, swipe sideways.
 * - Desktop (lg+): vertical list in its own column.
 *
 * `offset` / `lgOffset` = site header height + the breathing room you want
 * between the header and the nav (px).
 */
export default function ProgrammeNav({
  programmes,
  boundaryId,
  offset = 80, // 64px header + 16px gap
  lgOffset = 112, // 96px header + 16px gap
}) {
  const placeholderRef = useRef(null);
  const navRef = useRef(null);
  const [active, setActive] = useState(programmes[0]?.id);
  const [shift, setShift] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const placeholder = placeholderRef.current;
      const nav = navRef.current;
      const boundary = document.getElementById(boundaryId);
      if (!placeholder || !nav || !boundary) return;

      const topOffset = window.innerWidth >= 1024 ? lgOffset : offset;
      const navHeight = nav.offsetHeight;
      const slotTop = placeholder.getBoundingClientRect().top;
      const sectionBottom = boundary.getBoundingClientRect().bottom;

      // Distance needed to hold the nav at topOffset, stopping before the section ends
      const wanted = topOffset - slotTop;
      const max = sectionBottom - slotTop - navHeight - 48;
      setShift(Math.round(Math.max(0, Math.min(wanted, max))));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [boundaryId, offset, lgOffset]);

  // Highlight the programme currently in view
  useEffect(() => {
    const sections = programmes
      .map((p) => document.getElementById(p.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [programmes]);

  const goTo = (event, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div ref={placeholderRef} className="relative z-30">
      <nav
        ref={navRef}
        aria-label="Programmes"
        style={{ transform: `translate3d(0, ${shift}px, 0)` }}
        className={cn(
          "rounded-card border border-border-mid bg-white",
          "transition-[transform,box-shadow] duration-500 ease-out motion-reduce:transition-none",
          shift > 0 ? "shadow-lg" : "shadow-none"
        )}
      >
        <ol className="flex gap-2 overflow-x-auto p-2 lg:flex-col lg:gap-0 lg:divide-y lg:divide-border-mid lg:overflow-visible lg:p-0">
          {programmes.map((p, i) => {
            const isActive = active === p.id;
            return (
              <li key={p.id} className="shrink-0 lg:shrink">
                <a
                  href={`#${p.id}`}
                  onClick={(e) => goTo(e, p.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "flex gap-2 whitespace-nowrap rounded-control px-3 py-2 text-sm transition-colors duration-300 lg:gap-3 lg:whitespace-normal lg:rounded-none lg:px-4 lg:py-3",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-deep",
                    isActive
                      ? "bg-maroon-deep text-white"
                      : "text-maroon-deep hover:bg-gold-light/40"
                  )}
                >
                  <span className="font-display font-semibold">{i + 1}.</span>
                  <span>{p.title}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}