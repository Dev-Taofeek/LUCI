import { createInboxHandlers } from "@/lib/inbox";

export const { PATCH, DELETE } = createInboxHandlers("memberships");