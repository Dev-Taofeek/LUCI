export default function StrategyStep({ icon, title, description }) {
  return (
    <div className="flex-1 min-w-[140px] flex flex-col items-center text-center gap-2">
      <div className="size-12 sm:size-14 md:size-16 rounded-full bg-maroon-deep text-white flex items-center justify-center mb-2">
        {icon}
      </div>
      <h4 className="text-charcoal text-lg sm:text-xl">{title}</h4>
      <p className="text-sm text-muted max-w-[220px]">{description}</p>
    </div>
  );
}