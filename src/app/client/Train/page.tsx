"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Train, Calendar, Users, MapPin, ArrowRight, Clock, Search, Filter } from "lucide-react";
import { cn } from "@/lib/client/utils";

// Train Interface
interface Train {
    id: string;
    name: string;
    number: string;
    from: string;
    to: string;
    departure: string;
    arrival: string;
    duration: string;
    price: number;
    type: string;
    availableSeats: number;
    rating: number;
}

function TrainBookingContent() {
    const searchParams = useSearchParams();

    // Initialize state from URL params if available
    const [fromStation, setFromStation] = useState(searchParams.get("from") || "");
    const [toStation, setToStation] = useState(searchParams.get("to") || "");
    const [date, setDate] = useState(searchParams.get("date") || "");
    const [passengers, setPassengers] = useState(Number(searchParams.get("passengers")) || 1);

    const [searchResults, setSearchResults] = useState<Train[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Autocomplete State
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeField, setActiveField] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(async () => {
            const query = activeField === 'from' ? fromStation : activeField === 'to' ? toStation : '';

            if (query.length > 2) {
                try {
                    const res = await fetch(`/api/places/autocomplete?input=${query}`);
                    const data = await res.json();
                    if (data.predictions) {
                        setSuggestions(data.predictions);
                        setShowSuggestions(true);
                    }
                } catch (e) {
                    console.error("Failed to fetch suggestions");
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [fromStation, toStation, activeField]);

    // Initial search effect if params are present
    useEffect(() => {
        if (searchParams.get("from") || searchParams.get("to")) {
            performSearch();
        }
    }, [searchParams]);

    const performSearch = async () => {
        if (!fromStation || !toStation || !date) {
            alert("Please fill in all fields (From, To, and Date) to search for trains.");
            return;
        }

        setIsSearching(true);
        try {
            const params = new URLSearchParams();
            if (fromStation) params.append('from', fromStation);
            if (toStation) params.append('to', toStation);
            if (date) params.append('date', date);

            const res = await fetch(`/api/trains/search?${params.toString()}`);
            const data = await res.json();

            if (data.success) {
                setSearchResults(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch trains", error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        performSearch();
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Hero / Search Section */}
            <div className="bg-blue-600 dark:bg-blue-900 pb-32 pt-20 px-4 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80')" }}
                ></div>
                <div className="container mx-auto relative z-10 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">Find Your Train</h1>
                    <p className="text-blue-100 text-lg max-w-2xl mx-auto">Seamless train bookings across the country. Choose from thousands of routes and travel in comfort.</p>
                </div>
            </div>

            {/* Search Form Card */}
            <div className="container mx-auto px-4 -mt-24 relative z-20">
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 md:p-10 border border-slate-100 dark:border-slate-800">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        <div className="space-y-2 relative">
                            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-500" /> From
                            </label>
                            <input
                                type="text"
                                placeholder="Departure Station"
                                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-4 rounded-xl font-medium outline-none border border-transparent focus:border-blue-500 transition-all placeholder:text-slate-400"
                                value={fromStation}
                                onChange={(e) => setFromStation(e.target.value)}
                                onFocus={() => setActiveField('from')}
                            />
                            {/* Suggestions Dropdown */}
                            {showSuggestions && activeField === 'from' && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                    {suggestions.map((suggestion) => (
                                        <div
                                            key={suggestion.place_id}
                                            onClick={() => {
                                                setFromStation(suggestion.description);
                                                setSuggestions([]);
                                                setShowSuggestions(false);
                                            }}
                                            className="p-3 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-50 dark:border-slate-800 last:border-0 transition-colors"
                                        >
                                            {suggestion.description}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-blue-500" /> To
                            </label>
                            <input
                                type="text"
                                placeholder="Arrival Station"
                                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-4 rounded-xl font-medium outline-none border border-transparent focus:border-blue-500 transition-all placeholder:text-slate-400"
                                value={toStation}
                                onChange={(e) => setToStation(e.target.value)}
                                onFocus={() => setActiveField('to')}
                            />
                            {/* Suggestions Dropdown */}
                            {showSuggestions && activeField === 'to' && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                    {suggestions.map((suggestion) => (
                                        <div
                                            key={suggestion.place_id}
                                            onClick={() => {
                                                setToStation(suggestion.description);
                                                setSuggestions([]);
                                                setShowSuggestions(false);
                                            }}
                                            className="p-3 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-50 dark:border-slate-800 last:border-0 transition-colors"
                                        >
                                            {suggestion.description}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-blue-500" /> Date
                            </label>
                            <input
                                type="date"
                                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-4 rounded-xl font-medium outline-none border border-transparent focus:border-blue-500 transition-all placeholder:text-slate-400 [color-scheme:light] dark:[color-scheme:dark]"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-500" /> Passengers
                            </label>
                            <select
                                className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-4 rounded-xl font-medium outline-none border border-transparent focus:border-blue-500 transition-all"
                                value={passengers}
                                onChange={(e) => setPassengers(Number(e.target.value))}
                            >
                                <option value={1}>1 Passenger</option>
                                <option value={2}>2 Passengers</option>
                                <option value={3}>3 Passengers</option>
                                <option value={4}>4 Passengers</option>
                                <option value={5}>5 Passengers</option>
                                <option value={6}>6+ Passengers</option>
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                type="submit"
                                disabled={isSearching}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isSearching ? (
                                    <span className="animate-pulse">Searching Trains...</span>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" /> Search Trains
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Results Section */}
            <div className="container mx-auto px-4 mt-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <Train className="w-6 h-6 text-blue-600" />
                        Available Trains
                        <span className="text-sm font-normal text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full ml-2">
                            {searchResults.length} Found
                        </span>
                    </h2>
                    <button className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Filter className="w-4 h-4" /> Filter Results
                    </button>
                </div>

                <div className="grid gap-6">
                    {searchResults.length > 0 ? (
                        searchResults.map((train) => (
                            <div key={train.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-800 transition-all group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    {/* Train Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                                    {train.name}
                                                </h3>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-800 w-fit px-2 py-0.5 rounded mt-1">
                                                    #{train.number}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-bold">
                                                ★ {train.rating}
                                            </div>
                                        </div>
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                                {train.type}
                                            </span>
                                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full flex items-center gap-1">
                                                <Users className="w-3 h-3" /> {train.availableSeats} Seats
                                            </span>
                                        </div>
                                    </div>

                                    {/* Route Info */}
                                    <div className="flex-[2] px-4 md:px-8">
                                        <div className="flex items-center justify-between text-slate-900 dark:text-white mb-2">
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">{train.departure}</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{train.from}</div>
                                            </div>
                                            <div className="flex-1 px-4 flex flex-col items-center">
                                                <div className="text-xs text-slate-400 font-medium mb-1">{train.duration}</div>
                                                <div className="w-full h-0.5 bg-slate-200 dark:bg-slate-700 relative flex items-center justify-center">
                                                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 absolute left-0"></div>
                                                    <Clock className="w-4 h-4 text-slate-300 dark:text-slate-600 bg-white dark:bg-slate-900 px-0.5" />
                                                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 absolute right-0"></div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-2xl font-bold">{train.arrival}</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{train.to}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price & Action */}
                                    <div className="flex flex-col items-end justify-center border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                                        <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Starting from</div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white mb-4">₹{train.price}</div>
                                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg text-sm shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                                            Book Now <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
                            <Train className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No Trains Found</h3>
                            <p className="text-slate-500">Try adjusting your search criteria or date.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function TrainBookingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center"><div className="text-xl font-bold text-slate-500">Loading...</div></div>}>
            <TrainBookingContent />
        </Suspense>
    );
}
