const { PrismaClient } = require("../generated/prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@127.0.0.1:5432/luci",
  }),
});

// Flattened from the old lib/data/programmes.js mock shape into the current
// Programme schema (Phase 16) — this is now the canonical seed source for
// programme content, since the public site reads from Prisma directly.
const PROGRAMMES = [
  {
    slug: "family-empowerment-workshop",
    category: "Family Development",
    status: "ACTIVE",
    title: "Family Empowerment Workshop",
    summary:
      "Empowering local families through financial literacy, counseling, and community support systems to build sustainable futures.",
    description:
      "Empowering local families through financial literacy, counseling, and community support systems to build sustainable futures.",
    location: "Lagos, Nigeria",
    startDate: new Date("2024-10-01"),
    endDate: new Date("2024-12-15"),
    impactStat: "500+ Families Reached",
    heroImage:
      "https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?q=80&w=800&auto=format&fit=crop",
    galleryImages: [],
    objectives: [],
    partners: [],
  },
  {
    slug: "future-leaders-tech-hub",
    category: "Youth Initiative",
    status: "UPCOMING",
    title: "Future Leaders Tech Hub",
    summary:
      "Equipping youth with digital skills, coding fundamentals, and mentorship to prepare them for the modern workforce.",
    description:
      "Equipping youth with digital skills, coding fundamentals, and mentorship to prepare them for the modern workforce.",
    location: "Accra, Ghana",
    startDate: new Date("2025-01-10"),
    endDate: new Date("2025-03-20"),
    impactStat: "Goal: 200 Students",
    heroImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
    galleryImages: [],
    objectives: [],
    partners: [],
  },
  {
    slug: "clean-water-access-project",
    category: "Community Infrastructure",
    status: "COMPLETED",
    title: "Clean Water Access Project",
    summary:
      "Installation of sustainable solar-powered water filtration systems in underserved rural communities.",
    description:
      "Installation of sustainable solar-powered water filtration systems in underserved rural communities.",
    location: "Nairobi, Kenya",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-08-15"),
    impactStat: "1,200 Lives Improved",
    heroImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
    galleryImages: [],
    objectives: [],
    partners: [],
  },
  {
    slug: "unity-and-peace-summit",
    category: "Community Building",
    status: "ACTIVE",
    title: "Unity & Peace Summit",
    summary:
      "Bridging divides and fostering lasting understanding among diverse cultural groups through structured dialogue.",
    description:
      "The Unity & Peace Summit is a cornerstone initiative designed to bridge divides and foster deep, lasting understanding among diverse cultural groups within our communities. By bringing together community leaders, elders, youth representatives, and policymakers, we create a safe, structured environment for constructive dialogue. The programme focuses on conflict resolution training, shared cultural celebration, and collaborative problem-solving for local issues.",
    location: "Nairobi, Kenya",
    startDate: new Date("2023-01-01"),
    endDate: null,
    impactStat: "320+ Leaders Trained",
    heroImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop",
    ],
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
    stats: [
      { value: "95%", label: "Participant Satisfaction Rate" },
      { value: "320+", label: "Leaders Trained in 2023" },
      { value: "45", label: "Community Dialogues Hosted" },
    ],
    partners: ["Partner A", "Partner B", "Partner C", "Partner D"],
  },
];

const EVENTS = [
  {
    slug: "annual-global-care-summit-2026",
    title: "Annual Global Care Summit 2026",
    summary:
      "Our flagship event bringing together global leaders, local changemakers, and volunteers to discuss sustainable community care strategies.",
    description:
      "Join us for a transformative gathering of leaders, volunteers, and partners dedicated to sustainable community care. The summit features keynote sessions, interactive workshops, and networking opportunities spanning health, education, and family empowerment.\n\nExpect interactive discussions, case studies tailored to regional challenges, and invaluable networking opportunities with peers and mentors from across the continent.",
    location: "Nairobi International Conference Centre",
    startDate: new Date("2026-10-15T09:00:00.000Z"),
    endDate: new Date("2026-10-16T16:00:00.000Z"),
    heroImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    speakers: [
      {
        name: "Dr. Amina Okafor",
        role: "Director of Community Development, LUCI",
        photo:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
      },
      {
        name: "Samuel Mensah",
        role: "Grassroots Strategist",
        photo:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      },
    ],
    organisers: ["LUCI Foundation", "Global Care Initiative"],
    capacity: 200,
  },
  {
    slug: "community-leadership-workshop-2026",
    title: "Community Leadership Workshop 2026",
    summary:
      "Empowering local community leaders with sustainable development strategies across two intensive days.",
    description:
      "A transformative two-day workshop designed to empower local community leaders with sustainable development strategies. This intensive programme bridges traditional values with modern organizational techniques.\n\nParticipants will engage in hands-on sessions focusing on conflict resolution, resource management, and grassroots mobilization.",
    location: "Nairobi Community Center",
    startDate: new Date("2026-11-12T09:00:00.000Z"),
    endDate: new Date("2026-11-13T16:00:00.000Z"),
    heroImage:
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1600&auto=format&fit=crop",
    speakers: [
      {
        name: "Dr. Amina Okafor",
        role: "Director of Community Development, LUCI",
        photo:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
      },
    ],
    organisers: ["LUCI Foundation"],
    capacity: 80,
  },
];

