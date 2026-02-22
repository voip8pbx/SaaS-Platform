import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import Subscription from '@/models/Subscription';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/subscription
 * Get subscription details for an admin
 */
export async function GET(req: NextRequest) {
    const { error, payload } = requireAuth(req, ['admin', 'superadmin']);
    if (error) return error;

    try {
        await dbConnect();
        const adminId = req.nextUrl.searchParams.get('adminId') || payload!.adminId;

        const subscription = await Subscription.findOne({ adminId });

        if (!subscription) {
            // Return a default free plan if none exists
            return NextResponse.json({
                success: true,
                data: {
                    adminId,
                    plan: 'free',
                    status: 'trial',
                    features: [],
                },
            });
        }

        return NextResponse.json({ success: true, data: subscription });
    } catch (err) {
        console.error('[Subscription GET]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

/**
 * POST /api/admin/subscription
 * Create or update subscription (SuperAdmin only)
 */
export async function POST(req: NextRequest) {
    const { error, payload } = requireAuth(req, ['superadmin']);
    if (error) return error;

    try {
        await dbConnect();
        const { adminId, plan, status, seats, features, periodEndDays } = await req.json();

        if (!adminId || !plan) {
            return NextResponse.json({ error: 'adminId and plan are required' }, { status: 400 });
        }

        const now = new Date();
        const periodEnd = new Date(now.getTime() + (periodEndDays || 30) * 24 * 60 * 60 * 1000);

        const subscription = await Subscription.findOneAndUpdate(
            { adminId },
            {
                $set: {
                    plan,
                    status: status || 'active',
                    seats: seats || 1,
                    features: features || [],
                    currentPeriodStart: now,
                    currentPeriodEnd: periodEnd,
                    updatedAt: now,
                },
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, data: subscription });
    } catch (err) {
        console.error('[Subscription POST]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
