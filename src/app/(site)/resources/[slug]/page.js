import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, FileText } from "lucide-react";
import {
  ResourceActionCard,
  ResourceMetadataCard,
  NewsletterCTACard,
  RelatedResourceLink,
} from "@/components/sections/ResourceSidebar";
import { getResourceBySlug, listRelatedResources } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) return {};
  return {
    title: r.title,
    description: r.summary,
  };
}

function paragraphs(value) {
  return (value || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export default async function ResourceDetailPage({ params }) {
  const { slug } = await params;
  const r = await getResourceBySlug(slug);
  if (!r) return notFound();

  const related = await listRelatedResources(r.slug, 3);
  const abstract = paragraphs(r.summary || r.title);

  const metadata = {
    Type: r.type,
    Published: r.date,
    Downloads: String(r.downloads ?? 0),
  };

  return (
    <div className="container-luci py-8 sm:py-10 md:py-12 flex flex-col gap-6 sm:gap-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
        <Link href="/resources" className="hover:text-maroon-deep shrink-0">
          Resources
        </Link>
        <ChevronRight size={12} className="shrink-0" />
        <span className="shrink-0">{r.type}</span>
        <ChevronRight size={12} className="shrink-0" />
        <span className="text-charcoal font-semibold truncate">{r.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Main content */}
        <article className="md:col-span-8 flex flex-col gap-6 sm:gap-7 md:gap-8">
          <header className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="bg-maroon-deep/10 text-maroon-deep text-xs tracking-[0.05em] rounded-control px-3 py-1">
                {r.category || r.type}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <Calendar size={14} className="shrink-0" /> {r.date}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              {r.title}
            </h1>
            <div className="border-t border-border-mid pt-4 sm:pt-5 flex items-center gap-3 sm:gap-4">
              <div className="relative size-10 sm:size-12 rounded-control overflow-hidden border border-border-mid shrink-0 bg-border-light flex items-center justify-center">
                <FileText size={20} className="text-muted" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-charcoal text-sm sm:text-base truncate">
                  {r.author}
                </p>
                <p className="text-sm text-muted truncate">LUCI Knowledge Library</p>
              </div>
            </div>
          </header>

          {r.image && (
            <figure className="border border-border-mid rounded-card overflow-hidden">
              <div className="relative h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] w-full bg-border-light">
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </figure>
          )}

          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            <h2 className="text-2xl sm:text-3xl">Overview</h2>
            {abstract.length > 0
              ? abstract.map((p, i) => (
                  <p key={i} className="text-sm sm:text-base">
                    {p}
                  </p>
                ))
              : (
                  <p className="text-sm sm:text-base">{r.title}</p>
                )}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 flex flex-col gap-6 sm:gap-7 md:gap-8">
          {r.fileUrl && (
            <ResourceActionCard
              description={`Download the full ${r.type.toLowerCase()} resource and the supporting materials.`}
              fileFormat={`${r.type} • Opens in a new tab`}
              href={r.fileUrl.startsWith("http") ? r.fileUrl : `http://localhost:3000${r.fileUrl}`}
            />
          )}
          <ResourceMetadataCard metadata={metadata} tags={[r.category || r.type].filter(Boolean)} />
          <NewsletterCTACard />
          {related.length > 0 && (
            <div className="flex flex-col gap-3 sm:gap-4">
              <h3 className="text-lg sm:text-xl">Related Resources</h3>
              {related.map((rel) => (
                <RelatedResourceLink key={rel.href} {...rel} />
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}