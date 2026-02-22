
import { HotelData } from '../types';

// Hardcoded for now as per previous context or use ConfigContext if available globally without hooks
// In a real app, use react-native-config or similar
const GOOGLE_API_KEY = "AIzaSyAaJ7VzIGk_y8dvrx2b4yya119jQVZJnNs";

export async function fetchHotels(location: string, checkIn?: string, checkOut?: string): Promise<HotelData[]> {
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

        // Step 2: Places API (Nearby Search) for 'lodging'
        // Radius: 5000 meters (5km)
        const placesRes = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=lodging&key=${GOOGLE_API_KEY}`
        );
        const placesData = await placesRes.json();

        if (!placesData.results) {
            return [];
        }

        // Helper to map types to amenities
        const mapTypesToAmenities = (types: string[]) => {
            const amenities: string[] = [];
            if (types.includes("spa")) amenities.push("Spa");
            if (types.includes("gym")) amenities.push("Gym");
            if (types.includes("pool") || types.includes("swimming_pool")) amenities.push("Pool");
            if (types.includes("restaurant") || types.includes("food")) amenities.push("Restaurant");
            if (types.includes("bar")) amenities.push("Bar");
            if (types.includes("parking")) amenities.push("Parking");

            // Add some defaults if specific ones aren't found for better UI
            if (amenities.length < 2) amenities.push("Free Wifi", "Air Conditioning");

            return Array.from(new Set(amenities)); // Unique only
        };

        // Transform results to our HotelData format
        const hotels: HotelData[] = placesData.results.map((place: any) => {
            const photoRef = place.photos?.[0]?.photo_reference;
            const imageUrl = photoRef
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`
                : "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000";

            // Approximate price based on price_level (0-4) or random
            // Level 1: ~2000-4000 INR
            // Level 2: ~4000-8000 INR
            // Level 3: ~8000-15000 INR
            // Level 4: ~15000+ INR
            let basePrice = 3000;
            if (place.price_level) {
                basePrice = place.price_level * 3500;
            } else {
                // Randomize based on rating
                basePrice = (place.rating || 3.5) * 1500;
            }
            // Add some variance
            const price = Math.round(basePrice + Math.random() * 1000);

            return {
                id: place.place_id,
                name: place.name,
                address: place.vicinity || place.formatted_address,
                price: price,
                rating: place.rating || 4.2,
                amenities: mapTypesToAmenities(place.types || []),
                image: imageUrl,
                user_ratings_total: place.user_ratings_total
            };
        });

        return hotels;

    } catch (error) {
        console.error("Error fetching hotels:", error);
        return [];
    }
}
