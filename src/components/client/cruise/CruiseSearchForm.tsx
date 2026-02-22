"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Ship } from "lucide-react";
import { cn } from "@/lib/client/utils";
import { useRouter } from "next/navigation";

interface CruiseSearchFormProps {
    transparent?: boolean;
}

export function CruiseSearchForm({ transparent }: CruiseSearchFormProps) {
    const router = useRouter();

    const [destination, setDestination] = useState("");

    // Generate next 12 months for selection
    const getMonths = () => {
        const months = [];
        const date = new Date();
        for (let i = 0; i < 12; i++) {
            const d = new Date(date.getFullYear(), date.getMonth() + i, 1);
            months.push({
                value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
                label: d.toLocaleString('default', { month: 'long', year: 'numeric' })
            });
        }
        return months;
    };

    const [month, setMonth] = useState("");
    const monthOptions = getMonths();

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const params = new URLSearchParams();
        if (destination) params.set("destination", destination);
        if (month) params.set("month", month);

        // Assuming there will be a cruise page, or just redirecting to a search page
        router.push(`/cruises?${params.toString()}`);
    }

    return (
        <div className={cn(
            "rounded-xl p-6 md:p-8 relative z-10",
            transparent
                ? "bg-transparent w-full"
                : "bg-white shadow-xl max-w-5xl mx-auto -mt-32 border border-slate-100"
        )}>
            <form onSubmit={handleSearch} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Destination */}
                    <div className={cn(
                        "rounded-lg overflow-hidden relative",
                        transparent
                            ? "bg-white/10 border border-white/20"
                            : "bg-white border border-slate-300"
                    )}>
                        <div className={cn("p-4 transition-colors cursor-text relative group h-full flex flex-col justify-center", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Port Destination</span>
                            <div className="flex items-center">
                                <MapPin className={cn("w-5 h-5 mr-3", transparent ? "text-white/60" : "text-slate-400")} />
                                <input
                                    type="text"
                                    value={destination}
                                    onChange={(e) => setDestination(e.target.value)}
                                    placeholder="Where do you want to go?"
                                    className={cn("w-full bg-transparent font-bold text-lg outline-none transition-colors", transparent ? "text-white placeholder:text-white/30" : "text-slate-800 placeholder:text-slate-300")}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Month Selection */}
                    <div className={cn(
                        "rounded-lg overflow-hidden relative",
                        transparent
                            ? "bg-white/10 border border-white/20"
                            : "bg-white border border-slate-300"
                    )}>
                        <div className={cn("p-4 transition-colors cursor-pointer relative group h-full flex flex-col justify-center", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Month of Travel</span>
                            <div className="flex items-center">
                                <Calendar className={cn("w-5 h-5 mr-3", transparent ? "text-white/60" : "text-slate-400")} />
                                <select
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className={cn(
                                        "w-full bg-transparent font-bold text-lg outline-none appearance-none cursor-pointer",
                                        transparent ? "text-white [&>option]:text-black" : "text-slate-800"
                                    )}
                                >
                                    <option value="" disabled>Select Month</option>
                                    {monthOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <button type="submit" className="bg-primary text-white font-bold py-3 px-12 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2 uppercase">
                        <Search className="w-5 h-5 mr-1" />
                        <span>Find Cruises</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
