import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { signToken } from '@/lib/auth';
import { rateLimit, getIp } from '@/lib/rateLimit';

/**
 * POST /api/mobile/register
 * Register a new user for a specific admin (tenant)
 * Body: { name, email, password, contactNumber?, adminId }
 */
export async function POST(req: NextRequest) {
    const ip = getIp(req);
    const rl = rateLimit(ip, { limit: 5, windowSec: 60 });
    if (!rl.success) {
        return NextResponse.json({ error: 'Too many requests. Please slow down.' }, { status: 429 });
    }

    try {
        await dbConnect();
        const { name, email, password, contactNumber, adminId } = await req.json();

        // Validation
        if (!name || !email || !password || !adminId) {
            return NextResponse.json(
                { error: 'Missing required fields: name, email, password, adminId' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // Check existing user for this admin
        const existing = await User.findOne({ email, adminId });
        if (existing) {
            return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            contactNumber: contactNumber || '',
            adminId,
            role: 'customer',
        });

        const token = signToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            adminId: user.adminId,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Account created successfully',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    adminId: user.adminId,
                },
            },
            { status: 201 }
        );
    } catch (err) {
        console.error('[Mobile Register]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
