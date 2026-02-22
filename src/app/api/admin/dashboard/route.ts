import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import Booking from '@/models/Booking';
import User from '@/models/User';
import { requireAuth } from '@/lib/auth';

/**
 * GET /api/admin/dashboard
 * Returns dashboard stats for a given adminId
 * Requires Authorization header or checks adminId matches
 */
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const { error, payload } = requireAuth(req, ['admin', 'superadmin']);
    if (error) return error;

    try {
        await dbConnect();
        const adminId = req.nextUrl.searchParams.get('adminId') || payload!.adminId;

        if (!adminId) {
            return NextResponse.json({ error: 'adminId is required' }, { status: 400 });
        }

        const [admin, totalUsers, totalBookings, revenueResult, recentBookings] = await Promise.all([
            Admin.findOne({ adminId }),
            User.countDocuments({ adminId }),
            Booking.countDocuments({ adminId }),
            Booking.aggregate([
                { $match: { adminId, paymentStatus: 'paid' } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            Booking.find({ adminId })
                .sort({ createdAt: -1 })
                .limit(5)
                .select('bookingRef type status amount createdAt'),
        ]);

        if (!admin) {
            return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                admin,
                stats: {
                    totalUsers,
                    totalBookings,
                    totalRevenue: revenueResult[0]?.total || 0,
                },
                recentBookings,
            },
        });
    } catch (err) {
        console.error('[Admin Dashboard GET]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
