BEGIN;

-- Create backups if they do not already exist (safe guard)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'contacts_backup_20250909') THEN
    CREATE TABLE contacts_backup_20250909 AS TABLE contacts;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'quotes_backup_20250909') THEN
    CREATE TABLE quotes_backup_20250909 AS TABLE quotes;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'job_applications_backup_20250909') THEN
    -- If a jobs-like table exists, back that up too (best-effort)
    IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'jobs') THEN
      CREATE TABLE job_applications_backup_20250909 AS TABLE jobs;
    END IF;
  END IF;
END$$;

-- 1) Contacts: ensure subject column exists, populate empty values, set NOT NULL
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS subject text;

UPDATE contacts
SET subject = '(none)'
WHERE subject IS NULL OR TRIM(subject) = '';

ALTER TABLE contacts
ALTER COLUMN subject SET NOT NULL;

-- 2) Quotes: add commonly expected columns and migrate pincode -> postal_code
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS name text;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS whatsapp text;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS pincode text;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS postal_code text;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS agree boolean DEFAULT false;
ALTER TABLE quotes ADD COLUMN IF NOT EXISTS bill jsonb;

-- Migrate pincode values into postal_code when postal_code is empty
UPDATE quotes
SET postal_code = pincode
WHERE (postal_code IS NULL OR TRIM(postal_code) = '')
  AND pincode IS NOT NULL AND TRIM(pincode) <> '';

-- (Optional) If you want to enforce not-null for name/whatsapp/category, populate defaults then set NOT NULL
UPDATE quotes SET name = '(unknown)' WHERE name IS NULL OR TRIM(name) = '';
UPDATE quotes SET whatsapp = '(unknown)' WHERE whatsapp IS NULL OR TRIM(whatsapp) = '';
UPDATE quotes SET category = '(general)' WHERE category IS NULL OR TRIM(category) = '';

ALTER TABLE quotes ALTER COLUMN name SET NOT NULL;
ALTER TABLE quotes ALTER COLUMN whatsapp SET NOT NULL;
ALTER TABLE quotes ALTER COLUMN category SET NOT NULL;

-- 3) Job applications: create a durable table to persist applications if missing
-- Ensure pgcrypto is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  position text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  experience_years text,
  linkedin text,
  portfolio text,
  cover_letter text NOT NULL,
  expected_salary text,
  notice_period text,
  created_at timestamptz DEFAULT now()
);

-- If an existing jobs table is used for applications, add missing columns to it
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS cover_letter text;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS portfolio text;
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS linkedin text;

-- Optionally find rows with missing cover_letter in job_applications
-- (Left as a check; the application flow requires cover_letter per frontend schema)

COMMIT;
