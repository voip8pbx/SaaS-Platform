import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';
import User from '@/models/User';
import Subscription from '@/models/Subscription';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/superadmin/analytics
 * Platform-wide analytics for the super admin
 */
export async function GET(req: NextRequest) {
    const { error } = requireAuth(req, ['superadmin']);
    if (error) return error;

    try {
        await dbConnect();

        const [totalAdmins, activeAdmins, totalUsers, planBreakdown, recentAdmins] = await Promise.all([
            Admin.countDocuments({}),
            Admin.countDocuments({ isActive: true }),
            User.countDocuments({}),
            Subscription.aggregate([
                { $group: { _id: '$plan', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]),
            Admin.find({})
                .sort({ createdAt: -1 })
                .limit(10)
                .select('adminId companyDetails.name isActive createdAt'),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                stats: { totalAdmins, activeAdmins, totalUsers },
                planBreakdown,
                recentAdmins,
            },
        });
    } catch (err) {
        console.error('[SuperAdmin Analytics]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
