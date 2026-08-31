const crypto = require('crypto');
const accountRepository = require('./accountRepository');
const playerStore = require('./playerStore');

function nowIso() {
  return new Date().toISOString();
}

function normalizeUsername(raw) {
  return String(raw || '').trim().toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 16);
}

function validatePassword(raw) {
  return typeof raw === 'string' && raw.length >= 4 && raw.length <= 64;
}

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
}

function makeSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function makeAuthToken() {
  return crypto.randomBytes(24).toString('hex');
}

function issueAuthSession(account) {
  account.authToken = makeAuthToken();
  account.sessionIssuedAt = nowIso();
  account.lastLoginAt = account.sessionIssuedAt;
  return account.authToken;
}

module.exports = {
  register(usernameRaw, passwordRaw, playerName) {
    const username = normalizeUsername(usernameRaw);
    if (!username || username.length < 3) return { error: 'Usuario invalido' };
    if (!validatePassword(passwordRaw)) return { error: 'La contrasena debe tener entre 4 y 64 caracteres' };
    if (accountRepository.get(username)) return { error: 'Ese usuario ya existe' };

    const playerId = `acct_${crypto.randomBytes(8).toString('hex')}`;
    const profileResult = playerStore.identify(playerId, '', playerName || username);
    const salt = makeSalt();
    const account = {
      username,
      passwordSalt: salt,
      passwordHash: hashPassword(passwordRaw, salt),
      playerId: profileResult.playerId,
      authToken: '',
      sessionIssuedAt: null,
      createdAt: nowIso(),
      lastLoginAt: nowIso()
    };
    const authToken = issueAuthSession(account);
    accountRepository.set(username, account);

    return {
      ok: true,
      username,
      playerId: profileResult.playerId,
      authToken,
      profile: profileResult.profile
    };
  },

  login(usernameRaw, passwordRaw) {
    const username = normalizeUsername(usernameRaw);
    const account = accountRepository.get(username);
    if (!account) return { error: 'Cuenta no encontrada' };
    const computed = hashPassword(passwordRaw || '', account.passwordSalt);
    if (computed !== account.passwordHash) return { error: 'Credenciales invalidas' };

    const authToken = issueAuthSession(account);
    accountRepository.set(username, account);
    const profile = playerStore.touch(account.playerId);
    return {
      ok: true,
      username,
      playerId: account.playerId,
      authToken,
      profile
    };
  },

  resume(authTokenRaw) {
    const authToken = String(authTokenRaw || '');
    if (!authToken) return { error: 'Sesion no encontrada' };
    const all = accountRepository.getAll();
    for (const account of Object.values(all)) {
      if (account && account.authToken === authToken) {
        account.lastLoginAt = nowIso();
        accountRepository.set(account.username, account);
        const profile = playerStore.touch(account.playerId);
        return {
          ok: true,
          username: account.username,
          playerId: account.playerId,
          authToken: account.authToken,
          profile
        };
      }
    }
    return { error: 'Sesion no encontrada' };
  },

  logout(authTokenRaw) {
    const authToken = String(authTokenRaw || '');
    if (!authToken) return { ok: true };
    const all = accountRepository.getAll();
    for (const [username, account] of Object.entries(all)) {
      if (account && account.authToken === authToken) {
        account.authToken = '';
        accountRepository.set(username, account);
        return { ok: true, username };
      }
    }
    return { ok: true };
  },

  getPublicAccount(usernameRaw) {
    const username = normalizeUsername(usernameRaw);
    const account = accountRepository.get(username);
    if (!account) return null;
    return {
      username: account.username,
      playerId: account.playerId,
      createdAt: account.createdAt,
      lastLoginAt: account.lastLoginAt,
      sessionIssuedAt: account.sessionIssuedAt || null
    };
  },

  removeByPlayerId(playerId) {
    const all = accountRepository.getAll();
    for (const [username, account] of Object.entries(all)) {
      if (account && account.playerId === playerId) {
        accountRepository.delete(username);
        return username;
      }
    }
    return null;
  }
};
