
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { name, email, photoUrl, adminId, googleId } = await req.json();

        if (!email || !adminId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Check if user exists for this admin
        let user = await User.findOne({ email, adminId });

        if (!user) {
            // Create new user
            user = await User.create({
                name,
                email,
                adminId,
                role: 'customer',
                contactNumber: '', // Optional now
                // You might want to store googleId or photoUrl if the schema supports it
                // For now, adhering to existing schema
            });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });

    } catch (error) {
        console.error('Error in mobile auth:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
