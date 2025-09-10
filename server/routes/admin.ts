import { Router } from "express";

const router = Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
// Use service role key for admin routes when available
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn(
    "Supabase credentials not set (SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_KEY). Admin routes will fail until configured.",
  );
}

async function supabaseRequest(
  table: string,
  method = "GET",
  body?: any,
  query = "",
) {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase not configured");
  }

  // Support Prefer: return=representation via query string like ?return=representation
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
  if (preferReturn) {
    headers.Prefer = "return=representation";
  }
  if (method === "GET") {
    headers.Accept = "application/json";
  }
  if (body) {
    headers["Content-Type"] = "application/json";
  }
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase request failed: ${res.status} ${text}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

const ALLOWED_TABLES = {
  // match the tables created by migrations: quotes, contacts, jobs, resources
  quotes: "quotes",
  contacts: "contacts",
  jobs: "jobs",
  resources: "resources",
};

// Middleware: require admin user via Supabase auth
router.use(async (req, res, next) => {
  try {
    // Development bypass: allow skipping auth when running in dev and header present
    if (
      process.env.NODE_ENV !== "production" &&
      (req.headers["x-skip-auth"] === "1" ||
        req.headers["x-skip-auth"] === "true")
    ) {
      (req as any).supabaseUser = {
        email: process.env.DEV_ADMIN_EMAIL ?? "dev@localhost",
      };
      return next();
    }

    const auth = req.headers.authorization as string | undefined;
    if (!auth)
      return res.status(401).json({ error: "Missing Authorization header" });
    if (!SUPABASE_URL || !SUPABASE_KEY)
      return res.status(500).json({ error: "Supabase not configured" });
    // validate token with Supabase Auth
    const userResp = await fetch(
      `${SUPABASE_URL.replace(/\/$/, "")}/auth/v1/user`,
      {
        headers: { Authorization: auth, apikey: SUPABASE_KEY },
      },
    );
    if (!userResp.ok)
      return res.status(401).json({ error: "Invalid auth token" });
    const user = await userResp.json();
    const email = (user as any).email;
    if (!email) return res.status(401).json({ error: "Unauthenticated" });
    // check admin_users table
    try {
      const rows = await supabaseRequest(
        "admin_users",
        "GET",
        undefined,
        `?email=eq.${encodeURIComponent(email)}`,
      );
      if (Array.isArray(rows) && rows.length > 0) {
        // attach user info
        (req as any).supabaseUser = user;
        return next();
      }
    } catch (e) {
      console.warn("admin lookup failed", e);
    }
    return res.status(403).json({ error: "Forbidden: not an admin" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// List endpoints
router.get("/quotes", async (req, res) => {
  try {
    const rows = await supabaseRequest(ALLOWED_TABLES.quotes);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/contacts", async (req, res) => {
  try {
    const rows = await supabaseRequest(ALLOWED_TABLES.contacts);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const rows = await supabaseRequest(ALLOWED_TABLES.jobs);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/resources", async (req, res) => {
  try {
    const rows = await supabaseRequest(ALLOWED_TABLES.resources);
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Trigger sync of local pending entries to Supabase (uses service role key)
router.post("/sync-local", async (req, res) => {
  try {
    const { syncLocalData } = await import("../lib/syncLocal");
    const results = await syncLocalData(supabaseRequest);
    res.json(results);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create job
router.post("/jobs", async (req, res) => {
  try {
    const payload = req.body;
    // Supabase REST insert requires prefer return=representation to return rows
    const result = await supabaseRequest(
      ALLOWED_TABLES.jobs,
      "POST",
      payload,
      "?return=representation",
    );
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create resource
router.post("/resources", async (req, res) => {
  try {
    const payload = req.body;
    const result = await supabaseRequest(
      ALLOWED_TABLES.resources,
      "POST",
      payload,
      "?return=representation",
    );
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Upload file to Supabase Storage (expects JSON with base64)
router.post("/upload", async (req, res) => {
  try {
    const { bucket, path, file_base64, contentType } = req.body;
    if (!bucket || !path || !file_base64) {
      return res
        .status(400)
        .json({ error: "bucket, path and file_base64 are required" });
    }
    if (!SUPABASE_URL || !SUPABASE_KEY)
      throw new Error("Supabase not configured");
    const url = `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/${encodeURIComponent(bucket)}/${encodeURIComponent(path)}`;
    const buffer = Buffer.from(file_base64, "base64");
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": contentType || "application/octet-stream",
      },
      body: buffer,
    });
    if (!resp.ok) {
      const text = await resp.text();
      return res
        .status(500)
        .json({ error: `Upload failed: ${resp.status} ${text}` });
    }
    // Return public URL (if bucket is public)
    const publicUrl = `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/${encodeURIComponent(bucket)}/${encodeURIComponent(path)}`;
    res.json({ ok: true, url: publicUrl });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Export CSV for a table key
router.get("/export/:table", async (req, res) => {
  try {
    const key = req.params.table;
    const table = (ALLOWED_TABLES as any)[key];
    if (!table) return res.status(400).json({ error: "Invalid export target" });

    const rows = await supabaseRequest(table);
    if (!Array.isArray(rows))
      return res.status(500).json({ error: "Unexpected response" });

    if (rows.length === 0) {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=\"${key}.csv\"`,
      );
      return res.send("");
    }

    const columns = Object.keys(rows[0]);
    const escape = (v: any) => {
      if (v === null || v === undefined) return "";
      const s = typeof v === "object" ? JSON.stringify(v) : String(v);
      if (s.includes(",") || s.includes("\n") || s.includes('"')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const csv = [columns.join(",")]
      .concat(rows.map((r: any) => columns.map((c) => escape(r[c])).join(",")))
      .join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename=\"${key}.csv\"`);
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Export combined forms (quotes, contacts, applications, jobs, resources) as a single CSV with sections
router.get("/export-forms", async (req, res) => {
  try {
    const tables = ["quotes", "contacts", "applications", "jobs", "resources"];
    const parts: string[] = [];
    for (const t of tables) {
      let rows: any = [];
      try {
        rows = await supabaseRequest(t);
      } catch (e: any) {
        // include error note
        parts.push(
          `# ${t.toUpperCase()} - ERROR: ${e?.message || String(e)}\n`,
        );
        continue;
      }
      if (!Array.isArray(rows)) {
        parts.push(`# ${t.toUpperCase()} - Unexpected response\n`);
        continue;
      }
      parts.push(`# ${t.toUpperCase()}\n`);
      if (rows.length === 0) {
        parts.push("(no rows)\n\n");
        continue;
      }
      const columns = Object.keys(rows[0]);
      const escape = (v: any) => {
        if (v === null || v === undefined) return "";
        const s = typeof v === "object" ? JSON.stringify(v) : String(v);
        if (s.includes(",") || s.includes("\n") || s.includes('"')) {
          return '"' + s.replace(/"/g, '""') + '"';
        }
        return s;
      };
      parts.push(columns.join(",") + "\n");
      for (const r of rows) {
        parts.push(columns.map((c) => escape(r[c])).join(",") + "\n");
      }
      parts.push("\n");
    }

    const csv = parts.join("");
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=\"all_forms.csv\"`,
    );
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Multi-sheet XLSX export (each table in its own sheet)
router.get("/export-xlsx", async (req, res) => {
  try {
    // Dynamically import exceljs and handle ESM default export
    const excelModule = await import("exceljs");
    const ExcelJS = (excelModule && (excelModule.Workbook || excelModule.default?.Workbook)) ? excelModule : excelModule.default ? excelModule.default : excelModule;
    const WorkbookCtor = ExcelJS.Workbook || (ExcelJS && ExcelJS.Workbook) || (excelModule && excelModule.default && excelModule.default.Workbook);
    if (!WorkbookCtor) throw new Error("ExcelJS.Workbook constructor not found");
    const workbook = new WorkbookCtor();
    const tables = [
      "quotes",
      "contacts",
      "applications",
      "job_applications",
      "jobs",
      "resources",
    ];
    for (const t of tables) {
      let rows: any[] = [];
      try {
        rows = (await supabaseRequest(t)) || [];
      } catch (e: any) {
        rows = [];
      }
      const sheet = workbook.addWorksheet(t.substring(0, 31)); // sheet name max 31 chars
      if (!rows || rows.length === 0) {
        sheet.addRow(["(no rows)"]);
        continue;
      }
      const columns = Object.keys(rows[0]);
      sheet.addRow(columns);
      for (const r of rows) {
        const row = columns.map((c) => {
          const v = r[c];
          if (v === null || v === undefined) return "";
          if (typeof v === "object") return JSON.stringify(v);
          return String(v);
        });
        sheet.addRow(row);
      }
    }

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", `attachment; filename=all_forms.xlsx`);
    await workbook.xlsx.write(res);
    res.end();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
