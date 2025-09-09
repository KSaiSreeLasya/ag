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

      // attempt to sync any local pending entries once at startup
      (async () => {
        try {
          if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
            const { syncLocalData } = await import("./lib/syncLocal");
            const { supabaseRequest } = await import("./routes/admin");
            // NOTE: admin exports supabaseRequest function? It doesn't; instead reuse internal by importing routes file's helper is not straightforward.
            // To avoid circular imports, re-create a minimal supabaseRequest here using env keys
            const SUPABASE_URL = process.env.SUPABASE_URL;
            const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;
            if (SUPABASE_URL && SUPABASE_KEY) {
              const supabaseReq = async (table: string, method = "GET", body?: any, query = "") => {
                // Construct URL and headers similar to admin supabaseRequest
                let preferReturn = false;
                let rawQuery = query || "";
                if (rawQuery.startsWith("?")) rawQuery = rawQuery.slice(1);
                const params = new URLSearchParams(rawQuery);
                if (params.get("return") === "representation") {
                  preferReturn = true;
                  params.delete("return");
                }
                const queryString = params.toString();
                const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${table}${queryString ? "?" + queryString : ""}`;
                const headers: Record<string, string> = {
                  apikey: SUPABASE_KEY,
                  Authorization: `Bearer ${SUPABASE_KEY}`,
                };
                if (preferReturn) headers.Prefer = "return=representation";
                if (method === "GET") headers.Accept = "application/json";
                if (body) headers["Content-Type"] = "application/json";
                const res = await fetch(url, {
                  method,
                  headers,
                  body: body ? JSON.stringify(body) : undefined,
                });
                if (!res.ok) {
                  const text = await res.text().catch(() => "");
                  throw new Error(`Supabase request failed: status=${res.status} statusText=${res.statusText} url=${url} body=${text}`);
                }
                const contentType = res.headers.get("content-type") || "";
                if (contentType.includes("application/json")) return res.json();
                return res.text();
              };

              const results = await syncLocalData(supabaseReq);
              // log full results as JSON
              // eslint-disable-next-line no-console
              console.log("Local sync results:", JSON.stringify(results, null, 2));
            }
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn("Local sync failed:", e);
        }
      })();
    })
    .catch((err) => {
      // silent if admin routes missing
      console.warn("Admin routes not available:", (err as Error).message);
    });

  return app;
}
