import Image from "next/image";

export default function ParticipationSection({ icon, title, description, image, form }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
      <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6 order-1">
        <div className="bg-gold/10 rounded-full p-3 sm:p-4 w-fit shrink-0">{icon}</div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl leading-tight">{title}</h2>
        <p className="text-sm sm:text-md font-thin">{description}</p>
        {image && (
          <div className="relative h-48 sm:h-56 md:h-64 w-full rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
      <div className="md:col-span-7 order-2">{form}</div>
    </div>
  );
}