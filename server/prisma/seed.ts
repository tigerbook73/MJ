import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import * as argon2 from "argon2";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data
  await prisma.user.deleteMany();
  console.log("🗑️  Cleared existing users");

  // Hash password for demo users
  const hashedPassword = await argon2.hash("Password123");

  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@example.com",
        name: "Alice Johnson",
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: "bob@example.com",
        name: "Bob Smith",
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: "charlie@example.com",
        name: "Charlie Brown",
        password: hashedPassword,
      },
    }),
    prisma.user.create({
      data: {
        email: "diana@example.com",
        name: "Diana Prince",
        password: hashedPassword,
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);
  console.log("📋 Seeded users:");
  users.forEach((user) => {
    console.log(`   - ${user.name} (${user.email})`);
  });

  console.log("\n✨ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
