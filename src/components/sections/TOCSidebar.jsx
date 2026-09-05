"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function TOCSidebar({ sections }) {
  const [activeId, setActiveId] = useState(sections?.[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      className={cn(
        // mobile: horizontal scrolling pill bar, no sticky sidebar chrome
        "flex flex-row gap-2 overflow-x-auto pb-2 -mx-4 px-4",
        // md+: original sticky vertical sidebar
        "md:sticky md:top-28 md:flex-col md:gap-1 md:overflow-visible md:mx-0 md:px-0 md:border-r md:border-border-light md:pr-6"
      )}
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          aria-current={activeId === s.id ? "location" : undefined}
          className={cn(
            "text-sm py-2 px-3 rounded-control transition-colors whitespace-nowrap shrink-0 md:whitespace-normal md:shrink",
            activeId === s.id
              ? "text-maroon-deep font-semibold bg-maroon-deep/5"
              : "text-muted hover:text-maroon-deep"
          )}
        >
          {s.title}
        </a>
      ))}
    </nav>
  );
}