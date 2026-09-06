import { createInboxHandlers } from "@/lib/inbox";

export const { GET, PATCH, DELETE } = createInboxHandlers("memberships");