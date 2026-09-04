import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

// was bg #f9f9f9 / border rgba(191,201,196,.5) -> white / border-mid
export function EventInfoCard({ dateRange, time, venue, seatsRemaining }) {
  return (
    <div className="bg-white border border-border-mid/50 shadow-[0_4px_10px_rgba(110,15,26,0.04)] rounded-[12px] p-8 flex flex-col gap-6">
      <h3 className="!text-[28px]">Event Details</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Calendar size={20} className="text-maroon-deep shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-charcoal mb-0">Date</p>
            <p className="mb-0 font-thin">{dateRange}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Clock size={20} className="text-maroon-deep shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-charcoal mb-0">Time</p>
            <p className="mb-0 font-thin">{time}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <MapPin size={20} className="text-maroon-deep shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-charcoal mb-0">Venue</p>
            <p className="mb-0 font-thin">{venue}</p>
          </div>
        </div>
      </div>

      {/* was bg #94d3c1 text #00201a (mint "positive" indicator) -> gold-light / maroon-deep */}
      <div className="border-t border-border-light pt-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-charcoal btn-tracking">
            Availability
          </span>
          <span className="bg-gold-light text-maroon-deep text-xs font-semibold rounded-full px-3 py-1">
            Registration Open
          </span>
        </div>
        <p className="text-sm text-gold">{seatsRemaining} seats remaining</p>
      </div>
    </div>
  );
}

export function SpeakerCard({ name, role, image }) {
  return (
    <div className="flex-1 bg-white border border-border-mid/30 rounded-control p-6 flex items-center gap-6">
      <div className="relative size-16 rounded-full overflow-hidden shrink-0">
        {image && <Image src={image} alt={name} fill className="object-cover" />}
      </div>
      <div>
        <h3 className="!text-[22px]">{name}</h3>
        <p className="text-sm mb-0 font-thin">{role}</p>
      </div>
    </div>
  );
}