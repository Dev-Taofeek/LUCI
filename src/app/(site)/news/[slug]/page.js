import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ShareWidget, RelatedArticlesWidget } from "@/components/sections/ArticleSidebar";
import { getArticleBySlug, listRelatedArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

function estimateReadTime(content) {
  const words = (content || "").trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 180));
  return `${mins} min read`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return notFound();

  const paragraphs = (a.content || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const related = await listRelatedArticles(a.slug, 3);

  return (
    <div className="container-luci py-8 sm:py-10 md:py-12 flex flex-col gap-6 sm:gap-8">
      <Link
        href="/news"
        className="flex items-center gap-2 text-sm font-semibold text-muted hover:text-maroon-deep w-fit"
      >
        <ChevronLeft size={14} className="shrink-0" /> Back to News
      </Link>

      {/* Header */}
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-3 sm:gap-4">
        <span className="bg-maroon-deep text-white text-xs tracking-[0.05em] uppercase rounded-control px-4 py-2">
          {a.category}
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl leading-tight">
          {a.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:gap-x-6 text-sm text-muted">
          <span className="flex items-center gap-2">
            {a.author?.image ? (
              <span className="relative size-7 sm:size-8 rounded-control overflow-hidden shrink-0">
                <Image src={a.author.image} alt={a.author.name} fill className="object-cover" />
              </span>
            ) : (
              <span className="relative size-7 sm:size-8 rounded-control overflow-hidden shrink-0 bg-border-light" />
            )}
            By {a.author?.name || "LUCI Team"}
          </span>
          <span className="hidden sm:inline">•</span>
          <span>{a.date}</span>
          <span className="hidden sm:inline">•</span>
          <span>{estimateReadTime(a.content)}</span>
        </div>
      </div>

      {/* Hero image */}
      {a.coverImage && (
        <div className="relative h-[220px] sm:h-[340px] md:h-[420px] lg:h-[500px] w-full rounded-card overflow-hidden border border-border-mid">
          <Image
            src={a.coverImage}
            alt={a.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 pt-2 sm:pt-4">
        {/* Main content */}
        <article className="md:col-span-8 flex flex-col gap-4 sm:gap-5 md:gap-6">
          {a.excerpt && <p className="text-sm sm:text-base text-maroon-deep">{a.excerpt}</p>}
          {paragraphs.length > 0
            ? paragraphs.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-charcoal">
                  {p}
                </p>
              ))
            : a.content && <p className="text-sm sm:text-base text-charcoal">{a.content}</p>}
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 flex flex-col gap-6 sm:gap-8">
          <ShareWidget />
          {related.length > 0 && <RelatedArticlesWidget articles={related} />}
        </aside>
      </div>
    </div>
  );
}