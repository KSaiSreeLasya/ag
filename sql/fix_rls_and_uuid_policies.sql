-- Fix RLS policies and safely handle admin_users.user_id uuid/text mismatches
-- 1) Ensure pgcrypto available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2) Ensure admin_users table exists (minimal shape). If your real table differs, adapt accordingly.
CREATE TABLE IF NOT EXISTS public.admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL UNIQUE,
  display_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3) Attempt to convert textual user_id values to uuid safely when all rows are valid UUIDs
DO $$
DECLARE
  cnt_non_uuid int;
BEGIN
  -- Only run conversion if user_id column exists and is type text
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='admin_users' AND column_name='user_id' AND data_type='text'
  ) THEN
    -- Add temporary uuid column if missing
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema='public' AND table_name='admin_users' AND column_name='user_id_uuid'
    ) THEN
      ALTER TABLE public.admin_users ADD COLUMN user_id_uuid uuid;
    END IF;

    -- Populate user_id_uuid only for rows that LOOK like UUIDs (defensive)
    UPDATE public.admin_users
    SET user_id_uuid = user_id::uuid
    WHERE user_id ~ '^[0-9a-fA-F\-]{36}$';

    -- Count any rows we could NOT convert
    SELECT COUNT(*) INTO cnt_non_uuid
    FROM public.admin_users
    WHERE user_id IS NOT NULL AND user_id_uuid IS NULL;

    IF cnt_non_uuid = 0 THEN
      -- Safe to drop textual column and promote uuid column
      ALTER TABLE public.admin_users DROP COLUMN user_id;
      ALTER TABLE public.admin_users RENAME COLUMN user_id_uuid TO user_id;
      RAISE NOTICE 'Converted admin_users.user_id to uuid successfully';
    ELSE
      RAISE NOTICE 'Detected % rows with non-UUID user_id values; leaving user_id as text and creating safe policies', cnt_non_uuid;
      -- Leave table as-is; cleanup temporary column if it is entirely null
      PERFORM 1;
    END IF;
  ELSE
    RAISE NOTICE 'admin_users.user_id is not text or does not exist; skipping conversion step';
  END IF;
END $$;

-- 4) Recreate RLS policies safely. Remove old policies first to ensure idempotency.
-- Drop possible existing policies on relevant tables
DO $$
DECLARE
  _ := 0;
BEGIN
  -- Quotes/Contacts/Applications: simple insert policies
  BEGIN EXECUTE 'DROP POLICY IF EXISTS quotes_insert_public ON public.quotes'; EXCEPTION WHEN others THEN NULL; END;
  BEGIN EXECUTE 'DROP POLICY IF EXISTS contacts_insert_public ON public.contacts'; EXCEPTION WHEN others THEN NULL; END;
  BEGIN EXECUTE 'DROP POLICY IF EXISTS applications_insert_public ON public.applications'; EXCEPTION WHEN others THEN NULL; END;

  -- Jobs policies
  BEGIN EXECUTE 'DROP POLICY IF EXISTS jobs_select_admin ON public.jobs'; EXCEPTION WHEN others THEN NULL; END;
  BEGIN EXECUTE 'DROP POLICY IF EXISTS jobs_insert_admin ON public.jobs'; EXCEPTION WHEN others THEN NULL; END;
  BEGIN EXECUTE 'DROP POLICY IF EXISTS jobs_update_admin ON public.jobs'; EXCEPTION WHEN others THEN NULL; END;
  BEGIN EXECUTE 'DROP POLICY IF EXISTS jobs_delete_admin ON public.jobs'; EXCEPTION WHEN others THEN NULL; END;

  -- Resources policies
  BEGIN EXECUTE 'DROP POLICY IF EXISTS resources_select_admin ON public.resources'; EXCEPTION WHEN others THEN NULL; END;
  BEGIN EXECUTE 'DROP POLICY IF EXISTS resources_insert_admin ON public.resources'; EXCEPTION WHEN others THEN NULL; END;
  BEGIN EXECUTE 'DROP POLICY IF EXISTS resources_update_admin ON public.resources'; EXCEPTION WHEN others THEN NULL; END;
  BEGIN EXECUTE 'DROP POLICY IF EXISTS resources_delete_admin ON public.resources'; EXCEPTION WHEN others THEN NULL; END;
END $$;

-- Create insert policies for public forms (allow anon or authenticated frontend to insert)
-- These policies are intentionally permissive; if you prefer server-side inserts with service role key, you can remove them.
CREATE POLICY IF NOT EXISTS quotes_insert_public ON public.quotes
  FOR INSERT
  WITH CHECK (auth.role() = 'anon' OR auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS contacts_insert_public ON public.contacts
  FOR INSERT
  WITH CHECK (auth.role() = 'anon' OR auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS applications_insert_public ON public.applications
  FOR INSERT
  WITH CHECK (auth.role() = 'anon' OR auth.role() = 'authenticated');

-- Helper expression for admin check: compare admin_users.user_id to auth.uid() safely by casting both to text
-- This works whether admin_users.user_id is uuid or text.

-- Jobs: admin-only policies (select/insert/update/delete)
CREATE POLICY IF NOT EXISTS jobs_select_admin ON public.jobs
  FOR SELECT
  USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY IF NOT EXISTS jobs_insert_admin ON public.jobs
  FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY IF NOT EXISTS jobs_update_admin ON public.jobs
  FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY IF NOT EXISTS jobs_delete_admin ON public.jobs
  FOR DELETE
  USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  );

-- Resources: admin-only policies
CREATE POLICY IF NOT EXISTS resources_select_admin ON public.resources
  FOR SELECT
  USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY IF NOT EXISTS resources_insert_admin ON public.resources
  FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY IF NOT EXISTS resources_update_admin ON public.resources
  FOR UPDATE
  USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  )
  WITH CHECK (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  );

CREATE POLICY IF NOT EXISTS resources_delete_admin ON public.resources
  FOR DELETE
  USING (
    auth.role() = 'authenticated' AND EXISTS (
      SELECT 1 FROM public.admin_users au WHERE au.user_id::text = auth.uid()::text
    )
  );

-- 5) Ensure RLS is enabled on tables (idempotent)
ALTER TABLE IF EXISTS public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.resources ENABLE ROW LEVEL SECURITY;

-- 6) Provide helpful notices (no-ops if tables empty)
-- Add example admin row if none exists (replace 'example-admin-uid' with your real supabase uid as needed)
INSERT INTO public.admin_users (user_id, display_name)
SELECT 'example-admin-uid', 'Site Admin'
WHERE NOT EXISTS (SELECT 1 FROM public.admin_users WHERE user_id::text = 'example-admin-uid');

-- End of script

/*
Notes:
- This script is defensive: it attempts to convert admin_users.user_id to uuid only when all rows are convertible.
- Policies compare au.user_id::text = auth.uid()::text to avoid text=uuid operator errors.
- If you'd like to force conversion of admin_users.user_id to uuid regardless, ensure all user_id values are valid UUID strings then run:
    ALTER TABLE public.admin_users ALTER COLUMN user_id TYPE uuid USING (user_id::uuid);
*/
