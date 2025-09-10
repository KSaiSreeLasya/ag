-- Create required extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Admin users table (map Supabase auth users to admin roles)
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL UNIQUE, -- Supabase auth uid
  display_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Quotes (public form)
CREATE TABLE IF NOT EXISTS public.quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  whatsapp text,
  pincode text,
  bill text,
  category text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS quotes_created_idx ON public.quotes (created_at DESC);
CREATE INDEX IF NOT EXISTS quotes_search_idx ON public.quotes USING gin (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(category,'')));

-- Contacts (public contact form)
CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  subject text,
  message text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contacts_created_idx ON public.contacts (created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_search_idx ON public.contacts USING gin (to_tsvector('english', coalesce(name,'') || ' ' || coalesce(email,'') || ' ' || coalesce(subject,'')));

-- Jobs (admin-posted job listings)
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE,
  department text,
  location text,
  employment_type text,
  description text,
  responsibilities text,
  qualifications text,
  salary_range text,
  is_published boolean NOT NULL DEFAULT false,
  posted_by uuid REFERENCES public.admin_users(id) ON DELETE SET NULL,
  posted_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz
);

CREATE INDEX IF NOT EXISTS jobs_published_idx ON public.jobs (is_published, posted_at DESC);
CREATE INDEX IF NOT EXISTS jobs_search_idx ON public.jobs USING gin (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'')));

-- Resources (admin-created downloadable links / content)
CREATE TABLE IF NOT EXISTS public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  url text,        -- external link or public storage URL
  file_path text,  -- internal storage path if used
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  tags text[] NOT NULL DEFAULT '{}',
  is_published boolean NOT NULL DEFAULT false,
  created_by uuid REFERENCES public.admin_users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS resources_tags_idx ON public.resources USING gin (tags);
CREATE INDEX IF NOT EXISTS resources_search_idx ON public.resources USING gin (to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'')));

-- Applications (career/job form) including resume storage metadata and optional binary
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
  -- Resume storage: prefer storing file in object storage (Supabase Storage) and saving a public/private URL here
  resume_url text,           -- public or signed URL to the stored resume PDF
  resume_filename text,
  resume_content_type text,
  -- Optional: store small binary directly in DB (not recommended for large files)
  resume_blob bytea,
  cover_letter text,
  expected_salary text,
  notice_period text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS applications_job_idx ON public.applications (job_id);
CREATE INDEX IF NOT EXISTS applications_search_idx ON public.applications USING gin (to_tsvector('english', coalesce(full_name,'') || ' ' || coalesce(email,'')));

-- Enable Row Level Security (RLS)
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Public forms: allow anonymous inserts (auth.role() = 'anon')
-- NOTE: If you prefer server-side insertion using the service role key, you can omit these policies and let the server insert.
CREATE POLICY quotes_insert_public ON public.quotes
  FOR INSERT
  USING (auth.role() = 'anon' OR auth.role() = 'authenticated')
  WITH CHECK (true);

CREATE POLICY contacts_insert_public ON public.contacts
  FOR INSERT
  USING (auth.role() = 'anon' OR auth.role() = 'authenticated')
  WITH CHECK (true);

CREATE POLICY applications_insert_public ON public.applications
  FOR INSERT
  USING (auth.role() = 'anon' OR auth.role() = 'authenticated')
  WITH CHECK (true);

-- Jobs & resources: admin-only access (require entry in admin_users)
CREATE POLICY jobs_admin_all ON public.jobs
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid())
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid())
  );

CREATE POLICY resources_admin_all ON public.resources
  USING (
    auth.role() = 'authenticated' AND
    EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid())
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND
    EXISTS (SELECT 1 FROM public.admin_users au WHERE au.user_id = auth.uid())
  );

-- Minimal example inserts (safe examples using gen_random_uuid())
-- Insert an admin user (replace user_id with the Supabase auth uid for a real admin)
INSERT INTO public.admin_users (user_id, display_name)
VALUES ('example-admin-uid', 'Site Admin')
ON CONFLICT (user_id) DO NOTHING;

-- Example: insert a quote
INSERT INTO public.quotes (name, whatsapp, pincode, bill, category, metadata)
VALUES ('Alice Example', '+911234567890', '500001', '5000-7000', 'residential', jsonb_build_object('source','website'));

-- Example: insert a contact
INSERT INTO public.contacts (name, email, phone, subject, message)
VALUES ('Bob Example', 'bob@example.com', '9998887777', 'Enquiry', 'Please call me');

-- Example: create a job (admin action)
INSERT INTO public.jobs (title, slug, department, location, employment_type, description, is_published, posted_by)
VALUES ('Solar Installer', 'solar-installer', 'Operations', 'Hyderabad, India', 'Full-time', 'Install and maintain solar PV systems', true, (SELECT id FROM public.admin_users WHERE user_id = 'example-admin-uid'))
ON CONFLICT (slug) DO NOTHING;

-- Example: create a resource (admin action)
INSERT INTO public.resources (title, description, url, tags, is_published, created_by)
VALUES ('PV System Sizing Guide', 'Comprehensive guide', 'https://cdn.example.com/pv-sizing.pdf', ARRAY['guide','pv','sizing'], true, (SELECT id FROM public.admin_users WHERE user_id = 'example-admin-uid'))
ON CONFLICT DO NOTHING;

-- Example: candidate applies for a job and provides a resume URL (preferred)
INSERT INTO public.applications (job_id, position, full_name, email, phone, resume_url, resume_filename, resume_content_type, cover_letter)
VALUES (
  (SELECT id FROM public.jobs WHERE slug = 'solar-installer' LIMIT 1),
  'Solar Installer',
  'Carol Candidate',
  'carol@example.com',
  '7776665555',
  'https://storage.example.com/resumes/carol_resume.pdf',
  'carol_resume.pdf',
  'application/pdf',
  'I have 3 years experience...'
);

-- Helpful admin SELECTs
-- Recent quotes
-- SELECT * FROM public.quotes ORDER BY created_at DESC LIMIT 100;
-- Recent contacts
-- SELECT * FROM public.contacts ORDER BY created_at DESC LIMIT 100;
-- Jobs with application counts
-- SELECT j.*, COALESCE(a.count,0) AS application_count
-- FROM public.jobs j
-- LEFT JOIN (SELECT job_id, count(*)::int as count FROM public.applications GROUP BY job_id) a ON a.job_id = j.id
-- ORDER BY j.posted_at DESC;
