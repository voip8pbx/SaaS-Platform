import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/bookings
 * List all bookings for an admin's platform (tenant-scoped)
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
        const status = searchParams.get('status');
        const type = searchParams.get('type');

        if (!adminId) {
            return NextResponse.json({ error: 'adminId is required' }, { status: 400 });
        }

        const query: Record<string, unknown> = { adminId };
        if (status) query.status = status;
        if (type) query.type = type;

        const [bookings, total] = await Promise.all([
            Booking.find(query)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit),
            Booking.countDocuments(query),
        ]);

        return NextResponse.json({
            success: true,
            data: bookings,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) },
        });
    } catch (err) {
        console.error('[Admin Bookings GET]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * PATCH /api/admin/bookings
 * Update booking status (admin action)
 */
export async function PATCH(req: NextRequest) {
    const { error, payload } = requireAuth(req, ['admin', 'superadmin']);
    if (error) return error;

    try {
        await dbConnect();
        const { bookingId, status, paymentStatus } = await req.json();

        if (!bookingId) {
            return NextResponse.json({ error: 'bookingId is required' }, { status: 400 });
        }

        const adminId = payload!.adminId;
        const updates: Record<string, string> = {};
        if (status) updates.status = status;
        if (paymentStatus) updates.paymentStatus = paymentStatus;

        const booking = await Booking.findOneAndUpdate(
            { _id: bookingId, adminId },
            { $set: updates },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (err) {
        console.error('[Admin Bookings PATCH]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
