import crypto from 'crypto';

const COOKIE_NAME = 'admin_session';
const SECRET_KEY = process.env.ADMIN_PASSWORD || 'fargoni_academy_secure_secret_2026';

export function createAdminToken(): string {
  const payload = {
    role: 'admin',
    exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  };

  const payloadString = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadString)
    .digest('base64url');

  return `${payloadString}.${signature}`;
}

export function verifyAdminToken(token: string): boolean {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadString, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payloadString)
    .digest('base64url');

  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(Buffer.from(payloadString, 'base64url').toString());
    if (payload.exp && Date.now() > payload.exp) {
      return false;
    }
    return payload.role === 'admin';
  } catch (e) {
    return false;
  }
}

export function verifyAdminSession(request: Request): boolean {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parseCookies(cookieHeader);
  const token = cookies[COOKIE_NAME];
  return verifyAdminToken(token);
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const list: Record<string, string> = {};
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    const name = parts.shift()?.trim();
    const value = parts.join('=').trim();
    if (name) {
      list[name] = decodeURIComponent(value);
    }
  });

  return list;
}
