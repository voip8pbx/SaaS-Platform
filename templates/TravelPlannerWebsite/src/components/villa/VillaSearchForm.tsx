"use client";

import { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Users, Home } from "lucide-react"; // Changed generic icon to Home if used, or just generic
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface VillaSearchFormProps {
    transparent?: boolean;
}

export function VillaSearchForm({ transparent }: VillaSearchFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [location, setLocation] = useState(searchParams.get("location") || "");
    const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
    const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");
    const [guests, setGuests] = useState(1);
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
        if (guests) params.set("guests", guests.toString());

        router.push(`/villas?${params.toString()}`);
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
                        <div className="md:col-span-3 relative group">
                            {/* Location */}
                            <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1 ml-1", transparent ? "text-white/70" : "text-slate-500")}>Location</label>
                            <div className="relative">
                                <div className={cn("absolute left-4 top-1/2 -translate-y-1/2 transition-colors", transparent ? "text-white/70 group-hover:text-white" : "text-slate-400 group-hover:text-primary")}>
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="City, Area or Region"
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

                        <div className="md:col-span-3 relative group">
                            {/* Check In */}
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

                        <div className="md:col-span-3 relative group">
                            {/* Check Out */}
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

                        <div className="md:col-span-3 flex gap-2">
                            {/* Guests and Button split */}
                            <div className="w-1/2 relative group">
                                <label className={cn("block text-xs font-bold uppercase tracking-wider mb-1 ml-1", transparent ? "text-white/70" : "text-slate-500")}>Guests</label>
                                <div className="relative">
                                    <div className={cn("absolute left-4 top-1/2 -translate-y-1/2 transition-colors", transparent ? "text-white/70 group-hover:text-white" : "text-slate-400 group-hover:text-primary")}>
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <select
                                        className={cn(
                                            "w-full rounded-xl py-4 pl-12 pr-4 outline-none focus:ring-2 transition-all font-semibold appearance-none cursor-pointer",
                                            transparent
                                                ? "bg-white/10 border border-white/20 text-white [&>option]:text-black focus:ring-white/30 focus:border-white"
                                                : "bg-slate-50 border border-slate-200 text-black focus:ring-primary/20 focus:border-primary"
                                        )}
                                        value={guests}
                                        onChange={(e) => setGuests(parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="w-1/2 flex items-end">
                                <button type="submit" className={cn(
                                    "w-full h-[58px] rounded-xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg transition-transform active:scale-95 flex items-center justify-center",
                                    transparent ? "bg-white text-primary hover:bg-white/90" : "bg-primary text-white"
                                )}>
                                    <Search className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
