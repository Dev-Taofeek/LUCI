"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { ALLOCATION } from "@/lib/data/impact";

export function AllocationList() {
  return (
    <div className="bg-white border border-border-light rounded-md p-5 sm:p-6 md:p-8 w-full max-w-sm shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <ul className="flex flex-col gap-3 sm:gap-4">
        {ALLOCATION.map((item, i) => (
          <li
            key={item.label}
            className={`flex items-center justify-between gap-3 ${
              i < ALLOCATION.length - 1 ? "border-b border-border-light pb-3 sm:pb-4" : ""
            }`}
          >
            <span className="flex items-center gap-3 min-w-0">
              <span className="size-3 rounded-md shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-sm sm:text-base text-charcoal truncate">{item.label}</span>
            </span>
            <span className="text-sm sm:text-base text-muted shrink-0">{item.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AllocationRadarChart() {
  const data = ALLOCATION.map((a) => ({ label: a.label, value: a.value }));
  return (
    <div className="w-full max-w-xl h-[280px] sm:h-[340px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="#E7E1DF" />
          <PolarAngleAxis dataKey="label" tick={{ fill: "#6B6464", fontSize: 11 }} />
          <Radar
            name="Allocation"
            dataKey="value"
            stroke="#6E0F1A"
            fill="#6E0F1A"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}