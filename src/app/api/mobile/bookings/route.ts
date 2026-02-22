import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/auth';
import { rateLimit, getIp } from '@/lib/rateLimit';

function generateRef(): string {
    return 'TRP-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 5).toUpperCase();
}

/**
 * GET /api/mobile/bookings
 * Lists bookings for the authenticated user
 */
export async function GET(req: NextRequest) {
    const { error, payload } = requireAuth(req);
    if (error) return error;

    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '10')));
        const status = searchParams.get('status');

        const query: Record<string, unknown> = { userId: payload!.userId };
        if (status) query.status = status;

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
        console.error('[Bookings GET]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * POST /api/mobile/bookings
 * Creates a new booking
 */
export async function POST(req: NextRequest) {
    const { error, payload } = requireAuth(req);
    if (error) return error;

    const ip = getIp(req);
    const rl = rateLimit(ip, { limit: 20, windowSec: 60 });
    if (!rl.success) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    try {
        await dbConnect();
        const body = await req.json();
        const { type, details, amount, currency, passengerInfo, travelDates } = body;

        if (!type || !details || amount === undefined || !passengerInfo || !travelDates?.from) {
            return NextResponse.json({ error: 'Missing required booking fields' }, { status: 400 });
        }

        const booking = await Booking.create({
            adminId: payload!.adminId,
            userId: payload!.userId,
            type,
            details,
            amount,
            currency: currency || 'INR',
            passengerInfo,
            travelDates,
            bookingRef: generateRef(),
            status: 'pending',
            paymentStatus: 'unpaid',
        });

        return NextResponse.json({ success: true, data: booking }, { status: 201 });
    } catch (err) {
        console.error('[Bookings POST]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
