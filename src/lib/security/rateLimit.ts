interface RateLimitEntry {
  timestamps: number[];
}

const bucketStore = new Map<string, Map<string, RateLimitEntry>>();

/**
 * In-memory per-IP sliding-window rate limiter shared across form & telemetry routes.
 */
export function isRateLimited(
  namespace: string,
  ip: string,
  windowMs = 60_000,
  maxRequests = 8,
): boolean {
  let store = bucketStore.get(namespace);
  if (!store) {
    store = new Map();
    bucketStore.set(namespace, store);
  }

  const now = Date.now();
  const prev = store.get(ip)?.timestamps || [];
  const active = prev.filter((ts) => now - ts < windowMs);

  if (active.length >= maxRequests) {
    store.set(ip, { timestamps: active });
    return true;
  }

  active.push(now);
  store.set(ip, { timestamps: active });

  if (store.size > 1000) {
    for (const [key, val] of store.entries()) {
      const fresh = val.timestamps.filter((ts) => now - ts < windowMs);
      if (fresh.length === 0) store.delete(key);
      else store.set(key, { timestamps: fresh });
    }
  }

  return false;
}

const dedupCache = new Map<string, number>();

/**
 * Suppresses rapid duplicate telemetry bursts for identical client keys.
 */
export function isDuplicateEvent(key: string, cooldownMs = 25_000): boolean {
  const now = Date.now();
  const last = dedupCache.get(key);
  if (last && now - last < cooldownMs) return true;
  dedupCache.set(key, now);

  if (dedupCache.size > 1000) {
    for (const [k, ts] of dedupCache.entries()) {
      if (now - ts >= cooldownMs) dedupCache.delete(k);
    }
  }
  return false;
}
