import { RequestHandler } from "express";
import multer from "multer";
import { z } from "zod";

const applicationSchema = z.object({
  position: z.string().min(1),
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  location: z.string().min(2),
  experienceYears: z.string().optional().default(""),
  linkedin: z.string().url().optional().or(z.literal("")),
  portfolio: z.string().url().optional().or(z.literal("")),
  coverLetter: z.string().min(20),
  expectedSalary: z.string().optional().or(z.literal("")),
  noticePeriod: z.string().optional().or(z.literal("")),
});

const upload = multer();

export const handleApply: RequestHandler = (req, res) => {
  // Use multer to parse multipart/form-data (supports resume file)
  upload.single("resume")(req as any, res as any, async (err: any) => {
    if (err) return res.status(400).json({ error: err.message || "Upload error" });
    try {
      const rawBody = req.body || {};
      // When multipart, fields are strings; map keys accordingly
      const input = {
        position: rawBody.position,
        fullName: rawBody.fullName,
        email: rawBody.email,
        phone: rawBody.phone,
        location: rawBody.location,
        experienceYears: rawBody.experienceYears,
        linkedin: rawBody.linkedin,
        portfolio: rawBody.portfolio,
        coverLetter: rawBody.coverLetter,
        expectedSalary: rawBody.expectedSalary,
        noticePeriod: rawBody.noticePeriod,
      };

      const parse = applicationSchema.safeParse(input);
      if (!parse.success) {
        return res.status(400).json({ error: "Invalid input", details: parse.error.flatten() });
      }

      // Prepare to upload resume if present
      let resume_url: string | null = null;
      let resume_filename: string | null = null;
      let resume_content_type: string | null = null;

      const file = (req as any).file as Express.Multer.File | undefined;
      const SUPABASE_URL = process.env.SUPABASE_URL;
      const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_KEY;

      if (file) {
        if (!SUPABASE_URL || !SUPABASE_KEY) {
          return res.status(500).json({ error: "Supabase not configured for file uploads" });
        }
        // sanitize filename and create path
        const timestamp = Date.now();
        const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `resumes/${timestamp}_${safeName}`;
        const url = `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/${encodeURIComponent("resumes")}/${encodeURIComponent(path)}`;
        const resp = await fetch(url, {
          method: "PUT",
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            "Content-Type": file.mimetype || "application/octet-stream",
          },
          body: file.buffer,
        });
        if (!resp.ok) {
          const text = await resp.text().catch(() => "");
          return res.status(500).json({ error: `Upload failed: ${resp.status} ${text}` });
        }
        resume_url = `${SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/${encodeURIComponent("resumes")}/${encodeURIComponent(path)}`;
        resume_filename = file.originalname;
        resume_content_type = file.mimetype;
      }

      // Insert application row into Supabase using service role key (bypass RLS)
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        // fallback: return success but do not persist
        const id = Math.random().toString(36).slice(2);
        return res.status(200).json({ id, receivedAt: new Date().toISOString(), application: parse.data });
      }

      const insertPayload: any = { ...parse.data };
      if (resume_url) {
        insertPayload.resume_url = resume_url;
        insertPayload.resume_filename = resume_filename;
        insertPayload.resume_content_type = resume_content_type;
      }

      const insertUrl = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/applications`;
      const insertResp = await fetch(insertUrl + "?return=representation", {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: "return=representation",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(insertPayload),
      });
      if (!insertResp.ok) {
        const text = await insertResp.text().catch(() => "");
        return res.status(500).json({ error: `Insert failed: ${insertResp.status} ${text}` });
      }
      const body = await insertResp.json().catch(() => null);
      return res.status(201).json({ ok: true, rows: body });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || String(e) });
    }
  });
};
