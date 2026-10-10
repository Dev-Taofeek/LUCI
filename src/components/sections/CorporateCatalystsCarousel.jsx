const PARTNERS = [
  "Lagos Business School",
  "Pan-Atlantic University",
  "University of Navarra",
  "The Lagoon School",
  "Whitesands School",
];

export default function CorporateCatalystsCarousel() {
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <div
      className="marquee-fade overflow-hidden w-full"
      aria-label="Our corporate catalysts"
    >
      <div className="marquee-track flex items-center gap-6 sm:gap-8 md:gap-12 w-max">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="marquee-item font-display font-bold text-lg sm:text-xl text-muted hover:text-black transition-colors duration-300 whitespace-nowrap cursor-default"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
