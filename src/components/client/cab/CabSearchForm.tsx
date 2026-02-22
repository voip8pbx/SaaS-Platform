"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/client/utils";
import { useRouter } from "next/navigation";

interface CabSearchFormProps {
    transparent?: boolean;
}

export function CabSearchForm({ transparent }: CabSearchFormProps) {
    const router = useRouter();

    // Autocomplete State
    const [fromQuery, setFromQuery] = useState("");
    const [toQuery, setToQuery] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [activeField, setActiveField] = useState<"from" | "to" | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            const query = activeField === 'from' ? fromQuery : activeField === 'to' ? toQuery : '';

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
    }, [fromQuery, toQuery, activeField]);

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const params = new URLSearchParams();

        const from = fromQuery;
        const to = toQuery;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;

        if (from) params.set("from", from);
        if (to) params.set("to", to);
        if (date) params.set("date", date);
        if (time) params.set("time", time);

        router.push(`/cabs?${params.toString()}`);
    }

    const handleSuggestionClick = (description: string) => {
        if (activeField === 'from') setFromQuery(description);
        if (activeField === 'to') setToQuery(description);
        setShowSuggestions(false);
    };

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
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    {/* From - To */}
                    <div className={cn(
                        "md:col-span-6 grid grid-cols-1 sm:grid-cols-2 rounded-lg overflow-hidden divide-y sm:divide-y-0 sm:divide-x relative",
                        transparent
                            ? "bg-white/10 border border-white/20 divide-white/20"
                            : "bg-white border border-slate-300 divide-slate-300"
                    )}>
                        <div className={cn("p-3 transition-colors cursor-text relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>From</span>
                            <div className="flex items-center">
                                <MapPin className={cn("w-4 h-4 mr-2", transparent ? "text-white/60" : "text-slate-400")} />
                                <input
                                    type="text"
                                    value={fromQuery}
                                    onChange={(e) => setFromQuery(e.target.value)}
                                    onFocus={() => setActiveField('from')}
                                    placeholder="Enter origin"
                                    className={cn("w-full bg-transparent font-bold text-lg outline-none transition-colors", transparent ? "text-white placeholder:text-white/30" : "text-slate-800 placeholder:text-slate-300")}
                                />
                            </div>
                        </div>
                        <div className={cn("p-3 transition-colors cursor-text relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>To</span>
                            <div className="flex items-center">
                                <MapPin className={cn("w-4 h-4 mr-2", transparent ? "text-white/60" : "text-slate-400")} />
                                <input
                                    type="text"
                                    value={toQuery}
                                    onChange={(e) => setToQuery(e.target.value)}
                                    onFocus={() => setActiveField('to')}
                                    placeholder="Enter destination"
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
                                        onClick={() => handleSuggestionClick(item.description)}
                                        className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-50 last:border-0 flex items-center space-x-2 transition-colors"
                                    >
                                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                        <span className="text-sm font-medium text-slate-700 truncate">{item.description}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Date & Time */}
                    <div className={cn(
                        "grid grid-cols-1 sm:grid-cols-2 md:col-span-6 rounded-lg overflow-hidden border divide-y sm:divide-y-0 sm:divide-x",
                        transparent ? "bg-white/10 border-white/20 divide-white/20" : "bg-white border-slate-300 divide-slate-300"
                    )}>
                        <div className={cn("p-3 transition-colors relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Date</span>
                            <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} min={new Date().toISOString().split('T')[0]} className={cn("w-full bg-transparent font-bold text-lg outline-none", transparent ? "text-white [color-scheme:dark]" : "text-slate-800")} />
                        </div>
                        <div className={cn("p-3 transition-colors relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Pickup Time</span>
                            <div className="flex items-center">
                                <Clock className={cn("w-4 h-4 mr-2", transparent ? "text-white/60" : "text-slate-400")} />
                                <input name="time" type="time" defaultValue="10:00" className={cn("w-full bg-transparent font-bold text-lg outline-none", transparent ? "text-white [color-scheme:dark]" : "text-slate-800")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-14 left-0 right-0 flex justify-center">
                    <button type="submit" className="bg-primary text-white font-bold py-3 px-12 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2 uppercase">
                        <Search className="w-5 h-5 mr-1" />
                        <span>Search Cabs</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
