import {
  FolderKanban,
  CalendarDays,
  BookOpen,
  Newspaper,
  Wallet,
  Users,
  ShieldAlert,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { StatTile, StatusPill } from "@/components/admin/AdminUI";

export default async function AdminDashboardPage() {
  const [
    programmeCount,
    eventCount,
    resourceCount,
    articleCount,
    donationAgg,
    volunteerCount,
    openSafeguardingCount,
    recentDonations,
  ] = await Promise.all([
    prisma.programme.count(),
    prisma.event.count(),
    prisma.resource.count(),
    prisma.article.count(),
    prisma.donation.aggregate({ _sum: { amount: true }, where: { status: "SUCCESS" } }),
    prisma.volunteerApplication.count({ where: { status: "NEW" } }),
    prisma.safeguardingReport.count({ where: { status: "OPEN" } }),
    prisma.donation.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const totalRaised = ((donationAgg._sum.amount || 0) / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="!text-[28px]">Dashboard</h1>
        <p>Overview of LUCI&apos;s programmes, engagement, and giving.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <StatTile label="Active Programmes" value={programmeCount} icon={FolderKanban} />
        <StatTile label="Upcoming Events" value={eventCount} icon={CalendarDays} />
        <StatTile label="Total Raised" value={totalRaised} icon={Wallet} />
        <StatTile label="New Volunteer Applications" value={volunteerCount} icon={Users} />
        <StatTile label="Resources Published" value={resourceCount} icon={BookOpen} />
        <StatTile label="Articles" value={articleCount} icon={Newspaper} />
        {openSafeguardingCount > 0 && (
          <StatTile
            label="Open Safeguarding Reports"
            value={openSafeguardingCount}
            icon={ShieldAlert}
          />
        )}
      </div>

      <div className="bg-white border border-border-light rounded-[12px] p-6">
        <h2 className="!text-[20px] mb-4">Recent Donations</h2>
        {recentDonations.length === 0 ? (
          <p className="text-muted">No donations recorded yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentDonations.map((d) => (
              <div key={d.id} className="flex items-center justify-between border-b border-border-light/60 last:border-0 pb-3 last:pb-0">
                <div>
                  <p className="font-semibold text-charcoal mb-0">{d.donorEmail}</p>
                  <p className="text-sm mb-0">{d.designation}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-maroon-deep">
                    {(d.amount / 100).toLocaleString(undefined, { style: "currency", currency: d.currency })}
                  </span>
                  <StatusPill status={d.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
