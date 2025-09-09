import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleApply } from "./routes/apply";

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
  app.post("/api/apply", handleApply);

  // Public submission routes (quotes, contacts)
  import("./routes/public")
    .then((mod) => {
      const publicRouter = (mod as any).default;
      app.use("/api", publicRouter);
    })
    .catch((err) => {
      console.warn("Public routes not available:", (err as Error).message);
    });

  // Admin routes (Supabase proxy)
  // dynamically import admin routes and attach when available
  import("./routes/admin")
    .then((mod) => {
      const adminRouter = (mod as any).default;
      app.use("/api/admin", adminRouter);
    })
    .catch((err) => {
      // silent if admin routes missing
      console.warn("Admin routes not available:", (err as Error).message);
    });

  return app;
}
