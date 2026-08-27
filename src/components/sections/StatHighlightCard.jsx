export default function StatHighlightCard({ title = "Our Impact", stats }) {
  return (
    <div className="relative bg-maroon-deep rounded-card overflow-hidden p-6 sm:p-7 md:p-8 flex flex-col gap-4 sm:gap-5 w-full shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="absolute -right-8 -top-8 sm:-right-10 sm:-top-10 size-24 sm:size-28 md:size-32 rounded-full bg-maroon-dark opacity-50" />
      <h3 className="text-white text-xl sm:text-2xl relative z-10">{title}</h3>
      <div className="flex flex-col gap-4 sm:gap-5 relative z-10 min-w-0">
        {stats.map((stat, i) => (
          <div key={stat.label} className="min-w-0">
            <div className="flex flex-col gap-1">
              <span className="font-display font-semibold text-3xl sm:text-4xl text-gold break-words">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-white break-words">
                {stat.label}
              </span>
            </div>
            {i < stats.length - 1 && (
              <div className="h-px bg-maroon-dark w-full mt-4 sm:mt-5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}