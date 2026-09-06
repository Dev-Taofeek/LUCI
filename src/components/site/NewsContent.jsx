"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { SearchInput } from "@/components/ui/Input";
import FilterPills from "@/components/ui/FilterPills";
import NewsletterForm from "@/components/sections/NewsletterForm";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function NewsContent({ articles, featured }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const FILTERS = ["All", ...new Set(articles.map((a) => a.category).filter(Boolean))];

  const filtered = articles.filter((a) => {
    const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === "All" || a.category === activeFilter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-20">
      {/* Featured hero */}
      {featured && (
        <div className="relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] w-full max-w-[1152px] px-3 sm:px-6 mt-4 sm:mt-6">
          <div className="relative h-full w-full rounded-card overflow-hidden">
            {featured.image && (
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent sm:bg-gradient-to-t sm:from-white sm:via-white/40 sm:to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 md:right-1/3 p-5 sm:p-8 md:p-12 flex flex-col gap-3 sm:gap-4">
              <span className="bg-gold text-charcoal text-xs sm:text-sm font-semibold btn-tracking rounded-control px-3 sm:px-4 py-1.5 sm:py-2 w-fit">
                Featured
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
                {featured.title}
              </h1>
              <p className="text-xs sm:text-sm sm:text-base line-clamp-3 sm:line-clamp-none">
                {featured.summary}
              </p>
              <Link
                href={featured.href}
                className="inline-flex items-center gap-2 text-sm font-semibold text-maroon-deep btn-tracking w-fit hover:text-maroon-dark"
              >
                Read Full Article <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container-luci flex flex-col gap-8 sm:gap-10 md:gap-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl">Latest Insights</h2>
          <SearchInput
            placeholder="Search articles..."
            className="w-full sm:w-64"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {FILTERS.length > 1 && (
          <FilterPills filters={FILTERS} active={activeFilter} onChange={setActiveFilter} />
        )}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5 sm:gap-6"
        >
          {filtered.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-1 sm:col-span-2 md:col-span-12 text-center text-muted py-10 sm:py-12">
              No articles match your search.
            </p>
          )}
        </motion.div>
      </div>

      {/* Newsletter CTA */}
      <section className="bg-maroon-deep w-full py-12 sm:py-16 md:pt-20 flex justify-center">
        <div className="container-luci">
          <div className="flex flex-col items-center text-center gap-4 sm:gap-6 max-w-xl mx-auto">
            <h2 className="text-white text-2xl sm:text-3xl">Stay Connected with LUCI</h2>
            <p className="text-white/80 text-sm sm:text-base">
              Subscribe to our newsletter for the latest updates on our
              programmes, inspiring stories from the community, and
              opportunities to get involved.
            </p>
            <NewsletterForm
              className="sm:flex-row max-w-md pt-2"
              inputId="newsletter-page-email"
            />
          </div>
        </div>
      </section>
    </div>
  );
}