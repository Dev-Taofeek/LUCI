import Image from "next/image";
import Link from "next/link";

const SOCIAL_ICONS = [
  {
    label: "Facebook",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817-5.964 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    svg: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM3.54 20.45H7.1V8.99H3.54v11.46ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
      </svg>
    ),
  },
];

export function ShareWidget() {
  return (
    <div className="bg-white border border-border-mid rounded-md p-5 sm:p-6 flex flex-col gap-3 sm:gap-4">
      <h3 className="text-lg sm:!text-[22px]">Share this Article</h3>
      <div className="flex gap-3 sm:gap-4">
        {SOCIAL_ICONS.map(({ label, svg }) => (
          <button
            key={label}
            aria-label={`Share on ${label}`}
            className="bg-border-light rounded-md size-9 sm:size-10 flex items-center justify-center hover:bg-border-mid shrink-0 text-muted transition-colors"
          >
            {svg}
          </button>
        ))}
      </div>
    </div>
  );
}

export function RelatedArticlesWidget({ articles }) {
  return (
    <div className="bg-white border border-border-mid rounded-md p-5 sm:p-6 flex flex-col gap-4 sm:gap-6">
      <h3 className="text-lg sm:!text-[22px] border-b border-border-mid pb-3 sm:pb-4">
        Related Articles
      </h3>
      <div className="flex flex-col gap-4 sm:gap-6">
        {articles.map((a) => (
          <Link key={a.title} href="#" className="flex gap-3 sm:gap-4">
            <div className="relative size-16 sm:size-20 rounded-md shrink-0 overflow-hidden">
              <Image src={a.image} alt={a.title} fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-1 justify-center min-w-0">
              <span className="text-sm font-semibold text-charcoal btn-tracking leading-snug line-clamp-2">
                {a.title}
              </span>
              <span className="text-xs text-muted">{a.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}