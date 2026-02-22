
import { RentalData } from '../types';

const GOOGLE_API_KEY = "AIzaSyAaJ7VzIGk_y8dvrx2b4yya119jQVZJnNs";

export interface RentalSearchOptions {
    location: string;
    type: 'car' | 'bike';
    date?: string;
}

export async function fetchRentals(options: RentalSearchOptions): Promise<RentalData[]> {
    const { location, type } = options;
    if (!location) return [];

    try {
        // Step 1: Geocode
        const geoRes = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_API_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            console.warn("Geocoding found no results for:", location);
            return [];
        }

        const { lat, lng } = geoData.results[0].geometry.location;

        // Step 2: Places Search
        // Query for 'car_rental' or 'bicycle_store'/'bicycle_rental'
        // Google Places type 'car_rental' exists. For bikes maybe 'bicycle_store'?

        const typeQuery = type === 'car' ? 'car_rental' : 'bicycle_store';

        const placesRes = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=${typeQuery}&key=${GOOGLE_API_KEY}`
        );
        const placesData = await placesRes.json();

        if (!placesData.results) return [];

        // Step 3: Transform
        const rentals: RentalData[] = placesData.results.map((place: any) => {
            const photoRef = place.photos?.[0]?.photo_reference;
            const imageUrl = photoRef
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`
                : (type === 'car'
                    ? 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop'
                    : 'https://images.unsplash.com/photo-1558981806-ec527fa84c3d?q=80&w=2070&auto=format&fit=crop');

            // Mocking specific vehicle data since Places API gives us AGENCIES, not specific vehicles
            // We'll present it as an Agency offering starting at $X

            return {
                id: place.place_id,
                name: place.name,
                type: type,
                image: imageUrl,
                price: Math.floor(Math.random() * 2000) + 500, // Random styling price
                rating: place.rating || 4.0,
                features: ['Insurance Included', 'Unlimited Miles'],
                agency: place.name,
                address: place.vicinity
            };
        });

        return rentals;

    } catch (error) {
        console.error("Error fetching rentals", error);
        return [];
    }
}
