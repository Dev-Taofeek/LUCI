import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/prisma/schema.prisma",

  migrations: {
    path: "src/prisma/migrations",
    seed: "node src/prisma/seed.js",
  },

  datasource: {
    url: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/luci",
  },
});