import dotenv from "dotenv";
import app from "./app.js";
import db from "./models/index.js";
import { exec } from "child_process";
import util from "util";

dotenv.config();

const execPromise = util.promisify(exec);
const PORT = process.env.PORT || 5000;
const MAX_RETRIES = 100;
const RETRY_DELAY = 3000; // 3 seconds

const connectWithRetry = async (retries = MAX_RETRIES) => {
  for (let i = 1; i <= retries; i++) {
    try {
      await db.sequelize.authenticate();
      console.log("✅ Database connected...");

      if (process.env.NODE_ENV === "development") {
        console.log("🧩 Running migrations...");
        await execPromise("npm run db:migrate", { stdio: "inherit" });

        console.log("🌱 Running seeders...");
        await execPromise("npm run db:seed", { stdio: "inherit" });
      }

      return;
    } catch (err) {
      console.warn(
        `⚠️  Database connection failed (attempt ${i}/${retries}): ${err.message}`
      );
      if (i < retries) {
        console.log(`⏳ Retrying in ${RETRY_DELAY / 1000}s...`);
        await new Promise((res) => setTimeout(res, RETRY_DELAY));
      } else {
        console.error("❌ Could not connect to database. Exiting...");
        process.exit(1);
      }
    }
  }
};

(async () => {
  await connectWithRetry();
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})();
