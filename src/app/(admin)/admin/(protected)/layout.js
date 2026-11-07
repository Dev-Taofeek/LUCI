import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ConfirmProvider } from "@/components/admin/ConfirmProvider";

export default async function ProtectedAdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-dvh flex-col md:flex-row overflow-hidden">
      <AdminSidebar role={session.user.role} userName={session.user.name} />
      <main className="flex-1 min-w-0 w-full overflow-y-auto p-4 sm:p-6 lg:p-10">
        <ConfirmProvider>{children}</ConfirmProvider>
      </main>
    </div>
  );
}