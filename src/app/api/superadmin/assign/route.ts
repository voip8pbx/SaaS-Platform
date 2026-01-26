import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { adminId, features, theme } = body;

        if (!adminId) {
            return NextResponse.json({ success: false, error: 'Admin ID is required' }, { status: 400 });
        }

        const admin = await Admin.findOneAndUpdate(
            { adminId },
            {
                $set: { features, theme }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ success: true, data: admin });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        console.log("[Assign API] Fetching all admins...");
        await dbConnect();

        // Use a completely unique variable name to avoid any shadowing
        const fetchedAdminsList = await Admin.find({});
        console.log(`[Assign API] Found ${fetchedAdminsList.length} admins.`);

        return NextResponse.json({ success: true, data: fetchedAdminsList });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
