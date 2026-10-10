import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://luci-pi.vercel.app";
const siteName = "LUCI — Living Unity Core Initiative";

const siteDescription =
  "Promoting and fostering beauty in diversity through family space to achieve better society and nation: A more perfect union.";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "LUCI - Sound Families make Sound Society and Sound Nation",
    template: "%s | LUCI",
  },

  description: siteDescription,
  applicationName: siteName,

  keywords: [
    "LUCI",
    "Living Unity Core Initiative",
    "building bridges",
    "family commitment",
    "family unity",
    "community building",
    "NGO",
    "diversity",
    "unity",
  ],

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "LUCI - Sound Families make Sound Society and Sound Nation",
    description: siteDescription,
    images: [
      {
        url: "/hero-home.jpg",
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LUCI - Sound Families make Sound Society and Sound Nation",
    description: siteDescription,
    images: ["/hero-home.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#841818",
};

export default function SiteLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${manrope.variable} bg-warm-white font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:text-maroon-deep focus:px-4 focus:py-2.5 focus:rounded-control focus:shadow-md focus:font-semibold"
        >
          Skip to main content
        </a>

        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}