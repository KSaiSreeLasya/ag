import { Router } from "express";

const router = Router();

const SUPABASE_URL = process.env.SUPABASE_URL;
// Use explicit SUPABASE_KEY if provided, otherwise fall back to anon key for public routes
const SUPABASE_KEY = process.env.SUPABASE_KEY ?? process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn(
    "Supabase credentials not set (SUPABASE_URL and SUPABASE_KEY or SUPABASE_ANON_KEY). Public submission routes will fail until configured.",
  );
}

async function supabaseRequest(
  table: string,
  method = "GET",
  body?: any,
  query = "",
) {
  if (!SUPABASE_URL) {
    throw new Error("Missing SUPABASE_URL");
  }
  if (!SUPABASE_KEY) {
    throw new Error("Missing SUPABASE_KEY or SUPABASE_ANON_KEY");
  }

  // Normalize query and support Prefer: return=representation
  let preferReturn = false;
  let rawQuery = query || "";
  if (rawQuery.startsWith("?")) rawQuery = rawQuery.slice(1);
  // if query contains return=representation, remove it and set Prefer header
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
  if (method === "GET") headers.Accept = "application/json";
  if (body) headers["Content-Type"] = "application/json";

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const headersObj: Record<string, string> = {};
    res.headers.forEach((v, k) => (headersObj[k] = v));
    throw new Error(
      `Supabase request failed: status=${res.status} statusText=${res.statusText} url=${url} body=${text} headers=${JSON.stringify(headersObj)}`,
    );
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

// Public submission endpoints
router.post("/quotes", async (req, res) => {
  try {
    const payload = { ...(req.body || {}) };
    // Remove UI-only fields that are not present in DB schema
    delete payload.agree;
    const result = await supabaseRequest(
      "quotes",
      "POST",
      payload,
      "?return=representation",
    );
    return res.status(201).json(result);
  } catch (err: any) {
    console.error("Public /quotes error:", err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const payload = { ...(req.body || {}) };
    // Remove UI-only fields that are not present in DB schema
    delete payload.agree;
    const result = await supabaseRequest(
      "contacts",
      "POST",
      payload,
      "?return=representation",
    );
    return res.status(201).json(result);
  } catch (err: any) {
    console.error("Public /contacts error:", err);
    // Fallback: store contact locally so site still works when Supabase is unavailable
    try {
      const fs = await import("fs/promises");
      const path = await import("path");
      const dataDir = path.resolve(process.cwd(), "server", "data");
      await fs.mkdir(dataDir, { recursive: true });
      const file = path.join(dataDir, "contacts.json");
      const existing = await fs.readFile(file, "utf-8").catch(() => "[]");
      const arr = JSON.parse(existing || "[]");
      const entry = { id: Math.random().toString(36).slice(2), receivedAt: new Date().toISOString(), payload: req.body };
      arr.push(entry);
      await fs.writeFile(file, JSON.stringify(arr, null, 2));
      return res.status(201).json(entry);
    } catch (fsErr) {
      console.error("Failed to persist contact locally:", fsErr);
      return res.status(500).json({ error: err.message });
    }
  }
});

export default router;
