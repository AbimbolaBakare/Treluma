const requestLog = new Map<string, number[]>();

export function isRateLimited(
  ip: string,
  windowMs: number,
  maxRequests: number
): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) || [];
  const recent = requests.filter((t) => now - t < windowMs);
  requestLog.set(ip, [...recent, now]);
  return recent.length >= maxRequests;
}
