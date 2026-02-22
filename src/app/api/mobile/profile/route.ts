import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth';

/**
 * GET /api/mobile/profile
 * Header: Authorization: Bearer <token>
 */
export async function GET(req: NextRequest) {
    const { error, payload } = requireAuth(req);
    if (error) return error;

    try {
        await dbConnect();
        const user = await User.findById(payload!.userId).select('-password');
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, user });
    } catch (err) {
        console.error('[Profile GET]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * PATCH /api/mobile/profile
 * Header: Authorization: Bearer <token>
 * Body: { name?, contactNumber? }
 */
export async function PATCH(req: NextRequest) {
    const { error, payload } = requireAuth(req);
    if (error) return error;

    try {
        await dbConnect();
        const body = await req.json();
        const allowedUpdates = ['name', 'contactNumber'];
        const updates: Record<string, unknown> = {};

        for (const key of allowedUpdates) {
            if (body[key] !== undefined) {
                updates[key] = body[key];
            }
        }

        const user = await User.findByIdAndUpdate(
            payload!.userId,
            { $set: updates },
            { new: true }
        ).select('-password');

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, user });
    } catch (err) {
        console.error('[Profile PATCH]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
