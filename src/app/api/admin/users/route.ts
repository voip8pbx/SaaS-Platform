import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/users
 * List users for an admin (tenant-scoped)
 */
export async function GET(req: NextRequest) {
    const { error, payload } = requireAuth(req, ['admin', 'superadmin']);
    if (error) return error;

    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const adminId = searchParams.get('adminId') || payload!.adminId;
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')));
        const search = searchParams.get('search') || '';

        if (!adminId) {
            return NextResponse.json({ error: 'adminId is required' }, { status: 400 });
        }

        const query: Record<string, unknown> = { adminId };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        const [users, total] = await Promise.all([
            User.find(query)
                .select('-password')
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            User.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            data: users,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (err) {
        console.error('[Admin Users GET]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
