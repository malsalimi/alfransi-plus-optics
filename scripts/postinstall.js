const { execSync } = require("child_process");

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

try {
  console.log("Postinstall: Running prisma generate with fallback DATABASE_URL...");
  execSync("npx prisma generate", { stdio: "inherit", env: process.env });
} catch (error) {
  console.error("Postinstall prisma generate warning:", error.message);
}
