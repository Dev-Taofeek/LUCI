import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Shared helpers for the API layer: consistent session/role gating and
 * allowlist-based request body sanitisation. Keeps the ~20 admin handlers
 * from re-implementing the same session check and raw-body mass-assign
 * patterns.
 */

/**
 * Returns the active admin session, or a rejected response.
 *
 * @param {string[]|null} allowedRoles explicitly restrict to these roles;
 *   pass `null` (default) to allow any authenticated admin user.
 * @returns {{session: object|null, error: number|null, response: Response|null}}
 *   `response` is set when the request should be rejected.
 */
export async function requireRoles(allowedRoles = null) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      session: null,
      error: 401,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
    return {
      session,
      error: 403,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }
  return { session, error: null, response: null };
}

/**
 * Copies only the allowlisted fields present on `body`, so a request can
 * never set columns it wasn't meant to touch (e.g. createdAt, id).
 */
export function pick(body, fields) {
  const out = {};
  for (const field of fields) {
    if (body[field] !== undefined && body[field] !== null) out[field] = body[field];
  }
  return out;
}

/**
 * Coerces a form value to an integer or `null` for `""` / missing / NaN.
 * Preserves `0` (unlike `Number(x) || null`, which would turn 0 into null).
 */
export function numberOrNull(value) {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

/** Returns the first missing required field name, or `null` when complete. */
export function missingField(body, fields) {
  return (
    fields.find((f) => body[f] === undefined || body[f] === null || String(body[f]).trim() === "") ||
    null
  );
}

export function jsonNotFound(resource) {
  return NextResponse.json({ error: `${resource} not found.` }, { status: 404 });
}

// ── Entity field allowlists + sanitisation ─────────────────────────────

export const PROGRAMME_FIELDS = [
  "slug", "title", "category", "status", "summary", "description", "location",
  "startDate", "endDate", "impactStat", "heroImage", "galleryImages",
  "objectives", "audience", "activities", "stats", "partners",
];

export function pickProgramme(body) {
  const data = pick(body, PROGRAMME_FIELDS);
  if (data.endDate === "" ) data.endDate = null;
  return data;
}

export const EVENT_FIELDS = [
  "slug", "title", "summary", "description", "location", "startDate", "endDate",
  "heroImage", "capacity", "speakers", "organisers",
];

export function pickEvent(body) {
  const data = pick(body, EVENT_FIELDS);
  if (data.capacity !== undefined) data.capacity = numberOrNull(data.capacity);
  if (data.endDate === "") data.endDate = null;
  return data;
}

export const RESOURCE_FIELDS = ["slug", "title", "category", "summary", "fileUrl", "thumbnail"];

export function pickResource(body) {
  return pick(body, RESOURCE_FIELDS);
}

export const ARTICLE_FIELDS = [
  "slug", "title", "category", "excerpt", "content", "coverImage", "status",
];

export function pickArticle(body, { withEditorFields = false } = {}) {
  const fields = withEditorFields
    ? [...ARTICLE_FIELDS, "authorId", "publishedAt"]
    : ARTICLE_FIELDS;
  const data = pick(body, fields);
  if (data.category === "") data.category = null;
  if (data.publishedAt === "") data.publishedAt = null;
  return data;
}