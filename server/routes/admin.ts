import { Router } from "express";

const router = Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn("Supabase credentials not set (SUPABASE_URL/SUPABASE_KEY). Admin routes will fail until configured.");
}

async function supabaseRequest(table: string, method = "GET", body?: any, query = "") {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase not configured");
  }
  const url = `${SUPABASE_URL}/rest/v1/${table}${query}`;
  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
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
  quotes: "get_quotes",
  contacts: "contacts",
  jobs: "careers_jobs",
  resources: "resources",
};

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

// Create job
router.post("/jobs", async (req, res) => {
  try {
    const payload = req.body;
    // Supabase REST insert requires prefer return=representation to return rows
    const result = await supabaseRequest(ALLOWED_TABLES.jobs, "POST", payload, "?return=representation");
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Create resource
router.post("/resources", async (req, res) => {
  try {
    const payload = req.body;
    const result = await supabaseRequest(ALLOWED_TABLES.resources, "POST", payload, "?return=representation");
    res.json(result);
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
    if (!Array.isArray(rows)) return res.status(500).json({ error: "Unexpected response" });

    if (rows.length === 0) {
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", `attachment; filename="${key}.csv"");
      return res.send("");
    }

    const columns = Object.keys(rows[0]);
    const escape = (v: any) => {
      if (v === null || v === undefined) return "";
      const s = typeof v === 'object' ? JSON.stringify(v) : String(v);
      if (s.includes(',') || s.includes('\n') || s.includes('"')) {
        return '"' + s.replace(/"/g, '""') + '"';
      }
      return s;
    };
    const csv = [columns.join(",")]
      .concat(rows.map((r: any) => columns.map((c) => escape(r[c])).join(",")))
      .join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${key}.csv"");
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;