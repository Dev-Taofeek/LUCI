export const HERO_STAT = {
  value: "1,500+",
  label: "FAMILIES REACHED",
  delta: "+24% from last year",
};

export const STATS = [
  { value: "5,000+", label: "People Engaged", variant: "white" },
  { value: "15", label: "Active Partners", variant: "dark" },
  { value: "300", label: "Dedicated Volunteers", variant: "white" },
  { value: "12", label: "COMMUNITIES", variant: "compact" },
  { value: "24", label: "PROGRAMMES", variant: "compact" },
];

export const MAP_PINS = [
  { name: "Lagos", top: "72%", left: "26%", type: "programme", highlighted: true },
  { name: "Abuja", top: "54%", left: "35%", type: "programme" },
  { name: "Port Harcourt", top: "84%", left: "31%", type: "programme" },
  { name: "Nairobi", top: "36%", left: "78%", type: "hub" },
];

// Distinct swatches drawn from the 7 LUCI tokens to stand in for the original
// green/gold/brown chart palette.
export const ALLOCATION = [
  { label: "Family Support", value: 35, color: "#6E0F1A" }, // maroon-deep
  { label: "Community Dev", value: 25, color: "#4A0810" }, // maroon-dark
  { label: "Youth Empowerment", value: 20, color: "#C9A227" }, // gold
  { label: "Unity Initiatives", value: 15, color: "#F0DFA8" }, // gold-light
  { label: "Diversity Programs", value: 5, color: "#252525" }, // charcoal
];

export const STORIES = [
  {
    location: "Lagos",
    title: "Rebuilding After the Flood: The Okafor Family",
    quote:
      "LUCI didn't just give us supplies; they helped us rebuild our sense of community when we thought we had lost everything.",
    image:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=800&auto=format&fit=crop",
  },
  {
    location: "Nairobi",
    title: "Youth Voices Leading Urban Renewal",
    quote:
      "We are no longer waiting for leaders to fix our neighborhoods. With LUCI's training, we are designing our own future.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
  },
  {
    location: "Port Harcourt",
    title: "Bridging Generations Through Heritage",
    quote:
      "The unity project brought our elders and youth together to document stories that would have otherwise vanished.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  },
];

export const REPORTS = [
  { title: "2023 Annual Report", meta: "PDF • 4.2 MB", href: "#" },
  { title: "2022 Financial Audit", meta: "PDF • 1.8 MB", href: "#" },
];
