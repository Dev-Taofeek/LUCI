import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logAudit } from "@/lib/audit";
import { requireRoles, pickArticle, missingField } from "@/lib/api";

export async function GET() {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    return NextResponse.json({ articles });
  } catch (err) {
    console.error("GET news failed:", err);
    return NextResponse.json({ error: "Could not load articles." }, { status: 500 });
  }
}

export async function POST(req) {
  const auth = await requireRoles();
  if (auth.error) return auth.response;

  const body = await req.json().catch(() => ({}));

  const missing = missingField(body, ["title", "slug"]);
  if (missing) {
    return NextResponse.json(
      { error: `${missing} is required.` },
      { status: 400 }
    );
  }

  const data = pickArticle(body);
  if (data.status === "PUBLISHED" && !body.publishedAt) {
    data.publishedAt = new Date();
  }

  try {
    const article = await prisma.article.create({
      data: { ...data, authorId: body.authorId || auth.session.user.id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    await logAudit({
      userId: auth.session.user.id,
      action: "CREATE",
      entity: "Article",
      entityId: article.id,
      metadata: { title: article.title },
    });
    return NextResponse.json({ article }, { status: 201 });
  } catch (err) {
    console.error("POST news failed:", err);
    return NextResponse.json(
      { error: "Could not create article. Check the slug is unique." },
      { status: 400 }
    );
  }
}