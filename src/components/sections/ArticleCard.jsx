import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

export function ArticleCard({ slug, size = "small", category, date, title, summary, author, image }) {
  const href = `/news/${slug}`;

  if (size === "large") {
    return (
      <Link
        href={href}
        className="col-span-1 sm:col-span-2 md:col-span-8 bg-white border border-border-mid/40 rounded-card overflow-hidden grid grid-cols-1 md:grid-cols-2 hover:border-border-mid transition-colors"
      >
        <div className="relative h-48 sm:h-56 md:h-full">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="p-5 sm:p-6 md:p-8 flex flex-col justify-center gap-3 sm:gap-4">
          <span className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
            <span className="font-semibold text-maroon-deep btn-tracking">{category}</span>
            <span className="text-muted hidden sm:inline">•</span>
            <span className="text-muted">{date}</span>
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl leading-snug">{title}</h3>
          {summary && <p className="text-sm sm:text-base text-muted">{summary}</p>}
          <span className="flex items-center gap-2 text-sm text-muted pt-1 sm:pt-2">
            <User size={14} className="shrink-0" /> By {author}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="md:col-span-4 bg-white border border-border-mid/40 rounded-card overflow-hidden flex flex-col h-full hover:border-border-mid transition-colors"
    >
      <div className="relative h-40 sm:h-44 md:h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col justify-between gap-3 sm:gap-4 flex-1">
        <div className="flex flex-col gap-2.5">
          <span className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm">
            <span className="font-semibold text-maroon-deep btn-tracking">{category}</span>
            <span className="text-muted hidden sm:inline">•</span>
            <span className="text-muted">{date}</span>
          </span>
          <h3 className="text-lg sm:text-xl leading-snug">{title}</h3>
        </div>
        <span className="text-sm text-muted">By {author}</span>
      </div>
    </Link>
  );
}