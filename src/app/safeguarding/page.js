import LegalPageHeader from "@/components/sections/LegalPageHeader";
import TOCSidebar from "@/components/sections/TOCSidebar";
import LegalSection from "@/components/sections/LegalSection";
import SafeguardingReportForm from "@/components/sections/SafeguardingReportForm";
import { SAFEGUARDING_POLICY } from "@/lib/data/legal";

export const metadata = {
  title: "Safeguarding & Child Protection Policy",
  description:
    "LUCI safeguarding policy and how we protect the people we serve, including secure reporting.",
};

export default function SafeguardingPage() {
  const { title, subtitle, lastUpdated, sections } = SAFEGUARDING_POLICY;
  const tocSections = sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <>
      <LegalPageHeader title={title} subtitle={subtitle} lastUpdated={lastUpdated} />
      <div className="container-luci py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
        <div className="md:col-span-3">
          <TOCSidebar sections={tocSections} />
        </div>
        <div className="md:col-span-9 bg-white border border-border-light rounded-card p-5 sm:p-8 md:p-12 flex flex-col gap-8 sm:gap-10 md:gap-12">
          {sections.map((s) =>
            s.isReportForm ? (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-20 sm:scroll-mt-24 md:scroll-mt-28"
              >
                <SafeguardingReportForm />
              </section>
            ) : (
              <LegalSection key={s.id} {...s} />
            )
          )}
        </div>
      </div>
    </>
  );
}