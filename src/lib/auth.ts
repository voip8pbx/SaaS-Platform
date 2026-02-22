import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || 'dev-secret';

export interface JWTPayload {
    userId: string;
    email: string;
    role: 'superadmin' | 'admin' | 'customer' | 'agent';
    adminId?: string;
    iat?: number;
    exp?: number;
}

export function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>, expiresIn = '7d'): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

export function getTokenFromRequest(req: Request): string | null {
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    return null;
}

export function requireAuth(req: Request, allowedRoles?: JWTPayload['role'][]) {
    const token = getTokenFromRequest(req);
    if (!token) {
        return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), payload: null };
    }

    const payload = verifyToken(token);
    if (!payload) {
        return { error: NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }), payload: null };
    }

    if (allowedRoles && !allowedRoles.includes(payload.role)) {
        return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }), payload: null };
    }

    return { error: null, payload };
}
