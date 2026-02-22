
import { HotelData } from "@/components/client/hotel/HotelCard";

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export async function fetchVillas(location: string, checkIn?: string, checkOut?: string) {
    if (!location) return [];

    try {
        // Step 1: Geocoding to get Lat/Lng
        const geoRes = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_API_KEY}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            console.warn("Geocoding found no results for:", location);
            return [];
        }

        const { lat, lng } = geoData.results[0].geometry.location;

        // Step 2: Places API (Nearby Search) for 'lodging' with keyword 'villa'
        // Radius: 5000 meters (5km)
        const placesRes = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=lodging&keyword=villa&key=${GOOGLE_API_KEY}`
        );
        const placesData = await placesRes.json();

        if (!placesData.results) {
            return [];
        }

        // Helper to map types to amenities
        const mapTypesToAmenities = (types: string[]) => {
            const amenities = [];
            if (types.includes("spa")) amenities.push("Spa");
            if (types.includes("gym")) amenities.push("Gym");
            if (types.includes("pool") || types.includes("swimming_pool")) amenities.push("Pool");
            if (types.includes("restaurant") || types.includes("food")) amenities.push("Restaurant");
            if (types.includes("bar")) amenities.push("Bar");
            if (types.includes("parking")) amenities.push("Parking");

            // Add some defaults if specific ones aren't found for better UI
            if (amenities.length < 2) amenities.push("Kitchen", "Pool", "Garden");

            return Array.from(new Set(amenities)); // Unique only
        };

        // Transform results to our HotelData format (reusing HotelData for now)
        const villas: HotelData[] = placesData.results.map((place: any) => {
            const photoRef = place.photos?.[0]?.photo_reference;
            const imageUrl = photoRef
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`
                : "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000"; // Villa placeholder

            // Approximate price
            let basePrice = 5000;
            if (place.price_level) {
                basePrice = place.price_level * 5000;
            } else {
                basePrice = (place.rating || 4.2) * 2000;
            }
            // Add some variance
            const price = Math.round(basePrice + Math.random() * 2000);

            return {
                id: place.place_id,
                name: place.name,
                address: place.vicinity || place.formatted_address,
                price: price,
                rating: place.rating || 4.5,
                amenities: mapTypesToAmenities(place.types || []),
                image: imageUrl,
                user_ratings_total: place.user_ratings_total
            };
        });

        return villas;

    } catch (error) {
        console.error("Error fetching villas:", error);
        return [];
    }
}
