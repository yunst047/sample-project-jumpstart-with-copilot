import Database from 'better-sqlite3';
import path from 'path';

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'app.db');

let db: Database.Database | null = null;

export function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initializeDatabase(db);
  }
  return db;
}

function initializeDatabase(database: Database.Database): void {
  // Create persons table
  database.exec(`
    CREATE TABLE IF NOT EXISTS persons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create assets table with foreign key to persons
  database.exec(`
    CREATE TABLE IF NOT EXISTS assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      person_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      value REAL NOT NULL,
      acquired_date DATE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (person_id) REFERENCES persons(id) ON DELETE CASCADE
    )
  `);

  // Create index for faster lookups
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_assets_person_id ON assets(person_id)
  `);
}

// Person CRUD operations
export function getAllPersons() {
  const db = getDatabase();
  return db.prepare('SELECT * FROM persons ORDER BY created_at DESC').all();
}

export function getPersonById(id: number) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM persons WHERE id = ?').get(id);
}

export function createPerson(name: string, email: string, phone?: string) {
  const db = getDatabase();
  const stmt = db.prepare('INSERT INTO persons (name, email, phone) VALUES (?, ?, ?)');
  const result = stmt.run(name, email, phone || null);
  return { id: result.lastInsertRowid, name, email, phone };
}

export function updatePerson(id: number, name: string, email: string, phone?: string) {
  const db = getDatabase();
  const stmt = db.prepare('UPDATE persons SET name = ?, email = ?, phone = ? WHERE id = ?');
  stmt.run(name, email, phone || null, id);
  return getPersonById(id);
}

export function deletePerson(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM persons WHERE id = ?');
  return stmt.run(id);
}

// Asset CRUD operations
export function getAllAssets() {
  const db = getDatabase();
  return db.prepare(`
    SELECT assets.*, persons.name as person_name 
    FROM assets 
    LEFT JOIN persons ON assets.person_id = persons.id 
    ORDER BY assets.created_at DESC
  `).all();
}

export function getAssetById(id: number) {
  const db = getDatabase();
  return db.prepare(`
    SELECT assets.*, persons.name as person_name 
    FROM assets 
    LEFT JOIN persons ON assets.person_id = persons.id 
    WHERE assets.id = ?
  `).get(id);
}

export function getAssetsByPersonId(personId: number) {
  const db = getDatabase();
  return db.prepare('SELECT * FROM assets WHERE person_id = ? ORDER BY created_at DESC').all(personId);
}

export function createAsset(personId: number, name: string, description: string | undefined, value: number, acquiredDate: string) {
  const db = getDatabase();
  const stmt = db.prepare('INSERT INTO assets (person_id, name, description, value, acquired_date) VALUES (?, ?, ?, ?, ?)');
  const result = stmt.run(personId, name, description || null, value, acquiredDate);
  return { id: result.lastInsertRowid, person_id: personId, name, description, value, acquired_date: acquiredDate };
}

export function updateAsset(id: number, personId: number, name: string, description: string | undefined, value: number, acquiredDate: string) {
  const db = getDatabase();
  const stmt = db.prepare('UPDATE assets SET person_id = ?, name = ?, description = ?, value = ?, acquired_date = ? WHERE id = ?');
  stmt.run(personId, name, description || null, value, acquiredDate, id);
  return getAssetById(id);
}

export function deleteAsset(id: number) {
  const db = getDatabase();
  const stmt = db.prepare('DELETE FROM assets WHERE id = ?');
  return stmt.run(id);
}
