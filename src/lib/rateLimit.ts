/**
 * Simple in-memory rate limiter for Next.js API routes.
 * For production, replace with Redis-backed limiter (e.g., upstash/ratelimit).
 */

interface RateLimitEntry {
    count: number;
    lastReset: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
    /** Max requests in the window */
    limit: number;
    /** Window size in seconds */
    windowSec: number;
}

export function rateLimit(ip: string, opts: RateLimitOptions): { success: boolean; remaining: number } {
    const now = Date.now();
    const windowMs = opts.windowSec * 1000;

    const entry = store.get(ip);

    if (!entry || now - entry.lastReset > windowMs) {
        store.set(ip, { count: 1, lastReset: now });
        return { success: true, remaining: opts.limit - 1 };
    }

    if (entry.count >= opts.limit) {
        return { success: false, remaining: 0 };
    }

    entry.count++;
    return { success: true, remaining: opts.limit - entry.count };
}

export function getIp(req: Request): string {
    const forwarded = req.headers.get('x-forwarded-for');
    return forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
}
