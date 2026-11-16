"use server";

import { revalidatePath } from "next/cache";
import { createComment } from "@/lib/comments";

const STANCES = ["agree", "disagree", "mixed"];

export async function addComment(_prev, formData) {
  // Honeypot: bots fill hidden fields, humans don't
  if (formData.get("website")) return { ok: true };

  const slug = String(formData.get("slug") || "");
  const parentId = String(formData.get("parentId") || "") || null;
  const name = String(formData.get("name") || "").trim().slice(0, 60);
  const body = String(formData.get("body") || "").trim();
  const stanceRaw = String(formData.get("stance") || "");
  const stance = STANCES.includes(stanceRaw) ? stanceRaw : null;

  if (!slug) return { ok: false, error: "Something went wrong." };
  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (body.length < 3) return { ok: false, error: "Your comment is too short." };
  if (body.length > 1500) return { ok: false, error: "Keep it under 1,500 characters." };

  await createComment({ articleSlug: slug, parentId, name, body, stance });
  revalidatePath(`/news/${slug}`);
  return { ok: true };
}