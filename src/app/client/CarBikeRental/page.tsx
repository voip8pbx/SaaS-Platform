"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Bike, Car, MapPin, Star, Calendar, Clock, Loader2, ArrowRight } from "lucide-react";

// Interface for Rental Place
interface RentalPlace {
    place_id: string;
    name: string;
    formatted_address: string;
    formatted_phone_number?: string;
    rating: number;
    user_ratings_total: number;
    geometry: {
        location: {
            lat: number;
            lng: number;
        }
    };
    icon?: string;
    photos?: {
        photo_reference: string;
    }[];
    opening_hours?: {
        open_now: boolean;
    };
}

function RentalSearchContent() {
    const searchParams = useSearchParams();
    const location = searchParams.get("location") || "";
    const date = searchParams.get("date") || "";
    const pickupTime = searchParams.get("pickupTime") || "";
    const dropoffTime = searchParams.get("dropoffTime") || "";
    const type = searchParams.get("type") || "car";

    const [loading, setLoading] = useState(true);
    const [rentals, setRentals] = useState<RentalPlace[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRentals = async () => {
            setLoading(true);
            setError("");

            if (!location) {
                setLoading(false);
                return; // Optionally handle empty location
            }

            try {
                const queryParams = new URLSearchParams({
                    location,
                    type,
                });

                const res = await fetch(`/api/rentals/search?${queryParams.toString()}`);
                const data = await res.json();

                if (res.ok) {
                    setRentals(data.results || []);
                } else {
                    setError("Failed to fetch rentals. Please try again.");
                }
            } catch (err) {
                console.error("Error fetching rentals:", err);
                setError("An error occurred while finding rentals.");
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, [location, type]);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-blue-600 text-white pt-32 pb-12 px-4">
                <div className="container mx-auto max-w-7xl">
                    <h1 className="text-4xl font-bold mb-4">
                        {type === 'car' ? 'Car' : 'Bike'} Rentals in {location}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-blue-100 items-center text-sm font-medium">
                        {date && (
                            <div className="flex items-center bg-blue-500/30 px-3 py-1.5 rounded-full">
                                <Calendar className="w-4 h-4 mr-2" />
                                {date}
                            </div>
                        )}
                        {(pickupTime || dropoffTime) && (
                            <div className="flex items-center bg-blue-500/30 px-3 py-1.5 rounded-full">
                                <Clock className="w-4 h-4 mr-2" />
                                {pickupTime} {dropoffTime ? `- ${dropoffTime}` : ''}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-12">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                        <p className="text-slate-500">Finding the best {type} rentals for you...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">{error}</div>
                ) : rentals.length === 0 ? (
                    <div className="text-center py-20 text-slate-500">
                        No rentals found in {location}. Please try a different location.
                    </div>
                ) : (
                    <div className="flex flex-col space-y-6">
                        {rentals.map((place) => (
                            <div key={place.place_id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group flex flex-col md:flex-row">
                                {/* Image Section */}
                                <div className="h-48 md:h-auto md:w-72 bg-slate-100 relative overflow-hidden flex-shrink-0">
                                    {place.photos && place.photos.length > 0 ? (
                                        <img
                                            src={`/api/places/photo?ref=${place.photos[0].photo_reference}&width=400`}
                                            alt={place.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-slate-50">
                                            {type === 'car' ? <Car className="w-12 h-12 text-slate-300" /> : <Bike className="w-12 h-12 text-slate-300" />}
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center space-x-1 shadow-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-bold text-slate-700">{place.rating || 'N/A'}</span>
                                        {place.user_ratings_total > 0 && <span className="text-xs text-slate-400">({place.user_ratings_total})</span>}
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <div className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg shadow-sm ${place.opening_hours?.open_now ? 'bg-green-100 text-green-700' : 'bg-slate-100/90 text-slate-500'}`}>
                                            {place.opening_hours?.open_now ? 'Open Now' : 'Check Hours'}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight">{place.name}</h3>

                                            <div className="flex items-start space-x-3 text-slate-500 mb-6">
                                                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-blue-500" />
                                                <p className="text-base md:text-lg font-medium leading-relaxed">{place.formatted_address}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-4 items-center">
                                                {place.rating > 0 && (
                                                    <div className="flex items-center space-x-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                                                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                                        <span className="text-base font-bold text-slate-800">{place.rating}</span>
                                                        <span className="text-sm text-slate-500 font-medium">({place.user_ratings_total} reviews)</span>
                                                    </div>
                                                )}

                                                {place.formatted_phone_number && (
                                                    <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                                                        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Contact</span>
                                                        <span className="text-base font-bold text-slate-700">{place.formatted_phone_number}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-end mt-6">
                                        <a
                                            href={`https://www.google.com/maps/place/?q=place_id:${place.place_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95"
                                        >
                                            <span className="text-lg">View Details</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function CarBikeRentalPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center"><Loader2 className="w-8 h-8 text-slate-400 animate-spin" /></div>}>
            <RentalSearchContent />
        </Suspense>
    );
}
