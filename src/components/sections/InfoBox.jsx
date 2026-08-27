import Image from "next/image";

// was bg #f3f3f3 / border #e2e2e2 -> warm-white / border-light
export function InfoBox({ icon, title, children }) {
  return (
    <div className="flex-1 bg-warm-white border border-border-light rounded-[12px] p-5 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6 min-w-0">
      <div className="flex items-center gap-3">
        <span className="shrink-0">{icon}</span>
        <h3 className="text-maroon-deep text-lg sm:text-xl md:text-2xl">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function ObjectivesList({ items }) {
  return (
    <ul className="flex flex-col gap-3 sm:gap-4">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm sm:text-base text-muted">
          <span className="text-gold mt-1 shrink-0">✓</span>
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function TagRow({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-white border border-border-mid rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}