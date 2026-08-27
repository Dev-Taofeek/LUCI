import "./globals.css";
import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "LUCI - Building Bridges, One Family at a Time",
  description: "temp build check",
};

export default function SiteLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopNavBar />

        <main className="pt-20">{children}</main>

        <Footer />
      </body>
    </html>
  );
}