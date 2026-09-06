import NewsContent from "@/components/site/NewsContent";
import { listArticles, getFeaturedArticle } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "News & Insights",
  description:
    "Stories, updates, and insights from the Love, Unity, and Care Initiative and the communities we serve.",
};

export default async function NewsIndexPage() {
  const [articles, featured] = await Promise.all([listArticles(), getFeaturedArticle()]);
  return <NewsContent articles={articles} featured={featured} />;
}