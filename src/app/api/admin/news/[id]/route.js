import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, pickArticle } from "@/lib/api";

export async function PATCH(req, { params }) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const data = pickArticle(body, { withEditorFields: true });
  if (data.status === "PUBLISHED" && !data.publishedAt) {
    data.publishedAt = new Date();
  } else if (data.status === "DRAFT") {
    data.publishedAt = null;
  }

  try {
    const article = await prisma.article.update({
      where: { id },
      data,
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    await logAudit({
      userId: auth.session.user.id,
      action: "UPDATE",
      entity: "Article",
      entityId: article.id,
      metadata: { title: article.title },
    });
    return NextResponse.json({ article });
  } catch (err) {
    console.error("PATCH news failed:", err);
    return NextResponse.json({ error: "Could not update article." }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const { id } = await params;

  try {
    const article = await prisma.article.delete({ where: { id } });
    await logAudit({
      userId: auth.session.user.id,
      action: "DELETE",
      entity: "Article",
      entityId: article.id,
      metadata: { title: article.title },
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE news failed:", err);
    return NextResponse.json({ error: "Could not delete article." }, { status: 400 });
  }
}