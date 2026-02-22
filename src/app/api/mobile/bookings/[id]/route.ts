import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import { requireAuth } from '@/lib/auth';

/**
 * GET /api/mobile/bookings/[id]
 * Get a single booking by ID
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { error, payload } = requireAuth(req);
    if (error) return error;

    try {
        await dbConnect();
        const { id } = await params;
        const booking = await Booking.findOne({ _id: id, userId: payload!.userId });

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (err) {
        console.error('[Booking GET by id]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * PATCH /api/mobile/bookings/[id]
 * Cancel a booking
 */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { error, payload } = requireAuth(req);
    if (error) return error;

    try {
        await dbConnect();
        const { id } = await params;
        const { status } = await req.json();

        if (!['cancelled'].includes(status)) {
            return NextResponse.json({ error: 'Only cancellation is allowed via this endpoint' }, { status: 400 });
        }

        const booking = await Booking.findOneAndUpdate(
            { _id: id, userId: payload!.userId, status: { $nin: ['cancelled', 'completed'] } },
            { $set: { status } },
            { new: true }
        );

        if (!booking) {
            return NextResponse.json({ error: 'Booking not found or cannot be modified' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: booking });
    } catch (err) {
        console.error('[Booking PATCH]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
