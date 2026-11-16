import { prisma } from "@/lib/prisma"; // keep whatever import you already have

export async function listComments(slug) {
  try {
    const all = await prisma.comment.findMany({
      where: { articleSlug: slug, status: "approved" },
      orderBy: { createdAt: "asc" },
    });
    const top = all.filter((c) => !c.parentId).reverse();
    return top.map((c) => ({
      ...c,
      replies: all.filter((r) => r.parentId === c.id),
    }));
  } catch (err) {
    console.error("listComments failed:", err);
    return [];
  }
}

export async function createComment(data) {
  return prisma.comment.create({ data });
}