import crypto from 'node:crypto';

// ---------------------------------------------------------------
// Demonstração: autenticação simples com token assinado (HMAC).
// Em produção, use bcrypt/argon2 e armazene o segredo em env vars.
// ---------------------------------------------------------------

const SECRET = process.env.WORLDTRIP_SECRET || 'worldtrip-dev-secret';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 dias

export function hashPassword(password) {
  return crypto.createHash('sha256').update(`worldtrip::${password}`).digest('hex');
}

export function createToken(username) {
  const payload = {
    username,
    iat: Date.now(),
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(body)
    .digest('base64url');
  return `${body}.${signature}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const [body, signature] = token.split('.');
  if (!body || !signature) return null;
  const expected = crypto
    .createHmac('sha256', SECRET)
    .update(body)
    .digest('base64url');
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
  if (Date.now() > payload.exp) return null;
  return payload;
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Não autorizado. Faça login novamente.' });
  }
  req.user = payload;
  next();
}
