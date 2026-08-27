import Image from "next/image";

export default function TeamMemberCard({ image, name, role, bio }) {
  return (
    <div className="bg-white border border-border-light rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col h-full">
      <div className="relative h-48 sm:h-56 md:h-64 w-full bg-border-light">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col items-center text-center gap-1">
        <h3 className="text-maroon-deep text-lg sm:text-xl md:text-[22px]">
          {name}
        </h3>

        <span className="text-sm font-semibold text-gold btn-tracking">
          {role}
        </span>

        <p className="text-sm text-muted pt-4">{bio}</p>

        <div className="flex items-center gap-4 pt-6">
          <a
            href="#"
            aria-label={`${name} LinkedIn`}
            className="text-muted hover:text-maroon-deep transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
            </svg>
          </a>
          <a
            href="#"
            aria-label={`${name} X (Twitter)`}
            className="text-muted hover:text-maroon-deep transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}