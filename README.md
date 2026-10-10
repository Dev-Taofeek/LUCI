# LUCI — Living Unity Core Initiative

The official website of the **Living Unity Core Initiative (LUCI)** — a non-political, non-governmental organization dedicated to promoting and fostering beauty in diversity through family space to achieve better society and nation(s): **A more perfect union.**

> **Sound Families make Sound Society and Sound Nation.**
>
> *To promote and foster the well-being of the family and the growing of commitment to the building of relational bridges of humanity for better society and nation(s).*

## About the Organization

LUCI is a bridge-building families organization. We believe that the family is the true engine room of citizenry, and that sound families make a sound society, and a sound nation.

| | |
|---|---|
| **Name** | Living Unity Core Initiative (LUCI) — A Non-Political, Non-Governmental Organization |
| **Motto** | Building Bridges, a Family Commitment. |
| **Slogan** | 1st Call: LUCI Response — God-Country-Family · 2nd Call: Building Bridges Response — My Family's Commitment |
| **General Co-ordinator** | Felix O. Omusi |
| **Address** | 5, Obafemi Awolowo way, P.O. Box 14008, Ikeja, Lagos, Nigeria |
| **Phone** | 0802 885 2121 · 0818 000 0416 · 0818 000 0436 |
| **Email** | co-ordinator@luci-ng.org |
| **Web** | www.luci-ng.org |

## Our Programmes

1. **Pre-Marriage, Married Life & Family Support** — Seminars, Workshops and Counselling Services (A Daily Reach-out Programme, The Unity-Flame Programme, Robust Counselling Services)
2. **In-depth Family Enrichment Programmes** — Human Development & Formation
3. **Commitment to Identified Structures of Unity** — NYSC Welfare and Promotion Initiative, Hate-Free/Violence-Free Nation, Sports and Unity of Cultures
4. **The Special Woman's Development Programme** — Recognizing and telling the stories of great bridge-building women
5. **Advocacy** — Communicating unity, charity and justice innovatively

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router, Turbopack)
- [Prisma](https://www.prisma.io) + PostgreSQL — programmes, events, resources, articles, applications
- [NextAuth.js](https://next-auth.js.org) — admin authentication
- [Tailwind CSS](https://tailwindcss.com) + [Framer Motion](https://www.framer.com/motion/)
- Deployed on [Vercel](https://vercel.com)

## Getting Started

```bash
# Install dependencies
pnpm install

# Run the development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database & Content

Site content (programmes, events, resources, articles) is stored in the database and seeded from `src/prisma/seed.js`. After pulling content changes, re-run the seed:

```bash
pnpm prisma generate
pnpm prisma db push   # if the schema changed
pnpm prisma db seed
```

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── (site)/           # Public pages (home, about, what-we-do, impact, ...)
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/           # React components (sections, layout, ui, site)
├── lib/                  # Data, utilities, motion helpers
└── prisma/               # Database schema + seed
```

## License

© LUCI — Living Unity Core Initiative. All rights reserved.
