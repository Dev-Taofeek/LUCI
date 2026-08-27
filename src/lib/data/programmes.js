// Temporary static data source. Once DATABASE_URL is live, replace these
// exports with `prisma.programme.findMany()` / `findUnique()` calls — the
// shape here matches the Programme model in prisma/schema.prisma exactly,
// so swapping the data layer won't require touching the page components.

export const PROGRAMMES = [
  {
    slug: "family-empowerment-workshop",
    category: "Family Development",
    status: "active",
    statusLabel: "Active",
    title: "Family Empowerment Workshop",
    summary:
      "Empowering local families through financial literacy, counseling, and community support systems to build sustainable futures.",
    location: "Lagos, Nigeria",
    dateRange: "Oct 2024 - Dec 2024",
    impactStat: "500+ Families Reached",
    ctaLabel: "View Programme",
    image:
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=800&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=1600&auto=format&fit=crop",
    detail: {
      overview:
        "The Family Empowerment Workshop equips local families with the practical tools they need to build stable, sustainable futures. Through hands-on financial literacy training, one-on-one counseling, and a peer support network, participating families gain lasting confidence in managing household finances, resolving internal conflict, and accessing community resources they may not have known were available to them.",
      objectives: [
        "Deliver financial literacy training to 500+ families.",
        "Provide ongoing counseling support to at-risk households.",
        "Build a peer support network across participating communities.",
      ],
      audience: {
        description:
          "This programme is designed for households facing financial strain or family instability who are ready to actively participate in structured support.",
        tags: ["Parents", "Guardians", "Low-Income Households", "First-Time Attendees"],
      },
      activities: [
        {
          title: "Financial Literacy Bootcamps",
          description:
            "Weekend workshops covering budgeting, savings, and basic entrepreneurship skills led by trained facilitators.",
        },
        {
          title: "Family Counseling Sessions",
          description:
            "Confidential one-on-one and group sessions addressing communication, conflict resolution, and household stress.",
        },
        {
          title: "Community Support Circles",
          description:
            "Monthly peer meetups where families share progress, resources, and encouragement with one another.",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1543342384-1f1350e27861?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
      ],
      stats: [
        { value: "500+", label: "Families Reached" },
        { value: "88%", label: "Report Improved Household Stability" },
        { value: "12", label: "Communities Served" },
      ],
      partners: ["GlobalFund", "CareNet", "Local Council", "GreenEarth"],
    },
  },
  {
    slug: "future-leaders-tech-hub",
    category: "Youth Initiative",
    status: "upcoming",
    statusLabel: "Upcoming",
    title: "Future Leaders Tech Hub",
    summary:
      "Equipping youth with digital skills, coding fundamentals, and mentorship to prepare them for the modern workforce.",
    location: "Accra, Ghana",
    dateRange: "Jan 2025 - Mar 2025",
    impactStat: "Goal: 200 Students",
    ctaLabel: "View Programme",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    detail: {
      overview:
        "Future Leaders Tech Hub is a launching initiative designed to close the digital skills gap for young people in Accra. Through a structured curriculum covering coding fundamentals, digital literacy, and career mentorship, the programme prepares participants to compete for opportunities in the modern, technology-driven workforce — regardless of their starting point.",
      objectives: [
        "Enroll and train 200 students in foundational coding skills.",
        "Pair every student with an industry mentor.",
        "Place 50+ graduates into internships or entry-level tech roles.",
      ],
      audience: {
        description:
          "Open to young people aged 16–24 with an interest in technology, regardless of prior coding experience.",
        tags: ["Youth (16-24)", "First-Gen Students", "Career Changers"],
      },
      activities: [
        {
          title: "Foundations Bootcamp",
          description:
            "An intensive 6-week introduction to programming logic, web basics, and digital tools.",
        },
        {
          title: "Mentorship Matching",
          description:
            "Each student is paired with a working tech professional for guidance throughout the programme.",
        },
        {
          title: "Capstone Showcase",
          description:
            "Students present a final project to local employers and partner organizations at a public demo day.",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?q=80&w=600&auto=format&fit=crop",
      ],
      stats: [
        { value: "200", label: "Target Enrollment" },
        { value: "1:1", label: "Mentor-to-Student Ratio" },
        { value: "Q1 2025", label: "Programme Launch" },
      ],
      partners: ["TechForward", "UN Dev", "Local University", "CodeBridge"],
    },
  },
  {
    slug: "clean-water-access-project",
    category: "Community Infrastructure",
    status: "completed",
    statusLabel: "Completed",
    title: "Clean Water Access Project",
    summary:
      "Installation of sustainable solar-powered water filtration systems in underserved rural communities.",
    location: "Nairobi, Kenya",
    dateRange: "Mar 2024 - Aug 2024",
    impactStat: "1,200 Lives Improved",
    ctaLabel: "View Report",
    image:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1600&auto=format&fit=crop",
    detail: {
      overview:
        "The Clean Water Access Project delivered sustainable, solar-powered water filtration systems to rural communities that previously relied on unsafe or distant water sources. Completed over six months in partnership with local engineers and community leaders, the project has already improved daily life for over a thousand residents and continues to be maintained by trained local technicians.",
      objectives: [
        "Install filtration systems in 8 underserved communities.",
        "Train local technicians for long-term system maintenance.",
        "Reduce water-borne illness rates in target villages.",
      ],
      audience: {
        description:
          "Rural communities without reliable access to clean drinking water, prioritized by need and existing infrastructure gaps.",
        tags: ["Rural Households", "Local Technicians", "Village Councils"],
      },
      activities: [
        {
          title: "Site Assessment & Engineering",
          description:
            "Engineers surveyed each site to design filtration systems suited to local water sources and terrain.",
        },
        {
          title: "System Installation",
          description:
            "Solar-powered filtration units were installed and connected to community distribution points.",
        },
        {
          title: "Local Technician Training",
          description:
            "Residents were trained and certified to maintain and repair the systems independently going forward.",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541953078845-1a8952f6b478?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544963129-46b9e105940b?q=80&w=600&auto=format&fit=crop",
      ],
      stats: [
        { value: "1,200", label: "Lives Improved" },
        { value: "8", label: "Communities Equipped" },
        { value: "100%", label: "Systems Still Operational" },
      ],
      partners: ["GreenEarth", "GlobalFund", "Water.org", "Local Council"],
    },
  },
  {
    slug: "unity-and-peace-summit",
    category: "Community Building",
    status: "active",
    statusLabel: "Active",
    title: "Unity & Peace Summit",
    summary:
      "Bridging divides and fostering lasting understanding among diverse cultural groups through structured dialogue.",
    location: "Nairobi, Kenya",
    dateRange: "Ongoing (Est. 2023)",
    impactStat: "320+ Leaders Trained",
    ctaLabel: "View Programme",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    detail: {
      overview:
        "The Unity & Peace Summit is a cornerstone initiative designed to bridge divides and foster deep, lasting understanding among diverse cultural groups within our communities. By bringing together community leaders, elders, youth representatives, and policymakers, we create a safe, structured environment for constructive dialogue. The programme focuses on conflict resolution training, shared cultural celebration, and collaborative problem-solving for local issues.",
      objectives: [
        "Train 500 local leaders in conflict resolution.",
        "Establish 20 ongoing cross-community dialogue circles.",
        "Reduce reported inter-community incidents by 30%.",
      ],
      audience: {
        description:
          "This program directly serves those positioned to influence positive change within their networks.",
        tags: ["Community Leaders", "Local Youth (18-35)", "Educators", "Civic Officials"],
      },
      activities: [
        {
          title: "Leadership Training Retreats",
          description:
            "Intensive 3-day workshops focusing on mediation, active listening, and restorative justice practices for selected community representatives.",
        },
        {
          title: "Youth Peace Forums",
          description:
            "Monthly gatherings where young people from differing backgrounds collaborate on community service projects, building trust through shared effort.",
        },
        {
          title: "Annual Summit",
          description:
            "A large-scale event showcasing progress, sharing stories of reconciliation, and setting community goals for the upcoming year.",
        },
      ],
      gallery: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop",
      ],
      stats: [
        { value: "95%", label: "Participant Satisfaction Rate" },
        { value: "320+", label: "Leaders Trained in 2023" },
        { value: "45", label: "Community Dialogues Hosted" },
      ],
      partners: ["Partner A", "Partner B", "Partner C", "Partner D"],
    },
  },
];

export function getProgrammeBySlug(slug) {
  return PROGRAMMES.find((p) => p.slug === slug);
}

export function getRelatedProgrammes(slug, count = 3) {
  return PROGRAMMES.filter((p) => p.slug !== slug).slice(0, count);
}