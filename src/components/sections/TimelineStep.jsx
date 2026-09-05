// was numbered circle bg alternating #00342b/#735c00/#43261b -> all maroon-deep for consistency
export default function TimelineStep({ number, title, description, isLast }) {
  return (
    <div className="flex gap-3 sm:gap-4 md:gap-6">
      <div className="flex flex-col items-center shrink-0">
        <div className="size-8 sm:size-9 md:size-10 rounded-full bg-maroon-deep text-white flex items-center justify-center text-xs sm:text-sm font-semibold btn-tracking shrink-0">
          {number}
        </div>
        {!isLast && <div className="w-px flex-1 bg-border-mid my-2" />}
      </div>
      <div className="pb-6 sm:pb-7 md:pb-8 min-w-0">
        <h4 className="text-base font-semibold text-charcoal mb-1.5 sm:mb-2">{title}</h4>
        <p className="text-sm break-words text-muted">{description}</p>
      </div>
    </div>
  );
}