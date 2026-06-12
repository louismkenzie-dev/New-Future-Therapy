ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS contacted boolean NOT NULL DEFAULT false;
