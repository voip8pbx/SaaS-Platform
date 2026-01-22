import { NextResponse } from 'next/server';
import { trainStations } from '@/data/trainStations';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const date = searchParams.get('date');

    const apiKey = process.env.RAPID_API_KEY;
    const apiHost = process.env.RAPID_API_HOST;

    if (!apiKey || !apiHost) {
        return NextResponse.json({ error: 'API Configuration Missing' }, { status: 500 });
    }

    // Helper to extract or map station code
    const getCode = (name: string | null) => {
        if (!name) return '';
        const lower = name.toLowerCase().trim();

        // 1. Check if input is a known code (2-4 chars)
        if (name.length >= 2 && name.length <= 4 && /^[a-zA-Z]+$/.test(name)) {
            return name.toUpperCase();
        }

        // 2. Direct match in database
        if (trainStations[lower]) return trainStations[lower];

        // 3. Partial match (e.g. "New Delhi, India" contains "new delhi")
        // Sort keys by length desc to match "New Delhi" before "Delhi"
        const sortedKeys = Object.keys(trainStations).sort((a, b) => b.length - a.length);
        for (const key of sortedKeys) {
            if (lower.includes(key)) return trainStations[key];
        }

        // 4. Fallback
        console.warn(`Station code not found for: ${name}, using fallback.`);
        return name.substring(0, 4).toUpperCase();
    };

    const fromCode = getCode(from);
    const toCode = getCode(to);

    try {
        const url = `https://${apiHost}/api/v3/trainBetweenStations?fromCode=${fromCode}&toCode=${toCode}&dateOfJourney=${date}`;

        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': apiHost
            }
        });

        const data = await response.json();

        if (data.data) {
            const trains = data.data.map((t: any) => ({
                id: t.train_number?.toString() || Math.random().toString(),
                name: t.train_name || 'Unknown Train',
                number: t.train_number?.toString() || '---',
                from: t.from_station_name || fromCode,
                to: t.to_station_name || toCode,
                departure: t.from_std || '00:00',
                arrival: t.to_std || '00:00',
                duration: t.duration || '0h 00m',
                price: 1200, // Placeholder
                type: "Express", // Placeholder
                availableSeats: 42, // Placeholder
                rating: 4.2 // Placeholder
            }));
            return NextResponse.json({ success: true, data: trains });
        } else {
            console.error("API Response empty or error:", data);
            // Return empty list if no data found
            return NextResponse.json({ success: true, data: [] });
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        return NextResponse.json({ error: 'Failed to fetch from external API' }, { status: 500 });
    }
}
