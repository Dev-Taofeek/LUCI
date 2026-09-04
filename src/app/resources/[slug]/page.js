import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import {
  ResourceActionCard,
  ResourceMetadataCard,
  NewsletterCTACard,
  RelatedResourceLink,
} from "@/components/sections/ResourceSidebar";
import { RESOURCE_DETAIL } from "@/lib/data/resources";

export default async function ResourceDetailPage({ params }) {
  const { slug } = await params;
  // Only one full detail record exists in the mock data so far; once Resources
  // are seeded via Prisma, swap this for `prisma.resource.findUnique({ where: { slug } })`.
  if (slug !== RESOURCE_DETAIL.slug) return notFound();
  const r = RESOURCE_DETAIL;

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 flex flex-col gap-6 sm:gap-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted overflow-x-auto whitespace-nowrap">
        <Link href="/resources" className="hover:text-maroon-deep shrink-0">
          Resources
        </Link>
        <ChevronRight size={12} className="shrink-0" />
        <span className="shrink-0">{r.breadcrumbCategory}</span>
        <ChevronRight size={12} className="shrink-0" />
        <span className="text-charcoal font-semibold truncate">{r.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Main content */}
        <article className="md:col-span-8 flex flex-col gap-6 sm:gap-7 md:gap-8">
          <header className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="bg-maroon-deep/10 text-maroon-deep text-xs tracking-[0.05em] rounded-md px-3 py-1">
                {r.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <Calendar size={14} className="shrink-0" /> {r.date}
              </span>
            </div>
            <h1 className="!text-charcoal text-2xl sm:text-3xl md:text-4xl lg:!text-5xl leading-tight">
              {r.title}
            </h1>
            <div className="border-t border-border-mid/30 pt-4 sm:pt-5 flex items-center gap-3 sm:gap-4">
              <div className="relative size-10 sm:size-12 rounded-md overflow-hidden border border-border-mid shrink-0">
                <Image src={r.author.image} alt={r.author.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-charcoal btn-tracking mb-0 text-sm sm:text-base truncate">
                  {r.author.name}
                </p>
                <p className="mb-0 text-sm truncate">{r.author.role}</p>
              </div>
            </div>
          </header>

          <figure className="border border-border-mid/50 rounded-md overflow-hidden shadow-[0_4px_20px_rgba(110,15,26,0.04)]">
            <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] w-full">
              <Image
                src={r.figureImage}
                alt={r.figureCaption}
                fill
                sizes="(max-width: 768px) 100vw, 66vw"
                className="object-cover"
              />
            </div>
            <figcaption className="bg-white border-t border-border-mid/50 px-4 py-3 sm:py-4 text-sm text-muted font-thin">
              {r.figureCaption}
            </figcaption>
          </figure>

          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <h2 className="text-2xl sm:!text-[28px]">Abstract</h2>
            {r.abstract.map((p, i) => (
              <p key={i} className="text-sm sm:text-md font-thin !text-charcoal">
                {p}
              </p>
            ))}

            <h3 className="text-lg sm:!text-[22px] border-b border-border-mid/30 pb-2">
              Key Findings
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {r.keyFindings.map((f) => (
                <li key={f.bold} className="flex gap-3">
                  <span className="text-gold text-lg leading-none mt-1 shrink-0">•</span>
                  <p className="text-sm sm:text-md font-thin !text-charcoal">
                    <strong>{f.bold}</strong> {f.rest}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 flex flex-col gap-6 sm:gap-7 md:gap-8">
          <ResourceActionCard
            description="Get the full 48-page comprehensive report including detailed methodology and regional breakdowns."
            fileFormat={r.fileFormat}
          />
          <ResourceMetadataCard metadata={r.metadata} tags={r.tags} />
          <NewsletterCTACard />
          <div className="flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:!text-[22px]">Related Resources</h3>
            <RelatedResourceLink {...r.related} />
          </div>
        </aside>
      </div>
    </div>
  );
}