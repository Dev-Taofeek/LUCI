"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/sections/ArticleCard";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { FEATURED_ARTICLE, ARTICLES } from "@/lib/data/articles";

const FILTERS = ["All", "News", "Community", "Family", "Diversity", "Unity"];

export default function NewsIndexPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = ARTICLES.filter((a) => {
    const matchesQuery = a.title.toLowerCase().includes(query.toLowerCase());
    const matchesFilter = activeFilter === "All" || a.category === activeFilter;
    return matchesQuery && matchesFilter;
  });

  return (
    <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-20">
      {/* Featured hero */}
      <div className="relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] w-full max-w-[1152px] px-3 sm:px-6 mt-4 sm:mt-6">
        <div className="relative h-full w-full rounded-card overflow-hidden">
          <Image
            src={FEATURED_ARTICLE.image}
            alt={FEATURED_ARTICLE.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent sm:bg-gradient-to-t sm:from-white sm:via-white/40 sm:to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 md:right-1/3 p-5 sm:p-8 md:p-12 flex flex-col gap-3 sm:gap-4">
            <span className="bg-gold text-charcoal text-xs sm:text-sm font-semibold btn-tracking rounded-full px-3 sm:px-4 py-1.5 sm:py-2 w-fit">
              Featured
            </span>
            <h1 className="!text-charcoal text-xl sm:text-2xl md:text-3xl lg:!text-4xl leading-tight">
              {FEATURED_ARTICLE.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg line-clamp-3 sm:line-clamp-none">
              {FEATURED_ARTICLE.summary}
            </p>
            <Link
              href={FEATURED_ARTICLE.href}
              className="text-sm font-semibold text-maroon-deep btn-tracking w-fit hover:text-maroon-dark"
            >
              Read Full Article →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-container w-full px-4 sm:px-6 flex flex-col gap-8 sm:gap-10 md:gap-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl">Latest Insights</h2>
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-warm-white border border-border-mid rounded-control pl-11 pr-4 py-3 text-base text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-maroon-deep/30 focus:border-maroon-deep"
            />
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 md:gap-4 flex-nowrap sm:flex-wrap overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "bg-maroon-deep text-white rounded-full px-4 sm:px-6 py-2 text-sm whitespace-nowrap shrink-0"
                  : "bg-border-light text-charcoal rounded-full px-4 sm:px-6 py-2 text-sm hover:bg-border-mid whitespace-nowrap shrink-0"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-5 sm:gap-6"
        >
          {filtered.map((article) => (
            <motion.div
              key={article.slug}
              variants={fadeInUp}
              className="contents"
            >
              <ArticleCard {...article} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-1 sm:col-span-2 md:col-span-12 text-center text-muted py-10 sm:py-12 px-4">
              No articles match your search.
            </p>
          )}
        </motion.div>
      </div>

      {/* Newsletter CTA */}
      <section className="bg-maroon-deep w-full px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:pt-20 flex justify-center">
        <div className="max-w-xl flex flex-col items-center text-center gap-4 sm:gap-6">
          <h2 className="text-white text-2xl sm:text-3xl">Stay Connected with LUCI</h2>
          <p className="text-warm-white/80 text-sm sm:text-base">
            Subscribe to our newsletter for the latest updates on our
            programmes, inspiring stories from the community, and
            opportunities to get involved.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md pt-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white rounded-control px-4 sm:px-6 py-3 sm:py-4 text-base text-charcoal placeholder:text-muted focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gold text-white rounded-control px-6 sm:px-8 py-3 sm:py-4 text-sm font-semibold btn-tracking hover:bg-gold/90 w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}