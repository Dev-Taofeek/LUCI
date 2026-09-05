"use client";
import { Printer } from "lucide-react";

export default function LegalPageHeader({ title, subtitle, lastUpdated }) {
  return (
    <div className="bg-white border-b border-border-light">
      <div className="container-luci pt-10 sm:pt-14 md:pt-16 pb-8 sm:pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">{title}</h1>
          {subtitle && <p className="text-base sm:text-lg text-muted">{subtitle}</p>}
          {lastUpdated && <p className="text-sm sm:text-base text-muted">Last Updated: {lastUpdated}</p>}
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 border border-border-mid rounded-control px-5 sm:px-6 py-2.5 text-sm font-semibold text-muted hover:border-maroon-deep/40 hover:text-maroon-deep w-full sm:w-auto shrink-0 transition-colors"
        >
          <Printer size={16} className="shrink-0" /> Print Document
        </button>
      </div>
    </div>
  );
}