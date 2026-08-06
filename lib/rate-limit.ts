interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const attemptStore = new Map<string, RateLimitRecord>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const record = attemptStore.get(ip);

  if (!record || now > record.resetAt) {
    return { allowed: true, remaining: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, retryAfterSeconds };
  }

  return {
    allowed: true,
    remaining: MAX_ATTEMPTS - record.count,
    retryAfterSeconds: 0
  };
}

export function recordFailedAttempt(ip: string): {
  remaining: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const record = attemptStore.get(ip);

  if (!record || now > record.resetAt) {
    attemptStore.set(ip, {
      count: 1,
      resetAt: now + WINDOW_MS
    });
    return { remaining: MAX_ATTEMPTS - 1, retryAfterSeconds: 0 };
  }

  record.count += 1;
  const remaining = Math.max(0, MAX_ATTEMPTS - record.count);
  const retryAfterSeconds = Math.ceil((record.resetAt - now) / 1000);

  return { remaining, retryAfterSeconds };
}

export function resetRateLimit(ip: string): void {
  attemptStore.delete(ip);
}
