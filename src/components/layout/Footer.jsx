import Link from "next/link";

const BOTTOM_ROW_LINKS = [
  { label: "What we do", href: "/what-we-do" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
];

const LINK_COLUMNS = [
  [
    { label: "Donation Policy", href: "/donation-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Use", href: "/terms-of-use" },
  ],
  [
    { label: "Contact Us", href: "/contact" },
    { label: "Partner With Us", href: "/get-involved#partnership" },
    { label: "Safeguarding", href: "/safeguarding" },
  ],
];

export default function Footer() {
  return (
    <footer className="bg-maroon-deep">
      <div className="container-luci px-4 sm:px-6 py-10 sm:py-12 lg:py-16 border-t border-warm-white/20 pt-5 sm:pt-6">
        <div className="flex flex-col md:flex-row gap-10 sm:gap-12 md:justify-between">
          {/* Left: LUCI blurb + row of 3 links below it */}
          <div className="flex flex-col gap-5 sm:gap-6 max-w-md">
            <div className="flex flex-col gap-3 sm:gap-4">
              <span className="font-display text-xl sm:text-[22px] font-semibold text-white">
                LUCI
              </span>
              <p className="text-sm text-warm-white/80">
                Living Unity Core Initiative. Building bridges, One Family at a time.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {BOTTOM_ROW_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-warm-white/80 hover:text-warm-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: two columns of 3, flex-col each */}
          <div className="flex wrap gap-10 sm:gap-16 md:gap-20">
            {LINK_COLUMNS.map((col, i) => (
              <div key={i} className="flex flex-col gap-3 sm:gap-4">
                {col.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-warm-white/80 hover:text-warm-white whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 sm:mt-6 lg:mt-8 pt-5 sm:pt-6">
          <p className="text-xs sm:text-sm text-warm-white/60">
            © {new Date().getFullYear()} Living Unity Core Initiative
            (LUCI). All rights reserved. Registered NGO.
          </p>
        </div>
      </div>
    </footer>
  );
}