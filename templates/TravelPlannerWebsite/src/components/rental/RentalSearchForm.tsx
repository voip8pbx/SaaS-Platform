"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Clock, Car, Bike } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface RentalSearchFormProps {
    transparent?: boolean;
}

export function RentalSearchForm({ transparent }: RentalSearchFormProps) {
    const router = useRouter();

    // Form inputs state
    const [rentalType, setRentalType] = useState<"car" | "bike">("car");
    const [location, setLocation] = useState("");

    // Autocomplete State
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (location.length > 2) {
                try {
                    const res = await fetch(`/api/places/autocomplete?input=${location}`);
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
    }, [location]);

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const params = new URLSearchParams();

        const loc = location;
        const date = formData.get("date") as string;
        const pickupTime = formData.get("pickupTime") as string;
        const dropoffTime = formData.get("dropoffTime") as string;

        if (loc) params.set("location", loc);
        if (date) params.set("date", date);
        if (pickupTime) params.set("pickupTime", pickupTime);
        if (dropoffTime) params.set("dropoffTime", dropoffTime);
        params.set("type", rentalType);

        router.push(`/CarBikeRental?${params.toString()}`);
    }

    return (
        <div className={cn(
            "rounded-xl p-6 md:p-8 relative z-10",
            transparent
                ? "bg-transparent w-full"
                : "bg-white shadow-xl max-w-5xl mx-auto -mt-32 border border-slate-100"
        )}>
            <div className="flex space-x-6 mb-6">

            </div>

            <form onSubmit={handleSearch} className="relative">
                {/* Vehicle Type Selection */}
                <div className="flex justify-center mb-6">
                    <div className={cn("inline-flex p-1 rounded-lg", transparent ? "bg-white/20" : "bg-slate-100")}>
                        <button
                            type="button"
                            onClick={() => setRentalType("car")}
                            className={cn(
                                "flex items-center space-x-2 px-6 py-2 rounded-md font-bold text-sm transition-all",
                                rentalType === "car"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : (transparent ? "text-white hover:text-white/80" : "text-slate-500 hover:text-slate-700")
                            )}
                        >
                            <Car className="w-4 h-4" />
                            <span>Car</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setRentalType("bike")}
                            className={cn(
                                "flex items-center space-x-2 px-6 py-2 rounded-md font-bold text-sm transition-all",
                                rentalType === "bike"
                                    ? "bg-white text-blue-600 shadow-sm"
                                    : (transparent ? "text-white hover:text-white/80" : "text-slate-500 hover:text-slate-700")
                            )}
                        >
                            <Bike className="w-4 h-4" />
                            <span>Bike</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    {/* Location */}
                    <div className={cn(
                        "md:col-span-5 rounded-lg overflow-hidden relative",
                        transparent
                            ? "bg-white/10 border border-white/20"
                            : "bg-white border border-slate-300"
                    )}>
                        <div className={cn("p-3 transition-colors cursor-text relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Location</span>
                            <div className="flex items-center">
                                <MapPin className={cn("w-4 h-4 mr-2", transparent ? "text-white/60" : "text-slate-400")} />
                                <input
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Enter city or area"
                                    className={cn("w-full bg-transparent font-bold text-lg outline-none transition-colors", transparent ? "text-white placeholder:text-white/30" : "text-slate-800 placeholder:text-slate-300")}
                                />
                            </div>
                        </div>

                        {/* Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-slate-100 z-50 overflow-hidden">
                                {suggestions.map((item: any) => (
                                    <button
                                        key={item.place_id}
                                        type="button"
                                        onClick={() => {
                                            setLocation(item.description);
                                            setShowSuggestions(false);
                                        }}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex items-center space-x-2 transition-colors"
                                    >
                                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span className="text-sm font-medium text-slate-700 truncate">{item.description}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Date & Times */}
                    <div className={cn(
                        "grid grid-cols-1 sm:grid-cols-3 md:col-span-7 rounded-lg overflow-hidden border divide-y sm:divide-y-0 sm:divide-x",
                        transparent ? "bg-white/10 border-white/20 divide-white/20" : "bg-white border-slate-300 divide-slate-300"
                    )}>
                        <div className={cn("p-3 transition-colors relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Date</span>
                            <div className="flex items-center">
                                <Calendar className={cn("w-4 h-4 mr-2", transparent ? "text-white/60" : "text-slate-400")} />
                                <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} min={new Date().toISOString().split('T')[0]} className={cn("w-full bg-transparent font-bold text-base outline-none", transparent ? "text-white [color-scheme:dark]" : "text-slate-800")} />
                            </div>
                        </div>
                        <div className={cn("p-3 transition-colors relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Pickup</span>
                            <div className="flex items-center">
                                <Clock className={cn("w-4 h-4 mr-2", transparent ? "text-white/60" : "text-slate-400")} />
                                <input name="pickupTime" type="time" defaultValue="10:00" className={cn("w-full bg-transparent font-bold text-base outline-none", transparent ? "text-white [color-scheme:dark]" : "text-slate-800")} />
                            </div>
                        </div>
                        <div className={cn("p-3 transition-colors relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Drop-off</span>
                            <div className="flex items-center">
                                <Clock className={cn("w-4 h-4 mr-2", transparent ? "text-white/60" : "text-slate-400")} />
                                <input name="dropoffTime" type="time" defaultValue="18:00" className={cn("w-full bg-transparent font-bold text-base outline-none", transparent ? "text-white [color-scheme:dark]" : "text-slate-800")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-14 left-0 right-0 flex justify-center">
                    <button type="submit" className="bg-primary text-white font-bold py-3 px-12 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2 uppercase">
                        <Search className="w-5 h-5 mr-1" />
                        <span>Find {rentalType === 'car' ? 'Cars' : 'Bikes'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
