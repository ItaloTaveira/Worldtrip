import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

fs.mkdirSync(DATA_DIR, { recursive: true });

const FILES = {
  trips: path.join(DATA_DIR, 'trips.json'),
  leads: path.join(DATA_DIR, 'leads.json'),
  users: path.join(DATA_DIR, 'users.json'),
};

function readFile(name, fallback) {
  try {
    const raw = fs.readFileSync(FILES[name], 'utf-8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeFile(name, data) {
  fs.writeFileSync(FILES[name], JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  read(name, fallback = []) {
    return readFile(name, fallback);
  },
  write(name, data) {
    writeFile(name, data);
  },
  find(name, predicate) {
    return readFile(name, []).find(predicate);
  },
  all(name) {
    return readFile(name, []);
  },
  insert(name, record) {
    const list = readFile(name, []);
    list.push(record);
    writeFile(name, list);
    return record;
  },
  update(name, id, patch) {
    const list = readFile(name, []);
    const idx = list.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...patch, id };
    writeFile(name, list);
    return list[idx];
  },
  remove(name, id) {
    const list = readFile(name, []);
    const next = list.filter((r) => r.id !== id);
    writeFile(name, next);
    return next.length !== list.length;
  },
};
