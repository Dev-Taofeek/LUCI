"use client";
import { Printer } from "lucide-react";

export default function LegalPageHeader({ title, subtitle, lastUpdated }) {
  return (
    <div className="bg-white border-b border-border-light px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-20 pb-8 sm:pb-10 md:pb-12 flex justify-center">
      <div className="max-w-container w-full px-0 sm:px-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl leading-tight">{title}</h1>
          {subtitle && <p className="text-base sm:text-lg">{subtitle}</p>}
          {lastUpdated && <p className="text-sm sm:text-base">Last Updated: {lastUpdated}</p>}
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 border border-border-mid rounded px-5 sm:px-6 py-2 text-sm font-semibold text-muted btn-tracking hover:border-maroon-deep/40 hover:text-maroon-deep w-full sm:w-auto shrink-0"
        >
          <Printer size={16} className="shrink-0" /> Print Document
        </button>
      </div>
    </div>
  );
}