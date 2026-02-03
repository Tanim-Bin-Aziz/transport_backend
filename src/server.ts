import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDB } from "./lib/prisma.js";

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    console.log("⏳ Connecting to database...");

    await connectDB();

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server");
    console.error(err);
    process.exit(1);
  }
}
start();
