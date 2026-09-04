import { FileText, Download } from "lucide-react";
import { REPORTS } from "@/lib/data/impact";

export default function AnnualReportsSection() {
  return (
    <div className="bg-white border border-border-light rounded-md p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-[0_4px_10px_rgba(110,15,26,0.04)]">
      <div className="flex flex-col gap-2 max-w-md">
        <h2 className="text-2xl sm:!text-[28px]">Transparency &amp; Accountability</h2>
        <p className="text-sm sm:text-md font-thin">
          We believe in rigorous measurement and open accounting. Download
          our latest reports to review our financial health and detailed
          impact metrics.
        </p>
      </div>
      <div className="flex gap-3 sm:gap-4 flex-wrap w-full md:w-auto">
        {REPORTS.map((report) => (
          <a
            key={report.title}
            href={report.href}
            className="bg-white border border-border-mid rounded-md p-3 sm:p-4 flex items-center justify-between gap-4 sm:gap-6 w-full sm:min-w-[240px] sm:w-auto hover:border-maroon-deep/40"
          >
            <span className="flex items-center gap-3 sm:gap-4 min-w-0">
              <span className="bg-gold-light/40 rounded-md p-2 shrink-0">
                <FileText size={20} className="text-maroon-deep" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm sm:text-base text-charcoal truncate">
                  {report.title}
                </span>
                <span className="block text-xs text-muted">{report.meta}</span>
              </span>
            </span>
            <Download size={16} className="text-muted shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}