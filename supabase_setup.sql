-- NBA Playoff Bracket App - Supabase Setup
-- Run this entire file in your Supabase SQL Editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brackets table (one per user)
CREATE TABLE IF NOT EXISTS brackets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  picks JSONB NOT NULL DEFAULT '{}',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  locked BOOLEAN DEFAULT FALSE,
  total_points INTEGER DEFAULT 0
);

-- NBA results table (you or admin updates this, or auto-fetched)
CREATE TABLE IF NOT EXISTS results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  round INTEGER NOT NULL,         -- 1=First, 2=Second, 3=Conf Finals, 4=Finals
  series_key TEXT NOT NULL UNIQUE, -- e.g. "E1vsE8_R1"
  winner TEXT,
  score TEXT,                      -- e.g. "4-1"
  loser TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- App settings (bracket open/close control)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

INSERT INTO settings (key, value) VALUES
  ('bracket_open', 'false'),
  ('bracket_deadline', '2026-04-18T00:00:00Z'),
  ('playoff_started', 'false')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE brackets ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policies: allow all reads, controlled writes via anon key
CREATE POLICY "Allow read users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow insert users" ON users FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read brackets" ON brackets FOR SELECT USING (true);
CREATE POLICY "Allow insert brackets" ON brackets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update brackets" ON brackets FOR UPDATE USING (true);

CREATE POLICY "Allow read results" ON results FOR SELECT USING (true);
CREATE POLICY "Allow insert results" ON results FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update results" ON results FOR UPDATE USING (true);

CREATE POLICY "Allow read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow update settings" ON settings FOR UPDATE USING (true);
