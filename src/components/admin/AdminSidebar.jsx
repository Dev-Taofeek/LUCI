"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarDays,
  BookOpen,
  Newspaper,
  Wallet,
  Users,
  ShieldAlert,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/programmes", label: "Programmes", icon: FolderKanban },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/resources", label: "Resources", icon: BookOpen },
  { href: "/admin/news", label: "News & Insights", icon: Newspaper },
  { href: "/admin/donations", label: "Donations", icon: Wallet },
  { href: "/admin/people", label: "People", icon: Users },
  {
    href: "/admin/safeguarding",
    label: "Safeguarding",
    icon: ShieldAlert,
    roles: ["SAFEGUARDING_OFFICER", "SUPER_ADMIN"],
  },
  { href: "/admin/settings", label: "Settings", icon: Settings, roles: ["SUPER_ADMIN"] },
];

export default function AdminSidebar({ role, userName }) {
  const pathname = usePathname();

  const navLinks = (
    <nav className="flex-1 px-2 sm:px-3 py-4 sm:py-6 flex flex-col gap-1 overflow-y-auto">
      {NAV_ITEMS.filter((item) => !item.roles || item.roles.includes(role)).map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-control text-sm transition-colors",
              active
                ? "bg-white/10 text-gold font-semibold"
                : "text-warm-white/70 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon size={18} className="shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="px-4 sm:px-5 lg:px-6 py-4 border-t border-white/10 flex flex-col gap-3">
      <div className="text-sm text-warm-white/70 truncate">
        Signed in as <span className="text-white font-semibold">{userName}</span>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="flex items-center gap-2 text-sm text-warm-white/70 hover:text-white w-fit"
      >
        <LogOut size={15} className="shrink-0" /> Sign Out
      </button>
    </div>
  );

  return (
    <>
      <MobileSidebar key={pathname} navLinks={navLinks} footer={footer} />

      <aside className="hidden md:flex w-56 lg:w-64 xl:w-72 shrink-0 bg-maroon-deep min-h-screen flex-col sticky top-0 self-start">
        <div className="px-5 lg:px-6 py-5 lg:py-6 border-b border-white/10">
          <span className="font-display text-xl lg:text-[22px] font-semibold text-white">
            LUCI
          </span>
          <span className="block text-xs text-gold btn-tracking uppercase">Admin</span>
        </div>
        {navLinks}
        {footer}
      </aside>
    </>
  );
}

function MobileSidebar({ navLinks, footer }) {
  const [open, setOpen] = useState(false);

  // Lock background scroll while the drawer is open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Mobile/tablet top bar */}
      <div className="md:hidden sticky top-0 z-40 bg-maroon-deep flex items-center justify-between px-3 sm:px-4 py-3 border-b border-white/10">
        <div>
          <span className="font-display text-base sm:text-lg font-semibold text-white">
            LUCI
          </span>
          <span className="block text-[10px] text-gold btn-tracking uppercase leading-none">
            Admin
          </span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="admin-mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40 animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Off-canvas drawer */}
      <aside
        id="admin-mobile-menu"
        className={cn(
          "md:hidden fixed top-0 left-0 bottom-0 z-50 w-[85vw] xs:w-72 max-w-[320px] bg-maroon-deep flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-4 sm:px-5 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="font-display text-lg sm:text-xl font-semibold text-white">
              LUCI
            </span>
            <span className="block text-xs text-gold btn-tracking uppercase">Admin</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white p-1"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        {navLinks}
        {footer}
      </aside>
    </>
  );
}