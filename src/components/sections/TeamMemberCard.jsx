import Image from "next/image";

export default function TeamMemberCard({ image, name, role, bio }) {
  return (
    <div className="bg-white border border-border-mid rounded-card overflow-hidden flex flex-col h-full">
      <div className="relative h-48 sm:h-56 md:h-64 w-full bg-border-light flex items-center justify-center">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <span className="font-display text-5xl sm:text-6xl font-semibold text-maroon-deep/20 select-none">
            {name.split(" ").map((n) => n[0]).join("")}
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col items-center text-center gap-1">
        <h3 className="text-maroon-deep text-lg sm:text-xl md:text-2xl">{name}</h3>

        <span className="text-sm font-semibold text-maroon-deep btn-tracking">
          {role}
        </span>

        <p className="text-sm text-muted pt-4">{bio}</p>
      </div>
    </div>
  );
}