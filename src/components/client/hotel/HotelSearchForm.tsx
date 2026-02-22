"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Users, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/client/utils";

interface HotelSearchFormProps {
    transparent?: boolean;
}

export function HotelSearchForm({ transparent }: HotelSearchFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
    const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
    const [priceRange, setPriceRange] = useState(parseInt(searchParams.get("maxPrice") || "50000"));
    const [guests, setGuests] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (location.length > 2) {
                fetch(`/api/places/autocomplete?input=${encodeURIComponent(location)}`)
                    .then(res => res.json())
                    .then(data => {
                        setSuggestions(data.predictions || []);
                        setShowSuggestions(true);
                    })
                    .catch(err => console.error(err));
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [location]);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        if (priceRange) params.set("maxPrice", priceRange.toString());
        if (guests) params.set("guests", guests.toString());

        router.push(`/hotels?${params.toString()}`);
    }

    return (
        <div className={cn(
            "w-full mx-auto relative z-20",
            transparent ? "" : "max-w-5xl -mt-32"
        )}>
            <div className={cn(
                "rounded-2xl p-6 md:p-8",
                transparent
                    ? "bg-transparent backdrop-blur-none border-none shadow-none"
                    : "bg-white/95 backdrop-blur-md shadow-2xl border border-white/20"
            )}>
                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Location */}
                        <div className="md:col-span-4 relative group">
                            <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1 ml-1", transparent ? "text-white/70" : "text-slate-500")}>Where to?</label>
                            <div className="relative">
                                <div className={cn("absolute left-4 top-1/2 -translate-y-1/2 transition-colors", transparent ? "text-white/70 group-hover:text-white" : "text-slate-400 group-hover:text-primary")}>
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter city, region or hotel..."
                                    className={cn(
                                        "w-full rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 transition-all font-semibold",
                                        transparent
                                            ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:ring-white/30 focus:border-white"
                                            : "bg-slate-50 border border-slate-200 text-black focus:ring-primary/20 focus:border-primary"
                                    )}
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    onFocus={() => {
                                        if (suggestions.length > 0) setShowSuggestions(true);
                                    }}
                                    onBlur={() => {
                                        // Delay hiding to allow click event to register
                                        setTimeout(() => setShowSuggestions(false), 200);
                                    }}
                                    required
                                    autoComplete="off"
                                />
                                {showSuggestions && suggestions.length > 0 && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 max-h-60 overflow-y-auto z-50">
                                        {suggestions.map((prediction: any) => (
                                            <div
                                                key={prediction.place_id}
                                                onClick={() => {
                                                    setLocation(prediction.description);
                                                    setSuggestions([]);
                                                    setShowSuggestions(false);
                                                }}
                                                className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex items-center space-x-3 transition-colors"
                                            >
                                                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                                                <span className="text-sm text-slate-700 font-medium truncate">{prediction.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Check-in */}
                        <div className="md:col-span-3 relative group">
                            <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1 ml-1", transparent ? "text-white/70" : "text-slate-500")}>Check-in</label>
                            <div className="relative">
                                <div className={cn("absolute left-4 top-1/2 -translate-y-1/2 transition-colors", transparent ? "text-white/70 group-hover:text-white" : "text-slate-400 group-hover:text-primary")}>
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <input
                                    type="date"
                                    min={new Date().toLocaleDateString('en-CA')}
                                    className={cn(
                                        "w-full rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 transition-all font-medium",
                                        transparent
                                            ? "bg-white/10 border border-white/20 text-white [color-scheme:dark] focus:ring-white/30 focus:border-white"
                                            : "bg-slate-50 border border-slate-200 text-black focus:ring-primary/20 focus:border-primary"
                                    )}
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Check-out */}
                        <div className="md:col-span-3 relative group">
                            <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1 ml-1", transparent ? "text-white/70" : "text-slate-500")}>Check-out</label>
                            <div className="relative">
                                <div className={cn("absolute left-4 top-1/2 -translate-y-1/2 transition-colors", transparent ? "text-white/70 group-hover:text-white" : "text-slate-400 group-hover:text-primary")}>
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <input
                                    type="date"
                                    min={checkIn || new Date().toLocaleDateString('en-CA')}
                                    className={cn(
                                        "w-full rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 transition-all font-medium",
                                        transparent
                                            ? "bg-white/10 border border-white/20 text-white [color-scheme:dark] focus:ring-white/30 focus:border-white"
                                            : "bg-slate-50 border border-slate-200 text-black focus:ring-primary/20 focus:border-primary"
                                    )}
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Guests/Search Button */}
                        <div className="md:col-span-2 flex items-end">
                            <button type="submit" className={cn(
                                "w-full h-[58px] rounded-xl font-bold text-lg transition-transform active:scale-95 shadow-lg flex items-center justify-center space-x-2",
                                transparent
                                    ? "bg-white text-primary hover:bg-white/90 shadow-white/10"
                                    : "bg-primary text-white hover:bg-primary/90 shadow-primary/25"
                            )}>
                                <Search className="w-5 h-5" />
                                <span>Search</span>
                            </button>
                        </div>
                    </div>

                    {/* Filters & Price Range */}
                    <div className={cn("flex flex-col md:flex-row md:items-center justify-between pt-4 border-t gap-4", transparent ? "border-white/20" : "border-slate-100")}>
                        <div className="flex items-center space-x-6">
                            <button
                                type="button"
                                onClick={() => setShowFilters(!showFilters)}
                                className={cn("flex items-center space-x-2 text-sm font-semibold transition-colors",
                                    showFilters
                                        ? "text-primary"
                                        : transparent ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-slate-900"
                                )}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                <span>Advanced Filters</span>
                            </button>

                            <div className="flex items-center space-x-2">
                                <Users className={cn("w-4 h-4", transparent ? "text-white/60" : "text-slate-400")} />
                                <select
                                    className={cn("bg-transparent text-sm font-semibold outline-none cursor-pointer", transparent ? "text-white [&>option]:text-black" : "text-slate-700")}
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value))}
                                >
                                    {[1, 2, 3, 4, 5, 6].map(num => (
                                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 flex-1 md:justify-end">
                            <span className={cn("text-sm font-semibold whitespace-nowrap", transparent ? "text-white/80" : "text-slate-600")}>Max Price: ₹ {priceRange.toLocaleString()}</span>
                            <div className="w-full md:w-48">
                                <input
                                    type="range"
                                    min="1000"
                                    max="100000"
                                    step="1000"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className={cn("w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-primary", transparent ? "bg-white/20" : "bg-slate-200")}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
