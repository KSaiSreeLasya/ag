-- Migration: create applications table and add resume columns to job_applications if needed

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create applications table (separate from job_applications)
CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
  position text,
  full_name text NOT NULL,
  email text,
  phone text,
  location text,
  experience_years text,
  linkedin text,
  portfolio text,
  resume_url text,
  resume_filename text,
  resume_content_type text,
  cover_letter text,
  expected_salary text,
  notice_period text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS applications_job_idx ON public.applications (job_id);
CREATE INDEX IF NOT EXISTS applications_search_idx ON public.applications USING gin (to_tsvector('english', coalesce(full_name,'') || ' ' || coalesce(email,'')));

-- Add resume columns to job_applications if using that table
ALTER TABLE IF EXISTS public.job_applications
  ADD COLUMN IF NOT EXISTS resume_url text,
  ADD COLUMN IF NOT EXISTS resume_filename text,
  ADD COLUMN IF NOT EXISTS resume_content_type text;

-- RLS: allow anonymous inserts into applications (if desired)
ALTER TABLE IF EXISTS public.applications ENABLE ROW LEVEL SECURITY;
-- INSERT policy: only WITH CHECK allowed
DROP POLICY IF EXISTS applications_insert_anon ON public.applications;
CREATE POLICY applications_insert_anon ON public.applications
  FOR INSERT
  WITH CHECK (auth.role() = 'anon');

-- End of migration
