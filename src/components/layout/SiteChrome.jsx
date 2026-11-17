"use client";

import { usePathname } from "next/navigation";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isHome = pathname === "/";

  // The home page ends where its content ends (no forced full-screen height),
  // so there is no blank strip under the hero. Other pages keep min-h-screen
  // so the footer stays at the bottom of short pages.
  const mainClass = isAdminPage
    ? "min-h-screen"
    : isHome
      ? "pt-16 lg:pt-20"
      : "pt-16 lg:pt-20 min-h-screen";

  return (
    <>
      {!isAdminPage && <TopNavBar />}

      <main id="main" className={mainClass}>
        {children}
      </main>

      {!isAdminPage && <Footer />}
    </>
  );
}