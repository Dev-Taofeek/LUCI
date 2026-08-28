const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const bcrypt = require("bcryptjs");

const adapter = new PrismaBetterSqlite3({
  url: "./dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);

  await prisma.user.upsert({
    where: {
      email: "admin@luci.org",
    },
    update: {},
    create: {
      name: "LUCI Super Admin",
      email: "admin@luci.org",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log(
    "Seeded super admin: admin@luci.org / ChangeMe123! (change on first login)"
  );
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });