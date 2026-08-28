import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

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
    update: {
      passwordHash,
      role: "SUPER_ADMIN",
    },
    create: {
      name: "LUCI Super Admin",
      email: "admin@luci.org",
      passwordHash,
      role: "SUPER_ADMIN",
    },
  });

  console.log(
    "Seeded super admin: admin@luci.org / ChangeMe123!"
  );
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });