const Database = require('better-sqlite3');
const db = new Database('C:\\Users\\TinChoX\\.local\\share\\opencode\\opencode.db', { readonly: true });
// Search all tables for token/oauth/credential data
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
for (const t of tables) {
  const name = t.name;
  try {
    const cols = db.prepare('PRAGMA table_info("' + name + '")').all();
    const colNames = cols.map(c => c.name);
    const rows = db.prepare('SELECT * FROM "' + name + '"').all();
    for (const r of rows) {
      const str = JSON.stringify(r);
      // Look for tokens, keys, or credentials
      if (str.includes('sbp_oauth') || str.includes('access_token') || str.includes('refresh_token') || (str.includes('mcp') && (str.includes('supabase') || str.includes('token')))) {
        console.log('\n=== ' + name + ' ===');
        console.log(JSON.stringify(r, null, 2).slice(0, 5000));
      }
    }
  } catch(e) {}
}
db.close();
