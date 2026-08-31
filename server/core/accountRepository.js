const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE_PATH = path.join(DATA_DIR, 'accounts.json');
const TEMP_FILE_PATH = `${FILE_PATH}.tmp`;

let cache = null;
let flushScheduled = false;

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, JSON.stringify({}, null, 2), 'utf8');
}

function loadCache() {
  if (cache) return cache;
  ensureStorage();
  try {
    cache = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));
  } catch (e) {
    cache = {};
  }
  return cache;
}

function flushSoon() {
  if (flushScheduled) return;
  flushScheduled = true;
  setImmediate(() => {
    flushScheduled = false;
    try {
      ensureStorage();
      fs.writeFileSync(TEMP_FILE_PATH, JSON.stringify(cache || {}, null, 2), 'utf8');
      fs.renameSync(TEMP_FILE_PATH, FILE_PATH);
    } catch (e) {
      try {
        if (fs.existsSync(TEMP_FILE_PATH)) fs.unlinkSync(TEMP_FILE_PATH);
      } catch (_) {}
    }
  });
}

function writeAll(payload) {
  ensureStorage();
  cache = payload || {};
  flushSoon();
}

module.exports = {
  getAll() {
    return loadCache();
  },

  get(username) {
    const all = loadCache();
    return all[username] || null;
  },

  set(username, account) {
    const all = { ...loadCache() };
    all[username] = account;
    writeAll(all);
  },

  delete(username) {
    const all = { ...loadCache() };
    delete all[username];
    writeAll(all);
  }
};
