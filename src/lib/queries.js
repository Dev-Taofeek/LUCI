import { prisma } from "@/lib/prisma";
import { formatDate, monthYear, dateRange, timeLabel } from "@/lib/format";

// ── Programmes ────────────────────────────────────────────────

const STATUS_LABELS = {
  ACTIVE: "Active",
  UPCOMING: "Upcoming",
  COMPLETED: "Completed",
};

function toProgrammeCard(p) {
  return {
    slug: p.slug,
    category: p.category,
    status: p.status === "ACTIVE" ? "active" : p.status === "COMPLETED" ? "completed" : "upcoming",
    statusLabel: STATUS_LABELS[p.status] || p.status,
    title: p.title,
    summary: p.summary,
    location: p.location,
    dateRange: dateRange(p.startDate, p.endDate),
    impactStat: p.impactStat || "",
    ctaLabel: p.status === "COMPLETED" ? "View Report" : "View Programme",
    image: p.heroImage || "",
  };
}

function toProgrammeDetail(p) {
  const audience = p.audience ?? { description: "", tags: [] };
  return {
    slug: p.slug,
    category: p.category,
    title: p.title,
    summary: p.summary,
    description: p.description,
    location: p.location,
    startDate: p.startDate,
    endDate: p.endDate,
    impactStat: p.impactStat || "",
    statusLabel: STATUS_LABELS[p.status] || p.status,
    heroImage: p.heroImage || "",
    image: p.heroImage || "",
    dateRange: dateRange(p.startDate, p.endDate),
    ctaLabel: "View Programme",
    detail: {
      overview: p.description,
      objectives: p.objectives || [],
      audience: {
        description: audience.description || "",
        tags: audience.tags || [],
      },
      activities: p.activities || [],
      gallery: p.galleryImages || [],
      stats: p.stats || [],
      partners: p.partners || [],
    },
  };
}

export async function listProgrammes() {
  const rows = await prisma.programme.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(toProgrammeCard);
}

export async function getProgrammeBySlug(slug) {
  const p = await prisma.programme.findUnique({ where: { slug } });
  return p ? toProgrammeDetail(p) : null;
}

export async function listRelatedProgrammes(slug, count = 3) {
  const rows = await prisma.programme.findMany({
    where: { NOT: { slug } },
    orderBy: { createdAt: "asc" },
    take: count,
  });
  return rows.map(toProgrammeCard);
}

// ── Events ────────────────────────────────────────────────────

function toEventCard(e, registrations = 0) {
  return {
    slug: e.slug,
    title: e.title,
    summary: e.summary,
    description: e.description,
    location: e.location,
    date: formatDate(e.startDate),
    dateRange: dateRange(e.startDate, e.endDate),
    time: timeLabel(e.startDate, e.endDate),
    venue: e.location,
    featured: Boolean(e.featured),
    capacity: e.capacity,
    seatsRemaining: e.capacity == null ? null : Math.max(0, e.capacity - registrations),
    heroImage: e.heroImage || "",
    image: e.heroImage || "",
    speakers: e.speakers ?? [],
    organisers: e.organisers ?? [],
  };
}

export async function listEvents() {
  const rows = await prisma.event.findMany({
    orderBy: { startDate: "asc" },
    include: { _count: { select: { registrations: true } } },
  });
  return rows.map((e) => toEventCard(e, e._count.registrations));
}

export async function getEventBySlug(slug) {
  const e = await prisma.event.findUnique({
    where: { slug },
    include: { _count: { select: { registrations: true } } },
  });
  return e ? toEventCard(e, e._count.registrations) : null;
}

export async function listUpcomingEvents(slug, take = 2) {
  const rows = await prisma.event.findMany({
    where: { NOT: { slug } },
    orderBy: { startDate: "asc" },
    take,
  });
  return rows.map((e) => toEventCard(e));
}

// ── Articles / News ───────────────────────────────────────────

function toArticleCard(a) {
  return {
    slug: a.slug,
    size: "small",
    category: a.category || "News",
    date: formatDate(a.publishedAt || a.createdAt),
    title: a.title,
    summary: a.excerpt,
    author: a.author?.name || "LUCI Team",
    image: a.coverImage || "",
  };
}

function toArticleDetail(a) {
  return {
    slug: a.slug,
    title: a.title,
    category: a.category || "News",
    excerpt: a.excerpt,
    content: a.content,
    coverImage: a.coverImage || "",
    date: formatDate(a.publishedAt || a.createdAt),
    author: a.author,
  };
}

export async function listArticles() {
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true, image: true } } },
  });
  const cards = rows.map(toArticleCard);
  if (cards.length > 0) cards[0].size = "large";
  return cards;
}

export async function getFeaturedArticle() {
  const row = await prisma.article.findFirst({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: { author: { select: { name: true, image: true } } },
  });
  if (!row) return null;
  return {
    category: row.category || "News",
    date: formatDate(row.publishedAt || row.createdAt),
    title: row.title,
    summary: row.excerpt,
    image: row.coverImage || "",
    href: `/news/${row.slug}`,
  };
}

export async function getArticleBySlug(slug) {
  const row = await prisma.article.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: { author: { select: { name: true, image: true } } },
  });
  if (!row) return null;
  return toArticleDetail(row);
}

export async function listRelatedArticles(slug, take = 3) {
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED", NOT: { slug } },
    orderBy: { publishedAt: "desc" },
    take,
  });
  return rows.map((a) => {
    const card = toArticleCard(a);
    return { title: card.title, date: card.date, image: card.image, href: `/news/${card.slug}` };
  });
}

// ── Resources ─────────────────────────────────────────────────

function toResourceCard(r) {
  const type = (r.category || "RESOURCE").toUpperCase();
  return {
    slug: r.slug,
    type,
    category: r.category || "RESOURCE",
    title: r.title,
    summary: r.summary,
    date: formatDate(r.createdAt),
    ctaLabel: type === "GUIDE" || type === "RESEARCH" ? "Download" : "Read More",
    image: r.thumbnail || "",
    fileUrl: r.fileUrl,
  };
}

export async function listResources() {
  const rows = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map(toResourceCard);
}

export async function getFeaturedResource() {
  const row = await prisma.resource.findFirst({ orderBy: { createdAt: "desc" } });
  if (!row) return null;
  const card = toResourceCard(row);
  return {
    ...card,
    author: "LUCI Knowledge Library",
    date: formatDate(row.createdAt),
    type: card.type,
  };
}

export async function getResourceBySlug(slug) {
  const row = await prisma.resource.findUnique({ where: { slug } });
  if (!row) return null;
  const card = toResourceCard(row);
  return {
    ...card,
    date: formatDate(row.createdAt),
    fileUrl: row.fileUrl,
    downloads: row.downloads,
    author: "LUCI Knowledge Library",
  };
}

export async function listRelatedResources(slug, take = 3) {
  const rows = await prisma.resource.findMany({
    where: { NOT: { slug } },
    orderBy: { createdAt: "desc" },
    take,
  });
  return rows.map((r) => ({
    title: r.title,
    meta: `${r.category || "Resource"} • ${formatDate(r.createdAt)}`,
    href: `/resources/${r.slug}`,
  }));
}