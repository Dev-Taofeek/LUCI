import { prisma } from "@/lib/prisma"; // adjust to your client

export async function listComments(slug) {
  const all = await prisma.comment.findMany({
    where: { articleSlug: slug, status: "approved" },
    orderBy: { createdAt: "asc" },
  });
  const top = all.filter((c) => !c.parentId).reverse(); // newest first
  return top.map((c) => ({
    ...c,
    replies: all.filter((r) => r.parentId === c.id), // oldest first
  }));
}

export async function createComment(data) {
  return prisma.comment.create({ data });
}