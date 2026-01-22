
const GOOGLE_API_KEY = "AIzaSyAaJ7VzIGk_y8dvrx2b4yya119jQVZJnNs";

async function testHotelFetch(location) {
    console.log(`Testing fetch for location: ${location}`);

    try {
        // Step 1: Geocoding
        console.log("Step 1: Geocoding...");
        const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${GOOGLE_API_KEY}`;
        console.log(`Requesting: ${geoUrl}`);

        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        console.log("Geocoding Response Status:", geoData.status);
        if (geoData.status !== 'OK') {
            console.error("Geocoding Error Message:", geoData.error_message);
            return;
        }

        if (!geoData.results || geoData.results.length === 0) {
            console.warn("No geocoding results found.");
            return;
        }

        const { lat, lng } = geoData.results[0].geometry.location;
        console.log(`Coordinates found: ${lat}, ${lng}`);

        // Step 2: Places API
        console.log("Step 2: Places Search...");
        const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=lodging&key=${GOOGLE_API_KEY}`;
        console.log(`Requesting: ${placesUrl}`);

        const placesRes = await fetch(placesUrl);
        const placesData = await placesRes.json();

        console.log("Places Response Status:", placesData.status);
        if (placesData.status !== 'OK') {
            console.error("Places Error Message:", placesData.error_message);
            return;
        }

        console.log(`Found ${placesData.results?.length} places.`);
        if (placesData.results.length > 0) {
            console.log("First result:", JSON.stringify(placesData.results[0], null, 2));
        }

    } catch (error) {
        console.error("Test failed with error:", error);
    }
}

testHotelFetch("London");
