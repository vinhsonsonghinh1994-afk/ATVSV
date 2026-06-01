const SUPABASE_URL  = 'https://lasbxdhexxczzfrfkexn.supabase.co';
const SUPABASE_KEY  = 'sb_publishable_eRMAip0BXZYzWQ98gwvqrA_udyYHxkR';

async function saveResult(data) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/exam_results`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch(e) { console.warn('Lưu điểm thất bại:', e); return false; }
}

async function getLeaderboard() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/exam_results?exam_id=eq.kythi&select=name,score,total,percent,duration_sec,created_at&order=percent.desc,duration_sec.asc&limit=20`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    return res.ok ? await res.json() : [];
  } catch(e) { return []; }
}

async function getHistory(name) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/exam_results?exam_id=eq.kythi&name=eq.${encodeURIComponent(name)}&select=exam_name,score,total,percent,duration_sec,created_at&order=created_at.desc&limit=10`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    return res.ok ? await res.json() : [];
  } catch(e) { return []; }
}
