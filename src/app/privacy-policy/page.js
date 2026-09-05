import LegalPageHeader from "@/components/sections/LegalPageHeader";
import TOCSidebar from "@/components/sections/TOCSidebar";
import LegalSection from "@/components/sections/LegalSection";
import { PRIVACY_POLICY } from "@/lib/data/legal";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How LUCI collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  const { title, lastUpdated, sections } = PRIVACY_POLICY;
  const tocSections = sections.map((s) => ({ id: s.id, title: s.title }));

  return (
    <>
      <LegalPageHeader title={title} lastUpdated={lastUpdated} />
      <div className="container-luci py-8 sm:py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12">
        <div className="md:col-span-3">
          <TOCSidebar sections={tocSections} />
        </div>
        <div className="md:col-span-9 bg-white border border-border-light rounded-card p-5 sm:p-8 md:p-12 flex flex-col gap-8 sm:gap-10 md:gap-12">
          {sections.map((s) => (
            <LegalSection key={s.id} {...s} />
          ))}
        </div>
      </div>
    </>
  );
}