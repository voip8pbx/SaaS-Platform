import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const photoReference = searchParams.get("ref");
    const maxWidth = searchParams.get("width") || "400";

    if (!photoReference) {
        return new NextResponse("Missing photo reference", { status: 400 });
    }

    try {
        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_API_KEY}`;

        const response = await fetch(imageUrl);

        if (!response.ok) {
            return new NextResponse("Failed to fetch image from Google", { status: response.status });
        }

        const imageBuffer = await response.arrayBuffer();
        const headers = new Headers();
        headers.set("Content-Type", response.headers.get("Content-Type") || "image/jpeg");
        headers.set("Cache-Control", "public, max-age=3600");

        return new NextResponse(imageBuffer, {
            status: 200,
            headers: headers,
        });
    } catch (error) {
        console.error("Image Proxy Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
