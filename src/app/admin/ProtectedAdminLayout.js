import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Defense in depth: middleware.js already blocks this at the edge, but the
  // layout checks again server-side so this route is never accidentally
  // reachable if middleware config ever changes.
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex">
      <AdminSidebar role={session.user.role} userName={session.user.name} />
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}