import Image from "next/image";
import { Mail, Phone, MapPin, MessageCircle, MapPinned } from "lucide-react";

export function ContactInfoCard() {
  return (
    <div className="bg-white border border-border-mid rounded-card p-5 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6">
      <h2 className="text-2xl sm:text-3xl">Contact Information</h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-3 sm:gap-4 items-center p-3 sm:p-4 rounded-card hover:bg-warm-white">
          <Mail size={20} className="text-maroon-deep shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-charcoal text-sm sm:text-base">Email</p>
            <p className="text-sm sm:text-base text-charcoal break-words">info@luci-initiative.org</p>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-4 items-center p-3 sm:p-4 rounded-card hover:bg-warm-white">
          <Phone size={18} className="text-maroon-deep shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-charcoal text-sm sm:text-base">Phone</p>
            <p className="text-sm sm:text-base text-charcoal break-words">+234 800 LUCI CARE</p>
          </div>
        </div>
        <div className="flex gap-3 sm:gap-4 items-start p-3 sm:p-4 rounded-card hover:bg-warm-white">
          <MapPin size={16} className="text-maroon-deep shrink-0 mt-1" />
          <div className="min-w-0">
            <p className="font-semibold text-charcoal text-sm sm:text-base">Office Address</p>
            <p className="text-sm sm:text-base text-charcoal">123 Community Way, Suite 400</p>
            <p className="text-sm sm:text-base text-charcoal">Lagos, Nigeria</p>
          </div>
        </div>
      </div>
      <div className="border-t border-border-mid/30 pt-4">
        <a
          href="https://wa.me/23480058242273"
          className="bg-border-light border border-border-mid/50 rounded-control h-[52px] sm:h-[58px] flex items-center justify-center gap-2 sm:gap-3 text-sm font-semibold text-maroon-deep hover:bg-border-mid/50"
        >
          <MessageCircle size={20} className="shrink-0" /> Chat on WhatsApp
        </a>
      </div>
    </div>
  );
}

const MAP_IMAGE =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop";

export function MapCard() {
  return (
    <div className="relative h-48 sm:h-56 md:h-64 w-full rounded-card overflow-hidden border border-border-light">
      <Image
        src={MAP_IMAGE}
        alt="LUCI office location"
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-maroon-deep/10" />
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/90 rounded-control px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-2">
        <MapPinned size={14} className="text-maroon-deep shrink-0" />
        <span className="text-xs sm:text-sm font-semibold text-maroon-deep">View on Map</span>
      </div>
    </div>
  );
}