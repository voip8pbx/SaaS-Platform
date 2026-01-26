import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Admin from '@/models/Admin';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();

        const body = await req.json();
        const { adminId, companyDetails } = body;

        if (!adminId) {
            return NextResponse.json({ success: false, error: 'Admin ID is required' }, { status: 400 });
        }

        const admin = await Admin.findOneAndUpdate(
            { adminId },
            { $set: { companyDetails } },
            { new: true }
        );

        if (!admin) {
            return NextResponse.json({ success: false, error: 'Admin not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: admin });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
