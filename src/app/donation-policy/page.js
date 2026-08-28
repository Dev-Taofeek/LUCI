import { ShieldCheck } from "lucide-react";
import LegalPageHeader from "@/components/sections/LegalPageHeader";
import TOCSidebar from "@/components/sections/TOCSidebar";
import LegalSection from "@/components/sections/LegalSection";
import { DONATION_POLICY } from "@/lib/data/legal";

export default function DonationPolicyPage() {
  const { title, subtitle, lastUpdated, notice, sections } = DONATION_POLICY;
  const tocSections = sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <>
      <LegalPageHeader title={title} subtitle={subtitle} lastUpdated={lastUpdated} />
      <div className="max-w-container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
        <div className="md:col-span-3">
          <TOCSidebar sections={tocSections} />
        </div>
        <div className="md:col-span-9 flex flex-col gap-6 sm:gap-8">
          {notice && (
            <div className="bg-gold/10 border border-gold/30 rounded p-4 sm:p-6 flex items-start sm:items-center gap-3 sm:gap-4">
              <ShieldCheck className="text-gold shrink-0 mt-0.5 sm:mt-0" size={20} />
              <p className="text-sm !text-charcoal mb-0">{notice}</p>
            </div>
          )}
          <div className="bg-white border border-border-light rounded-[8px] shadow-[0_4px_10px_rgba(110,15,26,0.02)] p-5 sm:p-8 md:p-12 flex flex-col gap-8 sm:gap-10 md:gap-12">
            {sections.map((s) => (
              <LegalSection key={s.id} {...s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}