import Link from "next/link";

const LINK_COLUMNS = [
  [
    { label: "Newsletter Signup", href: "/#newsletter" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  [
    { label: "Contact Us", href: "/contact" },
    { label: "Partner With Us", href: "/get-involved#partnership" },
  ],
  [{ label: "Careers", href: "/careers" }],
];

export default function Footer() {
  return (
    <footer className="bg-maroon-deep">
      <div className="container-luci px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 sm:gap-8">
          <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
            <span className="font-display text-xl sm:text-[22px] font-semibold text-white">
              LUCI
            </span>
            <p className="text-sm text-warm-white/80 max-w-[28rem]">
              Love, Unity, and Care Initiative. Building stronger, more
              cohesive communities through compassion and action.
            </p>
          </div>

          {LINK_COLUMNS.map((col, i) => (
            <div key={i} className="flex flex-col gap-3 sm:gap-4">
              {col.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-warm-white/80 hover:text-warm-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-warm-white/20 mt-8 sm:mt-10 lg:mt-12 pt-5 sm:pt-6">
          <p className="text-xs sm:text-sm text-warm-white/60">
            © {new Date().getFullYear()} Living Unity Core Initiative
            (LUCI). All rights reserved. Registered NGO.
          </p>
        </div>
      </div>
    </footer>
  );
}