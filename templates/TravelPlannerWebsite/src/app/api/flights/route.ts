import { NextResponse } from 'next/server';
import { fetchFlights } from '@/lib/flight-service';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const from = searchParams.get('from') || 'DEL';
    const to = searchParams.get('to') || 'BOM';
    const date = searchParams.get('date') || new Date().toLocaleDateString('en-CA');
    const cabin = searchParams.get('cabin') || 'economy';
    const passengers = parseInt(searchParams.get('passengers') || '1');
    const returnDate = searchParams.get('returnDate') || undefined;

    const flights = await fetchFlights(from, to, date, passengers, cabin, returnDate);

    return NextResponse.json(flights);
}
