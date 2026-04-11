// config.js - Shared across all pages

const SUPABASE_URL = 'https://wvqsgufeoheqxmwemhoi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2cXNndWZlb2hlcXhtd2VtaG9pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4NjEwMTcsImV4cCI6MjA5MTQzNzAxN30.qrARuFRer9z7MxQ6L6SYaBeDuj-aCddIF0Vg0VSPEDM';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Default seeds — all TBD. Set the real teams via admin.html.
// You never need to edit this file manually.
const INITIAL_SEEDS = {
  east: [
    { seed: 1, team: 'TBD', abbr: 'E1' },
    { seed: 2, team: 'TBD', abbr: 'E2' },
    { seed: 3, team: 'TBD', abbr: 'E3' },
    { seed: 4, team: 'TBD', abbr: 'E4' },
    { seed: 5, team: 'TBD', abbr: 'E5' },
    { seed: 6, team: 'TBD', abbr: 'E6' },
    { seed: 7, team: 'TBD (Play-In)', abbr: 'E7' },
    { seed: 8, team: 'TBD (Play-In)', abbr: 'E8' },
  ],
  west: [
    { seed: 1, team: 'TBD', abbr: 'W1' },
    { seed: 2, team: 'TBD', abbr: 'W2' },
    { seed: 3, team: 'TBD', abbr: 'W3' },
    { seed: 4, team: 'TBD', abbr: 'W4' },
    { seed: 5, team: 'TBD', abbr: 'W5' },
    { seed: 6, team: 'TBD', abbr: 'W6' },
    { seed: 7, team: 'TBD (Play-In)', abbr: 'W7' },
    { seed: 8, team: 'TBD (Play-In)', abbr: 'W8' },
  ]
};

// Matchups per round (index positions — do not change)
const MATCHUPS = {
  east: {
    r1: [[0,7],[1,6],[2,5],[3,4]],
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

const DEADLINE = new Date('2026-04-18T00:00:00-04:00');

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

// Load seeds from Supabase settings (set via admin panel)
// Returns merged seed list overriding defaults with saved values
async function loadSeedsFromDB() {
  const seeds = JSON.parse(JSON.stringify(INITIAL_SEEDS));
  try {
    const { data } = await db.from('settings').select('*');
    if (!data) return seeds;
    data.forEach(row => {
      const match = row.key.match(/^(east|west)_seed_(\d)$/);
      if (match && row.value) {
        const conf = match[1];
        const idx = parseInt(match[2]) - 1; // seed 1 = index 0
        if (seeds[conf][idx]) seeds[conf][idx].team = row.value;
      }
    });
  } catch(e) { /* use defaults */ }
  return seeds;
}
