import { RequestHandler } from "express";
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

export const handleApply: RequestHandler = (req, res) => {
  const parse = applicationSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid input", details: parse.error.flatten() });
  }
  const payload = parse.data;
  const id = Math.random().toString(36).slice(2);
  const timestamp = new Date().toISOString();
  return res.status(200).json({ id, receivedAt: timestamp, application: payload });
};
