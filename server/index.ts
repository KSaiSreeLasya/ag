import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Admin routes (Supabase proxy)
  try {
    const adminRouter = (await import("./routes/admin")).default;
    app.use("/api/admin", adminRouter);
  } catch (err) {
    // silent if admin routes missing
    console.warn("Admin routes not available:", (err as Error).message);
  }

  return app;
}
