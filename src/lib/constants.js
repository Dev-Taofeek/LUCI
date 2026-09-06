export const ROLES = ["SUPER_ADMIN", "ADMIN", "EDITOR", "SAFEGUARDING_OFFICER"];

export const ROLE_LABELS = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  EDITOR: "Editor",
  SAFEGUARDING_OFFICER: "Safeguarding Officer",
};

export const SAFEGUARDING_ROLES = ["SAFEGUARDING_OFFICER", "SUPER_ADMIN"];

export const PIPELINE_STATUSES = {
  volunteer: ["NEW", "REVIEWED", "CONTACTED", "ONBOARDED"],
  membership: ["NEW", "REVIEWED", "CONTACTED", "ONBOARDED"],
  partnership: ["NEW", "REVIEWED", "CONTACTED", "CONVERTED"],
  contact: ["NEW", "REVIEWED", "RESOLVED", "ARCHIVED"],
};

export const PIPELINE_STATUS_LABELS = {
  NEW: "New",
  REVIEWED: "Reviewed",
  CONTACTED: "Contacted",
  ONBOARDED: "Onboarded",
  CONVERTED: "Converted",
  RESOLVED: "Resolved",
  ARCHIVED: "Archived",
};

export const SAFEGUARDING_STATUSES = ["OPEN", "INVESTIGATING", "RESOLVED"];
export const SAFEGUARDING_STATUS_LABELS = {
  OPEN: "Open",
  INVESTIGATING: "Investigating",
  RESOLVED: "Resolved",
};

export const ARTICLE_STATUSES = ["DRAFT", "PUBLISHED"];
export const ARTICLE_STATUS_LABELS = { DRAFT: "Draft", PUBLISHED: "Published" };

export const DONATION_STATUSES = ["PENDING", "SUCCESS", "FAILED"];
export const DONATION_STATUS_LABELS = {
  PENDING: "Pending",
  SUCCESS: "Successful",
  FAILED: "Failed",
};

export const FREQUENCIES = ["ONE_TIME", "MONTHLY"];
export const FREQUENCY_LABELS = { ONE_TIME: "One-time", MONTHLY: "Monthly" };

export const DONATION_CURRENCIES = ["NGN", "USD", "GBP", "EUR"];
export const DONATION_CURRENCY_LABELS = {
  NGN: "₦ NGN",
  USD: "$ USD",
  GBP: "£ GBP",
  EUR: "€ EUR",
};