import AdminSessionProvider from "@/components/admin/AdminSessionProvider";

// Belt-and-suspenders alongside robots.txt: tells any crawler that does
// somehow reach an admin page not to index it.
export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return (
    <AdminSessionProvider>
      <div className="min-h-screen bg-warm-white">{children}</div>
    </AdminSessionProvider>
  );
}
