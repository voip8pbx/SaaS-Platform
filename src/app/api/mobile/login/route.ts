import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { rateLimit, getIp } from '@/lib/rateLimit';

/**
 * POST /api/mobile/login
 * Body: { email, password, adminId }
 * Returns JWT token for mobile app
 */
export async function POST(req: NextRequest) {
    // Rate limit: 10 attempts per minute per IP
    const ip = getIp(req);
    const rl = rateLimit(ip, { limit: 10, windowSec: 60 });
    if (!rl.success) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    try {
        await dbConnect();
        const { email, password, adminId } = await req.json();

        if (!email || !password || !adminId) {
            return NextResponse.json({ error: 'Missing required fields: email, password, adminId' }, { status: 400 });
        }

        const user = await User.findOne({ email, adminId });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        if (!user.password) {
            return NextResponse.json({ error: 'This account uses social login. Please sign in with Google.' }, { status: 401 });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            adminId: user.adminId,
        });

        return NextResponse.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                adminId: user.adminId,
            },
        });
    } catch (error) {
        console.error('[Mobile Login Error]', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
