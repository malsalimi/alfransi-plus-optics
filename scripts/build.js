const { execSync } = require("child_process");

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}

console.log("[Build] Using DATABASE_URL:", process.env.DATABASE_URL);

try {
  console.log("[Build] Running prisma generate...");
  execSync("npx prisma generate", { stdio: "inherit", env: process.env });

  console.log("[Build] Running prisma db push...");
  execSync("npx prisma db push --accept-data-loss", { stdio: "inherit", env: process.env });

  console.log("[Build] Running next build...");
  execSync("npx next build", { stdio: "inherit", env: process.env });

  console.log("[Build] Successfully completed!");
} catch (error) {
  console.error("[Build] Failed:", error.message);
  process.exit(1);
}
