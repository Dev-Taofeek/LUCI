const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);

  await prisma.user.upsert({
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });