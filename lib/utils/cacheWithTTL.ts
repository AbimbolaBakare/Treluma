type CacheEntry<T> = {
  value: T;
  expires: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export async function cacheWithTTL<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlMs: number = 1000 * 60 * 60 // 1 hour
): Promise<T> {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && cached.expires > now) {
    return cached.value as T;
  }

  const result = await fetchFn();

  cache.set(key, {
    value: result,
    expires: now + ttlMs,
  });

  return result;
}
