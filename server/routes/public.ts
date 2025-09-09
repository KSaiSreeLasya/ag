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
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Supabase not configured");
  }
  const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${table}${query}`;
  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
  };
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
    const payload = req.body || {};
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
    const payload = req.body || {};
    const result = await supabaseRequest(
      "contacts",
      "POST",
      payload,
      "?return=representation",
    );
    return res.status(201).json(result);
  } catch (err: any) {
    console.error("Public /contacts error:", err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
