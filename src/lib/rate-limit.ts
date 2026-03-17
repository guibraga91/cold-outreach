const rateMap = new Map<string, { timestamps: number[] }>();

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

const HOURLY_LIMIT = 3;
const DAILY_LIMIT = 10;

export function checkRateLimit(ip: string): {
  allowed: boolean;
  error?: string;
} {
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { timestamps: [] };

  // Clean up timestamps older than 24 hours
  entry.timestamps = entry.timestamps.filter((t) => now - t < DAY);

  const hourlyCount = entry.timestamps.filter((t) => now - t < HOUR).length;
  const dailyCount = entry.timestamps.length;

  if (hourlyCount >= HOURLY_LIMIT) {
    return {
      allowed: false,
      error: `Rate limit exceeded: ${HOURLY_LIMIT} requests per hour. Try again later.`,
    };
  }

  if (dailyCount >= DAILY_LIMIT) {
    return {
      allowed: false,
      error: `Rate limit exceeded: ${DAILY_LIMIT} requests per day. Try again tomorrow.`,
    };
  }

  entry.timestamps.push(now);
  rateMap.set(ip, entry);

  return { allowed: true };
}
