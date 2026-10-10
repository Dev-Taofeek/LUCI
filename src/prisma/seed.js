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
    slug: "pre-marriage-married-life-family-support",
    category: "Family Development",
    status: "ACTIVE",
    title: "Pre-Marriage, Married Life & Family Support",
    summary:
      "Pre-Marriage, Married Life & Family Inspiring/Support Programmes; Seminars/Workshops and Counselling Services.",
    description:
      "Pre-Marriage, Married Life & Family Inspiring/Support Programmes; Seminars/Workshops and Counselling Services. With Pre-Marriage Persons, and With Married & Family Life: it is an outright fallacy to fight against juvenile delinquency or against the prostitution of women while favouring the discrediting or deterioration of the institution of the family! Components: A Daily Reach-out Programme, The Unity-Flame Programme, and Robust Counselling Services.",
    location: "Nigeria",
    startDate: new Date("2026-01-01"),
    endDate: null,
    impactStat: "A Daily Reach-Out Programme",
    heroImage: "/programme-family-life.jpg",
    galleryImages: [],
    objectives: [
      "With Pre-Marriage Persons",
      "With Married & Family Life",
      "A Daily Reach-out Programme",
      "The Unity-Flame Programme",
      "Robust Counselling Services",
    ],
    partners: [],
  },
  {
    slug: "in-depth-family-enrichment",
    category: "Family Development",
    status: "ACTIVE",
    title: "In-depth Family Enrichment Programmes",
    summary:
      "Advancing studies and human development programmes for a better society.",
    description:
      "LUCI will actively be concerned with advancing studies and human development programmes for a better society. We conscientiously work innovatively to create these programmes and be sustained organically; as an integral element of the overall transcendental goal of our families, their children and wards, through various strategies.",
    location: "Nigeria",
    startDate: new Date("2026-01-01"),
    endDate: null,
    impactStat: "Human Development & Formation",
    heroImage: "/programme-family-enrichment.jpg",
    galleryImages: [],
    objectives: ["Family bonding", "Bridge-building", "Counselling"],
    partners: [],
  },
  {
    slug: "commitment-to-identified-structures-of-unity",
    category: "Community Building",
    status: "ACTIVE",
    title: "Commitment to Identified Structures of Unity",
    summary:
      "Promoting, initiating, strengthening and supporting physical, material and institutional infrastructures considered as catalysts to building unity.",
    description:
      "Promoting, initiating, strengthening and supporting as appropriate, physical, material and institutional infrastructures considered as catalysts to building unity; supporting institutions like the National Youth Service Corps Scheme (and similar unity infrastructures), giving them prominence and pride of place. Promoting Corpers' Welfare Initiatives. Identifying, Promoting and Supporting Programmes to amplifying a Hate-Free/Violence-Free nation. Other structures that would be considered as pillars of unity; like in the sphere of sports, in cultural unity (relations among cultures) and other areas of typical achievements of national pride.",
    location: "Nigeria",
    startDate: new Date("2026-01-01"),
    endDate: null,
    impactStat: "NYSC Welfare & Promotion Initiative",
    heroImage: "/programme-unity-structures.jpg",
    galleryImages: [],
    objectives: [
      "NYSC Welfare and Promotion Initiative",
      "Hate-Free/Violence-Free Nation",
      "Identifying and Promoting Such Other Structures in Sports, Unity of Cultures etc.",
    ],
    partners: [],
  },
  {
    slug: "special-womans-development-programme",
    category: "Family Development",
    status: "ACTIVE",
    title: "The Special Woman's Development Programme",
    summary:
      "Recognizing and telling the stories of great bridge-building women of our time (Inspiring Special-Grace Building Bridges).",
    description:
      "Utilizing the instrumentality of training seminars, workshops and our counseling platforms, a special focus shall be deployed, continually seeking out for inspiration, the Naomis, the Ruths the Esthers and our modern day others like Tamar and Rahab — the mother of Boaz; for Ruth married Boaz to become the mother of Obed who became the father of Jesse, and Jesse became the father of King David. We must begin to render worthwhile regard to women of providence of our own time: outstandingly dignified women building bridges; could be your daughter or my granddaughter, as God's instrument created to wiring (connecting) boundaries, bringing down walls and barriers of division, and building bridges to achieving fullness of unity and life and making living more meaningful.",
    location: "Nigeria",
    startDate: new Date("2026-01-01"),
    endDate: null,
    impactStat: "Women of Providence",
    heroImage: "/programme-women-development.jpg",
    galleryImages: [],
    objectives: [
      "Recognizing and telling the stories of great bridge-building women",
      "Training seminars and workshops",
      "Counselling platforms",
    ],
    partners: [],
  },
  {
    slug: "advocacy-making-unity-attractive",
    category: "Advocacy",
    status: "ACTIVE",
    title: "Advocacy: Making Unity Attractive & Empowered",
    summary:
      "By advocating and communicating unity, charity and justice innovatively.",
    description:
      "Legislation by itself will never do away with all the fears, pride and selfishness which damage families and nations. To overcome such obstacles, we must rely on Human Solidarity and God's Love and begin to develop and/or advocate for support for quality human capital for quality leaders. LUCI is surely one way to that human solidarity and God's love, advocating for: Marriage, Family Life and manifold heritage; Sustainable National Unity Infrastructures; and the family as the unit of the nation in God's creation. Promoting love and denouncing hate in our nation: as families become the most readily vulnerable in any national conflagration, so we all must enthusiastically foster living relationship between the family and national unity.",
    location: "Nigeria",
    startDate: new Date("2026-01-01"),
    endDate: null,
    impactStat: "Promoting Love, Denouncing Hate",
    heroImage: "/programme-advocacy.jpg",
    galleryImages: [],
    objectives: [
      "Marriage, Family Life and manifold heritage",
      "Sustainable National Unity Infrastructures",
      "The family as the unit of the nation in God's creation",
    ],
    partners: [],
  },
];

const EVENTS = [];

const RESOURCES = [];

const ARTICLES = [];

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

  // The LUCI brochure contains no events, resources, or news articles —
  // remove any previously seeded placeholder content so the live
  // database matches this seed exactly.
  await prisma.event.deleteMany({
    where: { slug: { notIn: EVENTS.map((e) => e.slug) } },
  });
  await prisma.resource.deleteMany({
    where: { slug: { notIn: RESOURCES.map((r) => r.slug) } },
  });
  await prisma.article.deleteMany({
    where: { slug: { notIn: ARTICLES.map((a) => a.slug) } },
  });
  await prisma.programme.deleteMany({
    where: { slug: { notIn: PROGRAMMES.map((p) => p.slug) } },
  });

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
