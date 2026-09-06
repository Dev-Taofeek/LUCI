import EventsContent from "@/components/site/EventsContent";
import { listEvents } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Events & Gatherings",
  description:
    "Join the Love, Unity, and Care Initiative at our community workshops, conferences, and volunteer gatherings.",
};

export default async function EventsIndexPage() {
  const events = await listEvents();
  return <EventsContent events={events} />;
}