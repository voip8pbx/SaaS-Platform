import { NextResponse } from 'next/server';

const API_KEY = '351f440f489f16d00f44e55c018633597dbb424e69e7f51562806eeeeb84a964';

export async function GET() {
    try {
        const response = await fetch(`https://serpapi.com/search.json?engine=google_news&q=Travel&gl=us&hl=en&api_key=${API_KEY}`);

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch news from provider' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("News API Proxy Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