const RESOURCES = [
  {
    slug: "2024-state-of-community-resilience-report",
    title: "The 2024 State of Community Resilience Report",
    category: "RESEARCH",
    summary:
      "A comprehensive analysis of how local initiatives are driving sustainable change across 15 sub-Saharan nations, featuring case studies and actionable policy recommendations.",
    fileUrl: "/media/luci-2024-resilience-report.pdf",
    thumbnail:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
    downloads: 234,
  },
  {
    slug: "2026-community-engagement-guide",
    title: "2026 Community Engagement Guide",
    category: "GUIDE",
    summary:
      "A practical toolkit for grassroots organizations looking to build sustainable, community-led initiatives with proven methodologies.",
    fileUrl: "/media/luci-2026-engagement-guide.pdf",
    thumbnail:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    downloads: 121,
  },
  {
    slug: "webinar-maternal-health-strategies",
    title: "Webinar: Maternal Health Strategies for Remote Areas",
    category: "VIDEO",
    summary:
      "A recorded panel discussion featuring leading healthcare practitioners discussing innovative strategies for improving maternal care access.",
    fileUrl: "https://youtube.com/watch?v=luci-maternal-health",
    thumbnail:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop",
    downloads: 89,
  },
];

const ARTICLES = [
  {
    slug: "bridging-the-gap-community-initiatives",
    title: "Bridging the Gap: How Community Driven Initiatives Are Shaping Our Future",
    category: "Community",
    excerpt:
      "Discover the stories of resilience and unity that are transforming lives across the continent, powered by the incredible dedication of our local partners.",
    content:
      "Across the continent, communities are quietly rewriting their own futures. From rural cooperatives to urban learning circles, neighbour-led efforts are proving that lasting change starts at the grassroots level.\n\nOur teams have spent the past year documenting these initiatives — speaking with volunteers, leaders, and the families they serve. The pattern is unmistakable: when communities own their solutions, results endure.\n\nWe believe that every investment in these networks multiplies. Partnerships with local leaders mean resources travel further, knowledge is shared faster, and trust becomes the foundation for everything that follows.",
    coverImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop",
    status: "PUBLISHED",
    publishedAt: new Date("2026-05-08"),
  },
  {
    slug: "empowering-next-generation-literacy",
    title: "Empowering the Next Generation Through Literacy",
    category: "Education",
    excerpt:
      "Our new literacy program has reached over 5,000 children this year alone, providing essential resources and mentorship.",
    content:
      "This year we reached a milestone: more than five thousand children now have access to reading materials, structured literacy sessions, and mentorship through our network of trained facilitators.\n\nThe programme works hand-in-hand with local schools and libraries. Each child receives a level-appropriate reading kit and joins a small weekly reading circle led by community volunteers.\n\nEarly results show marked improvements in reading confidence and school attendance. We are now preparing to expand the programme to four additional districts.",
    coverImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1200&auto=format&fit=crop",
    status: "PUBLISHED",
    publishedAt: new Date("2026-05-20"),
  },
  {
    slug: "healthcare-initiative-rural-villages",
    title: "New Healthcare Initiative Reaches Rural Villages",
    category: "Community Impact",
    excerpt:
      "Mobile clinics have delivered essential care to over twenty remote communities in the past month.",
    content:
      "In a major leap forward for rural healthcare access, LUCI's latest initiative has successfully delivered mobile clinics to over twenty remote communities in the past month.\n\nThe project, funded by our generous donor network and executed in partnership with local health authorities, aims to bridge the gap in essential medical services. For many of these communities, reaching a hospital previously meant a day-long journey, often impossible during the rainy season.\n\nBy deploying retrofitted off-road vehicles equipped with modern diagnostic tools and basic pharmaceutical supplies, the initiative brings the clinic directly to the people.\n\nWe are not just delivering medicine; we are delivering hope. Early data indicates a significant rise in prenatal care consultations and childhood immunizations within the targeted areas.",
    coverImage:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1600&auto=format&fit=crop",
    status: "PUBLISHED",
    publishedAt: new Date("2026-06-02"),
  },
  {
    slug: "preserving-heritage-local-artisans",
    title: "Preserving Heritage Through Local Artisans",
    category: "Culture",
    excerpt:
      "A celebration of the craftspeople keeping cultural traditions alive across the continent.",
    content:
      "Every pattern, every stitch, and every carved symbol carries a story. This month we shine a spotlight on the artisans working to keep those stories alive.\n\nThrough exhibitions, fair-trade marketplaces, and skills exchange programmes, LUCI supports craftspeople in reaching wider audiences while preserving traditional techniques for the next generation.\n\nWe invite collectors, tourists, and fellow changemakers to join us in valuing these living traditions.",
    coverImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
    status: "DRAFT",
    publishedAt: null,
  },
];

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@luci.org" },
    update: {},
    create: {
      name: "LUCI Super Admin",
      email: "admin@luci.org",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log("Seeded super admin: admin@luci.org / ChangeMe123! (change on first login)");

  for (const programme of PROGRAMMES) {
    await prisma.programme.upsert({
      where: { slug: programme.slug },
      update: programme,
      create: programme,
    });
  }
  console.log(`Seeded ${PROGRAMMES.length} programmes.`);

  let created = 0;
  for (const ev of EVENTS) {
    const existing = await prisma.event.findUnique({ where: { slug: ev.slug } });
    if (existing) {
      await prisma.event.update({ where: { slug: ev.slug }, data: ev });
    } else {
      await prisma.event.create({ data: ev });
    }
    created += 1;
  }
  console.log(`Seeded ${created} events.`);

  created = 0;
  for (const r of RESOURCES) {
    const existing = await prisma.resource.findUnique({ where: { slug: r.slug } });
    if (existing) {
      await prisma.resource.update({ where: { slug: r.slug }, data: r });
    } else {
      await prisma.resource.create({ data: r });
    }
    created += 1;
  }
  console.log(`Seeded ${created} resources.`);

  created = 0;
  for (const art of ARTICLES) {
    const data = { ...art, authorId: admin.id };
    const existing = await prisma.article.findUnique({ where: { slug: art.slug } });
    if (existing) {
      await prisma.article.update({ where: { slug: art.slug }, data });
    } else {
      await prisma.article.create({ data });
    }
    created += 1;
  }
  console.log(`Seeded ${created} articles.`);

  if ((await prisma.volunteerApplication.count()) === 0) {
    await prisma.volunteerApplication.createMany({
      data: [
        {
          fullName: "Chiamaka Nwosu",
          email: "chiamaka@example.com",
          phone: "+234 812 345 6789",
          location: "Lagos, Nigeria",
          skills: ["Teaching", "Event Planning"],
          message: "I would love to volunteer with the family empowerment workshops.",
          status: "NEW",
        },
        {
          fullName: "Daniel Otieno",
          email: "daniel@example.com",
          phone: "+254 712 345 678",
          location: "Nairobi, Kenya",
          skills: ["Tech", "Mentorship"],
          message: "Happy to mentor youth in the Future Leaders Tech Hub.",
          status: "REVIEWED",
        },
      ],
    });
  }

  if ((await prisma.membershipApplication.count()) === 0) {
    await prisma.membershipApplication.create({
      data: {
        fullName: "Aisha Bello",
        email: "aisha@example.com",
        phone: "+234 803 111 2233",
        reason: "I want to support LUCI's mission as a member and join local initiatives.",
        status: "NEW",
      },
    });
  }

  if ((await prisma.partnershipInquiry.count()) === 0) {
    await prisma.partnershipInquiry.create({
      data: {
        organisation: "Bright Future Foundation",
        contactName: "Grace Adeyemi",
        email: "grace@brightfuture.org",
        phone: "+234 909 876 5432",
        proposalSummary: "We would like to co-fund the clean water project in rural communities.",
        status: "NEW",
      },
    });
  }

  if ((await prisma.contactSubmission.count()) === 0) {
    await prisma.contactSubmission.create({
      data: {
        fullName: "Samuel Mensah",
        email: "samuel@example.com",
        subject: "Speaking engagement",
        message: "I would love to speak at the upcoming leadership workshop.",
        status: "NEW",
      },
    });
  }

  if ((await prisma.newsletterSubscriber.findFirst({ where: { email: "reader@example.com" } })) === null) {
    await prisma.newsletterSubscriber.createMany({
      data: [
        { email: "reader@example.com" },
        { email: "supporter@example.com" },
      ],
    });
  }

  if ((await prisma.safeguardingReport.count()) === 0) {
    await prisma.safeguardingReport.create({
      data: {
        reference: "SG-2024-0001",
        reporterName: "Anonymous",
        reporterContact: null,
        isAnonymous: true,
        category: "Harassment",
        details:
          "Training session participants were concerned about informal conduct by a staff member at the October workshop. Please investigate.",
        status: "OPEN",
      },
    });
  }

  if ((await prisma.donation.count()) === 0) {
    await prisma.donation.createMany({
      data: [
        {
          reference: `DON-SEED-${Date.now()}-1`,
          donorName: "Emily Carter",
          donorEmail: "emily@example.com",
          amount: 2500000,
          currency: "NGN",
          frequency: "ONE_TIME",
          designation: "Family Empowerment Workshop",
          status: "SUCCESS",
          paystackChannel: "card",
        },
        {
          reference: `DON-SEED-${Date.now()}-2`,
          donorName: "James Whitfield",
          donorEmail: "james@example.com",
          amount: 1500000,
          currency: "NGN",
          frequency: "MONTHLY",
          designation: "General Support",
          status: "SUCCESS",
          paystackChannel: "bank_transfer",
        },
      ],
    });
    console.log("Seeded 2 sample donations (SUCCESS).");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
