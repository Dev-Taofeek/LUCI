import Link from "next/link";
import { FileText } from "lucide-react";
import Button from "@/components/ui/Button";
import NewsletterForm from "@/components/sections/NewsletterForm";

export function ResourceActionCard({ description, fileFormat, href }) {
  return (
    <div className="bg-white border border-border-mid rounded-card p-5 sm:p-6 md:p-8 flex flex-col gap-3">
      <h3 className="text-lg sm:text-xl">Access Resource</h3>
      <p className="text-sm text-muted">{description}</p>
      <Button
        className="w-full justify-center"
        href={href}
      >
        <FileText size={16} className="shrink-0" /> Download Resource
      </Button>
      <span className="text-sm text-muted text-center">{fileFormat}</span>
    </div>
  );
}

export function ResourceMetadataCard({ metadata, tags }) {
  return (
    <div className="bg-white border border-border-mid rounded-card p-5 sm:p-6 flex flex-col gap-4">
      <h4 className="text-sm font-semibold text-charcoal btn-tracking border-b border-border-light pb-3">
        Resource Details
      </h4>
      <div className="flex flex-col gap-3 sm:gap-4">
        {Object.entries(metadata).map(([term, value]) => (
          <div key={term} className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted shrink-0">{term}</span>
            <span className="font-medium text-charcoal text-right break-words">{value}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-border-light pt-5 sm:pt-6 flex flex-col gap-2">
        <h4 className="text-sm font-semibold text-charcoal btn-tracking">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-border-light rounded-full px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NewsletterCTACard() {
  return (
    <div className="relative bg-maroon-deep rounded-card p-5 sm:p-6 md:p-8 overflow-hidden flex flex-col gap-4">
      <div className="absolute -bottom-8 -right-8 size-20 sm:size-24 rounded-full bg-maroon-dark/60" />
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-white text-lg sm:text-xl">Stay Informed</h3>
        <p className="text-white/80 text-xs sm:text-sm">
          Sign up to receive the latest research and impact reports from LUCI
          directly in your inbox.
        </p>
      </div>
      <NewsletterForm className="relative z-10 pt-2" inputId="newsletter-sidebar-email" />
    </div>
  );
}

export function RelatedResourceLink({ title, meta, href }) {
  const isLink = href && href !== "#";
  const className = "flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-card hover:bg-border-light/40";
  const content = (
    <>
      <span className="size-12 sm:size-14 md:size-16 rounded-card bg-border-light flex items-center justify-center shrink-0">
        <FileText size={20} className="text-muted" />
      </span>
      <span className="flex flex-col gap-1 min-w-0">
        <span className="text-sm font-semibold text-maroon-deep btn-tracking truncate">
          {title}
        </span>
        <span className="text-sm text-muted truncate">{meta}</span>
      </span>
    </>
  );
  return isLink ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}