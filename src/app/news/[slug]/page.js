import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ShareWidget, RelatedArticlesWidget } from "@/components/sections/ArticleSidebar";
import { getArticleBySlug } from "@/lib/data/articles";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.lede,
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return notFound();

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
            <span className="relative size-7 sm:size-8 rounded-control overflow-hidden shrink-0">
              <Image src={a.author.image} alt={a.author.name} fill className="object-cover" />
            </span>
            By {a.author.name}
          </span>
          <span className="hidden sm:inline">•</span>
          <span>{a.date}</span>
          <span className="hidden sm:inline">•</span>
          <span>{a.readTime}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="relative h-[220px] sm:h-[340px] md:h-[420px] lg:h-[500px] w-full rounded-card overflow-hidden border border-border-mid">
        <Image
          src={a.heroImage}
          alt={a.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 md:gap-12 pt-2 sm:pt-4">
        {/* Main content */}
        <article className="md:col-span-8 flex flex-col gap-4 sm:gap-5 md:gap-6">
          <p className="text-sm sm:text-base text-maroon-deep">{a.lede}</p>
          {a.body.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-charcoal">
              {p}
            </p>
          ))}

          <h2 className="text-2xl sm:text-3xl pt-1 sm:pt-2">{a.subheading}</h2>
          {a.bodyTwo.map((p, i) => (
            <p key={i} className="text-sm sm:text-base text-charcoal">
              {p}
            </p>
          ))}

          <blockquote className="bg-warm-white border-l-4 border-gold rounded-card pl-5 sm:pl-7 py-4 flex flex-col gap-2">
            <p className="font-display italic text-sm sm:text-base font-medium text-maroon-deep">
              &ldquo;{a.quote.text}&rdquo;
            </p>
            <footer className="text-sm italic text-muted">{a.quote.attribution}</footer>
          </blockquote>

          <p className="text-sm sm:text-base text-charcoal">{a.closing}</p>
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 flex flex-col gap-6 sm:gap-8">
          <ShareWidget />
          <RelatedArticlesWidget articles={a.related} />
        </aside>
      </div>
    </div>
  );
}