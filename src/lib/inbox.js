import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRoles } from "@/lib/api";
import { logAudit } from "@/lib/audit";
import { PIPELINE_STATUSES } from "@/lib/constants";

// Each "people" pipeline (volunteers / memberships / partnerships / contacts /
// subscribers) uses the exact same list / status-update / delete flow — only
// the model, response key, audit entity, and allowed statuses differ. These
// factories remove that duplication while keeping one route file per resource.

const PIPELINES = {
  volunteers: {
    delegate: "volunteerApplication",
    key: "volunteers",
    singular: "volunteer",
    entity: "VolunteerApplication",
    statuses: PIPELINE_STATUSES.volunteer,
  },
  memberships: {
    delegate: "membershipApplication",
    key: "memberships",
    singular: "membership",
    entity: "MembershipApplication",
    statuses: PIPELINE_STATUSES.membership,
  },
  partnerships: {
    delegate: "partnershipInquiry",
    key: "partnerships",
    singular: "partnership",
    entity: "PartnershipInquiry",
    statuses: PIPELINE_STATUSES.partnership,
  },
  contacts: {
    delegate: "contactSubmission",
    key: "contacts",
    singular: "contact",
    entity: "ContactSubmission",
    statuses: PIPELINE_STATUSES.contact,
  },
  subscribers: {
    delegate: "newsletterSubscriber",
    key: "subscribers",
    singular: "subscriber",
    entity: "NewsletterSubscriber",
    statuses: null,
  },
};

export function createInboxHandlers(kind) {
  const cfg = PIPELINES[kind];
  if (!cfg) throw new Error(`Unknown inbox kind: ${kind}`);

  const delegate = prisma[cfg.delegate];
  const statuses = cfg.statuses;

  async function GET() {
    const auth = await requireRoles();
    if (auth.error) return auth.response;

    try {
      const rows = await delegate.findMany({ orderBy: { createdAt: "desc" } });
      return NextResponse.json({ [cfg.key]: rows });
    } catch (err) {
      console.error(`GET ${cfg.key} failed:`, err);
      return NextResponse.json({ error: "Could not load records." }, { status: 500 });
    }
  }

  async function PATCH(req, { params }) {
    const auth = await requireRoles();
    if (auth.error) return auth.response;

    const body = await req.json().catch(() => ({}));
    const status = body.status;

    if (!statuses || !statuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    try {
      const row = await delegate.update({
        where: { id: params.id },
        data: { status },
      });
      await logAudit({
        userId: auth.session.user.id,
        action: "UPDATE",
        entity: cfg.entity,
        entityId: row.id,
        metadata: { status },
      });
      return NextResponse.json({ [cfg.singular]: row });
    } catch (err) {
      console.error(`PATCH ${cfg.key} failed:`, err);
      return NextResponse.json({ error: "Could not update record." }, { status: 400 });
    }
  }

  async function DELETE(req, { params }) {
    const auth = await requireRoles();
    if (auth.error) return auth.response;

    try {
      await delegate.delete({ where: { id: params.id } });
      await logAudit({
        userId: auth.session.user.id,
        action: "DELETE",
        entity: cfg.entity,
        entityId: params.id,
      });
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error(`DELETE ${cfg.key} failed:`, err);
      return NextResponse.json({ error: "Could not delete record." }, { status: 400 });
    }
  }

  if (!statuses) return { GET, DELETE };
  return { GET, PATCH, DELETE };
}