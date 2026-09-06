import { createInboxHandlers } from "@/lib/inbox";

export const { GET, DELETE } = createInboxHandlers("subscribers");