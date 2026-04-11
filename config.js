// config.js - Shared across all pages

const SUPABASE_URL = 'https://wvqsgufeoheqxmwemhoi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cXNndWZlb2hlcXhtd2VtaG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NjEwMTcsImV4cCI6MjA5MTQzNzAxN30.qrARuFRer9z7MxQ6L6SYaBeDuj-aCddIF0Vg0VSPEDM';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2026 NBA Playoff seedings (update after play-in if needed via admin)
const INITIAL_SEEDS = {
  east: [
    { seed: 1, team: 'Cleveland Cavaliers', abbr: 'CLE', logo: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg' },
    { seed: 2, team: 'Boston Celtics', abbr: 'BOS', logo: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg' },
    { seed: 3, team: 'New York Knicks', abbr: 'NYK', logo: 'https://cdn.nba.com/logos/nba/1610612752/global/L/logo.svg' },
    { seed: 4, team: 'Milwaukee Bucks', abbr: 'MIL', logo: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg' },
    { seed: 5, team: 'Indiana Pacers', abbr: 'IND', logo: 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg' },
    { seed: 6, team: 'Miami Heat', abbr: 'MIA', logo: 'https://cdn.nba.com/logos/nba/1610612748/global/L/logo.svg' },
    { seed: 7, team: 'TBD (Play-In 7)', abbr: 'E7', logo: '' },
    { seed: 8, team: 'TBD (Play-In 8)', abbr: 'E8', logo: '' },
  ],
  west: [
    { seed: 1, team: 'Oklahoma City Thunder', abbr: 'OKC', logo: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg' },
    { seed: 2, team: 'Houston Rockets', abbr: 'HOU', logo: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg' },
    { seed: 3, team: 'Los Angeles Lakers', abbr: 'LAL', logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg' },
    { seed: 4, team: 'Denver Nuggets', abbr: 'DEN', logo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg' },
    { seed: 5, team: 'Los Angeles Clippers', abbr: 'LAC', logo: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg' },
    { seed: 6, team: 'Minnesota Timberwolves', abbr: 'MIN', logo: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg' },
    { seed: 7, team: 'TBD (Play-In 7)', abbr: 'W7', logo: '' },
    { seed: 8, team: 'TBD (Play-In 8)', abbr: 'W8', logo: '' },
  ]
};

// Matchups per round
const MATCHUPS = {
  east: {
    r1: [[0,7],[1,6],[2,5],[3,4]],   // 1v8, 2v7, 3v6, 4v5
    r2: [['e_r1_w0','e_r1_w1'],['e_r1_w2','e_r1_w3']],
    r3: [['e_r2_w0','e_r2_w1']],
  },
  west: {
    r1: [[0,7],[1,6],[2,5],[3,4]],
    r2: [['w_r1_w0','w_r1_w1'],['w_r1_w2','w_r1_w3']],
    r3: [['w_r2_w0','w_r2_w1']],
  },
  finals: [['e_r3_w0','w_r3_w0']]
};

const DEADLINE = new Date('2026-04-18T00:00:00-04:00'); // April 18 midnight ET

function isDeadlinePassed() {
  return new Date() >= DEADLINE;
}

function formatDeadline() {
  return DEADLINE.toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long',
    day: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZoneName: 'short', timeZone: 'America/New_York'
  });
}
