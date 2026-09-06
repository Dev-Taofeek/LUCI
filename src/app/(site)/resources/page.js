import ResourcesContent from "@/components/site/ResourcesContent";
import { listResources, getFeaturedResource } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Resources",
  description:
    "Explore research, reports, and practical guides from the LUCI Knowledge Library.",
};

export default async function ResourcesIndexPage() {
  const [resources, featured] = await Promise.all([listResources(), getFeaturedResource()]);
  return <ResourcesContent resources={resources} featured={featured} />;
}