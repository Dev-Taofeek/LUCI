import { prisma } from "@/lib/prisma";

/**
 * Records an admin action to AuditLog. Called from API routes after a
 * successful mutation — never blocks the response on failure (a logging
 * error shouldn't fail the underlying admin action).
 */
export async function logAudit({ userId, action, entity, entityId, metadata }) {
  try {
    await prisma.auditLog.create({
      data: { userId, action, entity, entityId, metadata },
    });
  } catch (err) {
    console.error("Audit log failed:", err);
  }
}
