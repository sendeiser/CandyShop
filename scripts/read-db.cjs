const Database = require('better-sqlite3');
const db = new Database('C:\\Users\\TinChoX\\.local\\share\\opencode\\opencode.db', { readonly: true });
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables.map(t => t.name).join(', '));
for (const t of tables) {
  const name = t.name;
  if (name.includes('mcp') || name.includes('oauth') || name.includes('credential') || name.includes('token') || name.includes('secret') || name.includes('key')) {
    try {
      const rows = db.prepare('SELECT * FROM "' + name + '"').all();
      console.log('\n=== ' + name + ' ===');
      console.log(JSON.stringify(rows, null, 2).slice(0, 8000));
    } catch(e) { console.log(name + ': ' + e.message); }
  }
}
for (const t of tables) {
  const name = t.name;
  if (!name.includes('sqlite') && !name.includes('migration') && name.length > 1) {
    try {
      const cols = db.prepare('PRAGMA table_info("' + name + '")').all();
      const colNames = cols.map(c => c.name);
      if (colNames.some(c => c.includes('mcp') || c.includes('oauth') || c.includes('credential') || c.includes('token') || c.includes('secret') || c.includes('key'))) {
        const rows = db.prepare('SELECT * FROM "' + name + '"').all();
        console.log('\n=== ' + name + ' (matched by column) ===');
        rows.forEach(r => console.log(JSON.stringify(r).slice(0, 3000)));
      }
    } catch(e) {}
  }
}
db.close();
