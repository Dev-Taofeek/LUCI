import { Download, FileText } from "lucide-react";

// was bg #f3f3f3 border #bfc9c4 -> warm-white / border-mid
export function ResourceActionCard({ description, fileFormat }) {
  return (
    <div className="bg-warm-white border border-border-mid rounded-[12px] p-5 sm:p-6 md:p-8 flex flex-col gap-3 shadow-[0_4px_10px_rgba(110,15,26,0.04)]">
      <h3 className="text-lg sm:text-xl md:!text-[22px]">Access Resource</h3>
      <p className="text-sm text-muted">{description}</p>
      <button className="bg-maroon-deep text-white rounded-control px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center gap-2 text-sm font-semibold btn-tracking hover:bg-maroon-dark">
        <FileText size={16} className="shrink-0" /> Download Full Report
      </button>
      <span className="text-sm text-muted text-center">{fileFormat}</span>
    </div>
  );
}

// was bg #f9f9f9 -> white
export function ResourceMetadataCard({ metadata, tags }) {
  return (
    <div className="bg-white border border-border-mid/50 rounded-[12px] p-5 sm:p-6 flex flex-col gap-4">
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

// was bg #004d40 -> maroon-deep, subscribe button bg #735c00 -> gold
export function NewsletterCTACard() {
  return (
    <div className="relative bg-maroon-deep rounded-[12px] p-5 sm:p-6 md:p-8 overflow-hidden flex flex-col gap-4">
      <div className="absolute -bottom-8 -right-8 size-20 sm:size-24 rounded-full bg-maroon-dark opacity-60" />
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="text-white text-lg sm:text-xl md:!text-[22px]">Stay Informed</h3>
        <p className="text-warm-white/80 text-sm">
          Sign up to receive the latest research and impact reports from LUCI
          directly in your inbox.
        </p>
      </div>
      <form className="relative z-10 flex flex-col gap-3 pt-2">
        <input
          type="email"
          placeholder="Email address"
          className="bg-warm-white rounded-control px-4 sm:px-6 py-3 sm:py-4 text-base text-charcoal placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gold text-charcoal rounded-control px-4 sm:px-6 py-3 sm:py-4 text-sm font-semibold btn-tracking hover:bg-gold/90"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export function RelatedResourceLink({ title, meta, href }) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-control hover:bg-border-light/40"
    >
      <span className="size-12 sm:size-14 md:size-16 rounded bg-border-light flex items-center justify-center shrink-0">
        <FileText size={20} className="text-muted" />
      </span>
      <span className="flex flex-col gap-1 min-w-0">
        <span className="text-sm font-semibold text-maroon-deep btn-tracking truncate">
          {title}
        </span>
        <span className="text-sm text-muted truncate">{meta}</span>
      </span>
    </a>
  );
}