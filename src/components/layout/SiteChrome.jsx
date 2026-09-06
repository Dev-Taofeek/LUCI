"use client";

import { usePathname } from "next/navigation";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <TopNavBar />}

      <main
        id="main"
        className={isAdminPage ? "min-h-screen" : "pt-16 lg:pt-20 min-h-screen"}
      >
        {children}
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}