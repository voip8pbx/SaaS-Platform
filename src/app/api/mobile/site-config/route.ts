import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/mobile/site-config?adminId=xxx
 * Returns the site configuration for the mobile app
 * This is a PUBLIC endpoint (no auth required, as the app needs it pre-login)
 */
export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const adminId = req.nextUrl.searchParams.get('adminId');

        if (!adminId) {
            return NextResponse.json({ error: 'adminId is required' }, { status: 400 });
        }

        const admin = await Admin.findOne({ adminId, isActive: true }).select(
            'adminId companyDetails theme features contact social'
        );

        if (!admin) {
            return NextResponse.json({ error: 'Site configuration not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                adminId: admin.adminId,
                name: admin.companyDetails?.name || 'Travel Planner',
                logoUrl: admin.companyDetails?.logoUrl || '',
                description: admin.companyDetails?.description || '',
                primaryColor: admin.theme?.primaryColor || '#6366f1',
                secondaryColor: admin.theme?.secondaryColor || '#f1f5f9',
                theme: admin.theme?.mode || 'light',
                fontFamily: admin.theme?.fontFamily || 'Inter',
                features: admin.features,
                contact: admin.contact,
                social: admin.social,
            },
        });
    } catch (err) {
        console.error('[Site Config GET]', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
