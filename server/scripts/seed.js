/**
 * CLI seeding.
 *   npm run seed                -> safe: adds only MISSING records + runs pending migrations
 *   npm run seed -- --reset     -> DESTRUCTIVE: wipes catalogue collections first (refused in production
 *                                  unless ALLOW_DESTRUCTIVE_SEED=yes)
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const { seedCatalogue, resetCatalogue } = require("../services/seeder");
const { runMigrations } = require("../services/migrations");

async function run() {
  const reset = process.argv.includes("--reset");
  if (reset && process.env.NODE_ENV === "production" && process.env.ALLOW_DESTRUCTIVE_SEED !== "yes") {
    console.error("Refusing destructive --reset in production (set ALLOW_DESTRUCTIVE_SEED=yes to override).");
    process.exit(1);
  }
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not found in server/.env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected.");

  const email = process.env.ADMIN_EMAIL;
  if (email && !(await Admin.findOne({ email }))) {
    await Admin.create({ email, passwordHash: await bcrypt.hash(process.env.ADMIN_PASSWORD, 12) });
    console.log(`Admin created: ${email}`);
  }

  if (reset) {
    console.log("RESET: wiping catalogue and re-seeding…");
    console.log(await resetCatalogue());
  } else {
    console.log("Catalogue (missing only):", (await seedCatalogue()).inserted);
  }
  console.log("Migrations:", JSON.stringify(await runMigrations()));
  await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
