export default function StrategyStep({ icon, title, description }) {
  return (
    <div className="flex-1 min-w-[140px] flex flex-col items-center text-center gap-2">
      <div className="size-12 sm:size-14 md:size-16 rounded-full bg-maroon-deep text-white flex items-center justify-center shadow-[0_1px_1px_rgba(0,0,0,0.05)] mb-2">
        {icon}
      </div>
      <h4 className="text-charcoal text-lg sm:text-xl md:text-[22px]">{title}</h4>
      <p className="text-sm font-thin">{description}</p>
    </div>
  );
}