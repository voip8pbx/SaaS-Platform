export const DUFFEL_API_KEY = process.env.DUFFEL_API_KEY || "";
export const DUFFEL_API_URL = "https://api.duffel.com/air/offer_requests";

export interface DuffelOfferRequest {
    data: {
        slices: {
            origin: string;
            destination: string;
            departure_date: string;
        }[];
        passengers: { type: string }[];
        cabin_class: string;
    };
}

export const searchFlights = async (origin: string, destination: string, date: string, passengers: number, cabin: string) => {
    try {
        const payload: DuffelOfferRequest = {
            data: {
                slices: [
                    {
                        origin: origin,
                        destination: destination,
                        departure_date: date,
                    },
                ],
                passengers: Array(passengers).fill({ type: 'adult' }),
                cabin_class: cabin,
            },
        };

        const response = await fetch(`${DUFFEL_API_URL}?return_offers=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Duffel-Version': 'beta',
                'Authorization': `Bearer ${DUFFEL_API_KEY}`,
                'Accept-Encoding': 'gzip'
            },
            body: JSON.stringify(payload),
        });

        const json = await response.json();
        console.log("Duffel Response:", JSON.stringify(json, null, 2));
        return json;
    } catch (error) {
        console.error("Duffel API Error:", error);
        throw error;
    }
};
