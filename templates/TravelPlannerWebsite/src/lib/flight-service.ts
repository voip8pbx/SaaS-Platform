import { Flight } from "@/types/flight";

const DUFFEL_API_KEY = process.env.DUFFEL_API_KEY;
const DUFFEL_API_URL = process.env.DUFFEL_API_URL || "https://api.duffel.com/air/offer_requests";

function parseDuration(isoDuration: string) {
    const matches = isoDuration.match(/PT(\d+H)?(\d+M)?/);
    if (!matches) return isoDuration;

    const hours = matches[1] ? matches[1].replace('H', 'h') : '';
    const minutes = matches[2] ? matches[2].replace('M', 'm') : '';

    return `${hours} ${minutes}`.trim();
}

export async function fetchFlights(from: string, to: string, date: string, passengers: number = 1, cabin: string = 'economy', returnDate?: string): Promise<Flight[]> {
    try {
        console.log(`Fetching flights: ${from} -> ${to} on ${date}`);
        const slices = [
            {
                origin: from,
                destination: to,
                departure_date: date
            }
        ];

        if (returnDate) {
            slices.push({
                origin: to,
                destination: from,
                departure_date: returnDate
            });
        }

        const response = await fetch(`${DUFFEL_API_URL}?return_offers=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Duffel-Version': 'v2',
                'Authorization': `Bearer ${DUFFEL_API_KEY}`,
                'Accept-Encoding': 'gzip'
            },
            body: JSON.stringify({
                data: {
                    slices: slices,
                    passengers: Array(passengers).fill({ type: 'adult' }),
                    cabin_class: cabin
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Duffel API Error:", response.status, errorText);
            console.warn("Falling back to MOCK DATA due to API failure.");
            return generateMockFlights(from, to, date, returnDate);
        }

        const data = await response.json();
        const offers = data.data.offers;

        return offers.map((offer: any) => {
            const slice = offer.slices[0];
            const segments = slice.segments;
            const firstSegment = segments[0];
            const lastSegment = segments[segments.length - 1];
            const owner = offer.owner;
            const carrierCode = owner.iata_code || (firstSegment.operating_carrier ? firstSegment.operating_carrier.iata_code : "XX");
            let logoUrl = owner.logo_symbol_url;
            if (!logoUrl && carrierCode && carrierCode !== "XX") {
                logoUrl = `https://assets.duffel.com/img/airlines/for-light-background/${carrierCode}.svg`;
            }

            let returnLeg = undefined;
            if (offer.slices.length > 1) {
                const returnSlice = offer.slices[1];
                const returnSegments = returnSlice.segments;
                const rFirst = returnSegments[0];
                const rLast = returnSegments[returnSegments.length - 1];
                const rCarrierCode = rFirst.operating_carrier ? rFirst.operating_carrier.iata_code : (owner.iata_code || "XX");

                let rLogoUrl = undefined;
                if (rCarrierCode === owner.iata_code && owner.logo_symbol_url) {
                    rLogoUrl = owner.logo_symbol_url;
                } else if (rCarrierCode && rCarrierCode !== "XX") {
                    rLogoUrl = `https://assets.duffel.com/img/airlines/for-light-background/${rCarrierCode}.svg`;
                }

                returnLeg = {
                    airline: owner.name,
                    airlineCode: rCarrierCode,
                    flightNumber: rFirst.operating_carrier_flight_number,
                    from: returnSlice.origin.iata_code,
                    to: returnSlice.destination.iata_code,
                    departureTime: rFirst.departing_at,
                    arrivalTime: rLast.arriving_at,
                    duration: parseDuration(returnSlice.duration),
                    stops: returnSegments.length - 1,
                    airlineLogo: rLogoUrl
                };
            }

            return {
                id: offer.id,
                airline: owner.name,
                airlineCode: carrierCode,
                airlineLogo: logoUrl,
                flightNumber: firstSegment.operating_carrier_flight_number,
                from: slice.origin.iata_code,
                to: slice.destination.iata_code,
                departureTime: firstSegment.departing_at,
                arrivalTime: lastSegment.arriving_at,
                duration: parseDuration(slice.duration),
                price: convertToINR(parseFloat(offer.total_amount), offer.total_currency),
                currency: "INR",
                stops: segments.length - 1,
                seatsAvailable: 9,
                returnLeg: returnLeg
            };
        });
    } catch (error) {
        console.error("Flight Fetch Service Error:", error);
        return generateMockFlights(from, to, date, returnDate);
    }
}

function generateMockFlights(from: string, to: string, date: string, returnDate?: string): Flight[] {
    const airlines = [
        { name: "Indigo", code: "6E" },
        { name: "Air India", code: "AI" },
        { name: "Vistara", code: "UK" },
        { name: "Emirates", code: "EK" }
    ];

    const mocks: Flight[] = [];
    for (let i = 0; i < 5; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const price = 4000 + Math.floor(Math.random() * 8000);

        let returnLeg = undefined;
        if (returnDate) {
            returnLeg = {
                airline: airline.name,
                airlineCode: airline.code,
                flightNumber: `${airline.code}-${100 + i + 1}`,
                from: to,
                to: from,
                departureTime: `${returnDate}T18:00:00`,
                arrivalTime: `${returnDate}T21:00:00`,
                duration: "3h 00m",
                stops: 0,
                airlineLogo: `https://assets.duffel.com/img/airlines/for-light-background/${airline.code}.svg`
            };
        }

        mocks.push({
            id: `mock-${i}`,
            airline: airline.name,
            airlineCode: airline.code,
            airlineLogo: `https://assets.duffel.com/img/airlines/for-light-background/${airline.code}.svg`,
            flightNumber: `${airline.code}-${100 + i}`,
            from: from,
            to: to,
            departureTime: `${date}T10:00:00`,
            arrivalTime: `${date}T13:00:00`,
            duration: "3h 00m",
            price: price, // Already INR
            currency: "INR",
            stops: 0,
            seatsAvailable: Math.floor(Math.random() * 10) + 1,
            returnLeg: returnLeg
        });
    }
    return mocks;
}

function convertToINR(amount: number, currency: string): number {
    const rates: { [key: string]: number } = {
        'GBP': 108,
        'USD': 86,
        'EUR': 92,
        'INR': 1
    };
    const rate = rates[currency] || 86; // Default to USD rate if unknown or assume ~86
    return Math.round(amount * rate);
}
