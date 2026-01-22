import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");
    const type = searchParams.get("type") || "car"; // 'car' or 'bike'

    if (!location) {
        return NextResponse.json({ results: [] });
    }

    const query = `${type} rental in ${location}`;

    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();

        if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
            console.error("Google Places API Error:", data.status, data.error_message);
            return NextResponse.json({ error: "Failed to fetch rental places" }, { status: 500 });
        }

        return NextResponse.json({ results: data.results || [] });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
