import { Suspense } from "react";
import ProgrammesContent from "@/components/site/ProgrammesContent";
import { listProgrammes } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Programmes",
  description:
    "Explore the programmes of the Love, Unity, and Care Initiative — community, family, and youth projects in action.",
};

export default async function ProgrammesIndexPage() {
  const programmes = await listProgrammes();
  return (
    <Suspense>
      <ProgrammesContent programmes={programmes} />
    </Suspense>
  );
}