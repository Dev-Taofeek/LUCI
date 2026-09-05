import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";

export function EventInfoCard({ dateRange, time, venue, seatsRemaining }) {
  return (
    <div className="bg-white border border-border-mid shadow-card rounded-card p-8 flex flex-col gap-6">
      <h3 className="text-xl sm:text-2xl">Event Details</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Calendar size={20} className="text-maroon-deep shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-charcoal">Date</p>
            <p className="text-charcoal">{dateRange}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Clock size={20} className="text-maroon-deep shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-charcoal">Time</p>
            <p className="text-charcoal">{time}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <MapPin size={20} className="text-maroon-deep shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-charcoal">Venue</p>
            <p className="text-charcoal">{venue}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border-light pt-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-charcoal">Availability</span>
          <span className="bg-gold-light text-maroon-deep text-xs font-semibold rounded-full px-3 py-1">
            Registration Open
          </span>
        </div>
        <p className="text-sm text-maroon-deep">{seatsRemaining} seats remaining</p>
      </div>
    </div>
  );
}

export function SpeakerCard({ name, role, image }) {
  return (
    <div className="flex-1 bg-white border border-border-mid rounded-control p-6 flex items-center gap-6">
      <div className="relative size-16 rounded-full overflow-hidden shrink-0">
        {image && <Image src={image} alt={name} fill className="object-cover" />}
      </div>
      <div>
        <h3 className="text-lg sm:text-xl">{name}</h3>
        <p className="text-sm text-muted">{role}</p>
      </div>
    </div>
  );
}