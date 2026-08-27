// Static stand-in for prisma.event.findMany()/findUnique() — same note as
// lib/data/programmes.js. Shape mirrors the Event model in schema.prisma.

export const EVENTS = [
  {
    slug: "annual-global-care-summit-2024",
    title: "Annual Global Care Summit 2024",
    date: "October 15, 2024",
    summary:
      "Our flagship event bringing together global leaders, local changemakers, and volunteers to discuss sustainable community care strategies.",
    location: "Nairobi International Conference Centre",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    dateRange: "October 15, 2024",
    time: "09:00 AM - 05:00 PM (EAT)",
    venue: "Nairobi International Conference Centre",
    seatsRemaining: 120,
    description: [
      "The Annual Global Care Summit is LUCI's flagship gathering, bringing together global leaders, local changemakers, and dedicated volunteers under one roof to discuss sustainable strategies for community care and social cohesion.",
      "This year's summit focuses on scaling grassroots impact, forging cross-border partnerships, and sharing lessons learned from a decade of family and community-strengthening work across the region.",
      "Attendees will leave with practical frameworks, new collaborators, and renewed momentum for the work ahead.",
    ],
    speakers: [
      {
        name: "Amina Bello",
        role: "Founder & Executive Director, LUCI",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "David Ojo",
        role: "Director of Programmes, LUCI",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      },
    ],
    organisers: ["LUCI Foundation", "Global Care Initiative"],
  },
  {
    slug: "community-leadership-workshop-2024",
    title: "Community Leadership Workshop 2024",
    date: "October 15, 2024",
    summary:
      "A transformative two-day workshop empowering local community leaders with sustainable development strategies.",
    location: "Nairobi Community Center & Virtual",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    dateRange: "October 15 - 16, 2024",
    time: "09:00 AM - 04:00 PM (EAT)",
    venue: "Nairobi Community Center & Virtual",
    seatsRemaining: 45,
    description: [
      "Join us for a transformative two-day workshop designed to empower local community leaders with sustainable development strategies. This intensive programme bridges traditional values with modern organizational techniques.",
      "Participants will engage in hands-on sessions focusing on conflict resolution, resource management, and grassroots mobilization. Our goal is to foster a network of capable leaders who can drive positive change within their respective regions.",
      "Expect interactive discussions, case studies tailored to regional challenges, and invaluable networking opportunities with peers and mentors from across the continent.",
    ],
    speakers: [
      {
        name: "Dr. Amina Okafor",
        role: "Director of Community Development, LUCI",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Samuel Mensah",
        role: "Grassroots Strategist",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      },
    ],
    organisers: ["LUCI Foundation", "Global Care Initiative"],
  },
  {
    slug: "youth-education-seminar",
    title: "Youth Education Seminar",
    date: "November 12, 2024",
    summary:
      "Focusing on early childhood educational support structures and the resources caregivers need to succeed.",
    location: "Accra Regional Learning Hub",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop",
    dateRange: "November 12, 2024",
    time: "10:00 AM - 02:00 PM (GMT)",
    venue: "Accra Regional Learning Hub",
    seatsRemaining: 80,
    description: [
      "This seminar brings together educators, caregivers, and policy advocates to explore practical, evidence-based approaches to early childhood education support.",
      "Sessions will cover accessible learning resources, caregiver training models, and community-driven education initiatives that have shown measurable results across the region.",
    ],
    speakers: [
      {
        name: "Grace Adeyemi",
        role: "Early Childhood Education Lead, LUCI",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
      },
    ],
    organisers: ["LUCI Foundation"],
  },
];

export function getEventBySlug(slug) {
  return EVENTS.find((e) => e.slug === slug);
}

export function getRelatedEvents(slug, count = 2) {
  return EVENTS.filter((e) => e.slug !== slug).slice(0, count);
}