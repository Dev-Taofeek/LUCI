export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

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
import { StatTile, StatusPill } from "@/components/admin/AdminUi";

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
    <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 md:p-8">
      <div>
        <h1 className="text-2xl sm:text-3xl">Dashboard</h1>
        <p className="text-sm sm:text-base">
          Overview of LUCI&apos;s programmes, engagement, and giving.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
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

      <div className="bg-white border border-border-light rounded-card p-4 sm:p-5 md:p-6">
        <h2 className="text-lg sm:text-xl mb-3 sm:mb-4">Recent Donations</h2>
        {recentDonations.length === 0 ? (
          <p className="text-muted text-sm sm:text-base">No donations recorded yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentDonations.map((d) => (
              <div
                key={d.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 border-b border-border-light/60 last:border-0 pb-3 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-charcoal mb-0 text-sm sm:text-base truncate">
                    {d.donorEmail}
                  </p>
                  <p className="text-sm mb-0 truncate">{d.designation}</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span className="font-semibold text-maroon-deep text-sm sm:text-base">
                    {(d.amount / 100).toLocaleString(undefined, {
                      style: "currency",
                      currency: d.currency,
                    })}
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