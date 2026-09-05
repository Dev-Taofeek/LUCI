import { FileText, Download } from "lucide-react";
import Link from "next/link";
import { REPORTS } from "@/lib/data/impact";

export default function AnnualReportsSection() {
  return (
    <div className="bg-white border border-border-mid rounded-card p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
      <div className="flex flex-col gap-2 max-w-md">
        <h2 className="text-2xl sm:text-3xl">Transparency &amp; Accountability</h2>
        <p className="text-sm sm:text-base">
          We believe in rigorous measurement and open accounting. Download
          our latest reports to review our financial health and detailed
          impact metrics.
        </p>
      </div>
      <div className="flex gap-3 sm:gap-4 flex-wrap w-full md:w-auto">
        {REPORTS.map((report) => {
          const isLink = report.href && report.href !== "#";
          const cardClasses = "bg-white border border-border-mid rounded-card p-3 sm:p-4 flex items-center justify-between gap-4 sm:gap-6 w-full sm:min-w-[240px] sm:w-auto";
          const content = (
            <>
              <span className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="bg-gold-light/40 rounded-control p-2 shrink-0">
                  <FileText size={20} className="text-maroon-deep" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm sm:text-base text-charcoal truncate">
                    {report.title}
                  </span>
                  <span className="block text-xs text-muted">{report.meta}</span>
                </span>
              </span>
              {isLink && <Download size={16} className="text-muted shrink-0" />}
            </>
          );
          return isLink ? (
            <Link
              key={report.title}
              href={report.href}
              className={`${cardClasses} hover:border-maroon-deep/40`}
            >
              {content}
            </Link>
          ) : (
            <div key={report.title} className={cardClasses}>
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}