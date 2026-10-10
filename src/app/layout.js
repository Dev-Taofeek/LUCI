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
  "Promoting and fostering beauty in diversity through family space to achieve better society and nation(s): A more perfect union. Sound Families make Sound Society and Sound Nation.";

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
    "The Bridge Building Family Organization",
    "relational bridges",
    "family enrichment",
    "national unity",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/luci-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/luci-favicon-32.png"],
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "LUCI - Sound Families make Sound Society and Sound Nation",
    description: siteDescription,
    images: [
      {
        url: "/luci-logo.png",
        width: 1600,
        height: 998,
        alt: siteName,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LUCI - Sound Families make Sound Society and Sound Nation",
    description: siteDescription,
    images: ["/luci-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#841818",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "LUCI — Living Unity Core Initiative",
  alternateName: "The Bridge Building Family Organization",
  url: siteUrl,
  description: siteDescription,
  slogan: "Building Bridges, a Family Commitment.",
  email: "co-ordinator@luci-ng.org",
  telephone: "+234-802-885-2121",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5, Obafemi Awolowo way, P.O. Box 14008",
    addressLocality: "Ikeja",
    addressRegion: "Lagos",
    addressCountry: "NG",
  },
};

export default function SiteLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${manrope.variable} bg-warm-white font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
