const Database = require('better-sqlite3');
const db = new Database('C:\\Users\\TinChoX\\.local\\share\\opencode\\opencode.db', { readonly: true });
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
// Search ALL tables for MCP-related content
for (const t of tables) {
  const name = t.name;
  try {
    const cols = db.prepare('PRAGMA table_info("' + name + '")').all();
    const colNames = cols.map(c => c.name);
    const rows = db.prepare('SELECT * FROM "' + name + '"').all();
    for (const r of rows) {
      const str = JSON.stringify(r);
      if (str.includes('mcp') || str.includes('supabase') || str.includes('sbp_oauth') || str.includes('oauth')) {
        console.log('\n=== ' + name + ' ===');
        console.log(str.slice(0, 4000));
      }
    }
  } catch(e) {}
}
// Also check event and data_migration tables
console.log('\nSearching event table...');
try {
  const events = db.prepare("SELECT data FROM event WHERE data LIKE '%mcp%' OR data LIKE '%supabase%' OR data LIKE '%oauth%'").all();
  events.forEach(e => console.log(e.data ? JSON.stringify(e.data).slice(0, 3000) : 'null'));
} catch(e) { console.log(e.message); }
db.close();
