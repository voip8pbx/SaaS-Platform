"use client";

import { useState } from "react";
import { Plane, Calendar, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FlightSearchFormProps {
    transparent?: boolean;
}

export function FlightSearchForm({ transparent }: FlightSearchFormProps) {
    const router = useRouter();
    const [tripType, setTripType] = useState("oneWay");
    const [passengers, setPassengers] = useState(1);
    const [flightClass, setFlightClass] = useState("economy");
    const [showDropdown, setShowDropdown] = useState(false);

    const classes = [
        { label: "Economy", value: "economy" },
        { label: "Premium Economy", value: "premium_economy" },
        { label: "Business", value: "business" },
        { label: "First", value: "first" },
    ];

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const params = new URLSearchParams();
        const from = formData.get("from") as string;
        const to = formData.get("to") as string;
        const date = formData.get("date") as string;

        if (from) params.set("from", from);
        if (to) params.set("to", to);
        if (date) params.set("date", date);
        if (tripType === "roundTrip") {
            const returnDate = formData.get("returnDate") as string;
            if (returnDate) params.set("returnDate", returnDate);
        }

        params.set("cabin", flightClass);
        params.set("passengers", passengers.toString());

        router.push(`/flights?${params.toString()}`);
    }

    return (
        <div className={cn(
            "rounded-xl p-6 md:p-8 relative z-10",
            transparent
                ? "bg-transparent w-full"
                : "bg-white shadow-xl max-w-5xl mx-auto -mt-32 border border-slate-100"
        )}>
            <div className="flex space-x-6 mb-6">
                <label className={cn(
                    "flex items-center space-x-2 cursor-pointer px-4 py-1 rounded-full transition-colors",
                    transparent ? "bg-white/20 hover:bg-white/30 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                )}>
                    <input
                        type="radio"
                        name="tripType"
                        value="oneWay"
                        checked={tripType === "oneWay"}
                        onChange={() => setTripType("oneWay")}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary accent-primary"
                    />
                    <span className="text-sm font-bold">One Way</span>
                </label>
                <label className={cn(
                    "flex items-center space-x-2 cursor-pointer px-4 py-1 rounded-full transition-colors",
                    transparent ? "bg-white/20 hover:bg-white/30 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                )}>
                    <input
                        type="radio"
                        name="tripType"
                        value="roundTrip"
                        checked={tripType === "roundTrip"}
                        onChange={() => setTripType("roundTrip")}
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary accent-primary"
                    />
                    <span className="text-sm font-bold">Round Trip</span>
                </label>
            </div>

            <form onSubmit={handleSearch} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    {/* From - To */}
                    <div className={cn(
                        "md:col-span-5 grid grid-cols-1 sm:grid-cols-2 rounded-lg overflow-hidden divide-y sm:divide-y-0 sm:divide-x",
                        transparent
                            ? "bg-white/10 border border-white/20 divide-white/20"
                            : "bg-white border border-slate-300 divide-slate-300"
                    )}>
                        <div className={cn("p-3 transition-colors cursor-text relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>From</span>
                            <input name="from" type="text" defaultValue="DEL" className={cn("w-full bg-transparent font-bold text-2xl outline-none transition-colors uppercase", transparent ? "text-white placeholder:text-white/50 group-hover:text-white" : "text-slate-800 placeholder:text-slate-300 group-hover:text-primary")} />
                            <p className={cn("text-xs truncate", transparent ? "text-white/60 group-hover:text-white/80" : "text-slate-500 group-hover:text-slate-700")}>City or Airport</p>
                        </div>
                        <div className={cn("p-3 transition-colors cursor-text relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>To</span>
                            <input name="to" type="text" defaultValue="BOM" className={cn("w-full bg-transparent font-bold text-2xl outline-none transition-colors uppercase", transparent ? "text-white placeholder:text-white/50 group-hover:text-white" : "text-slate-800 placeholder:text-slate-300 group-hover:text-primary")} />
                            <p className={cn("text-xs truncate", transparent ? "text-white/60 group-hover:text-white/80" : "text-slate-500 group-hover:text-slate-700")}>City or Airport</p>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className={cn(
                        "grid rounded-lg overflow-hidden border",
                        tripType === "roundTrip" ? "grid-cols-2 md:col-span-4" : "grid-cols-1 md:col-span-3",
                        transparent ? "bg-white/10 border-white/20" : "bg-white border-slate-300"
                    )}>
                        <div className={cn("p-3 border-r transition-colors relative group", transparent ? "border-white/20 hover:bg-white/5" : "border-slate-300 hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Departure</span>
                            <input name="date" type="date" defaultValue={new Date().toLocaleDateString('en-CA')} min={new Date().toLocaleDateString('en-CA')} className={cn("w-full bg-transparent font-bold text-lg outline-none", transparent ? "text-white [color-scheme:dark]" : "text-slate-800")} />
                        </div>
                        {tripType === "roundTrip" ? (
                            <div className={cn("p-3 transition-colors relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                                <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Return</span>
                                <input name="returnDate" type="date" min={new Date().toLocaleDateString('en-CA')} className={cn("w-full bg-transparent font-bold text-lg outline-none", transparent ? "text-white [color-scheme:dark]" : "text-slate-800")} />
                            </div>
                        ) : null}
                    </div>

                    {/* Travelers & Class */}
                    <div className={cn(
                        "relative rounded-lg p-3 transition-colors cursor-pointer group border",
                        tripType === "roundTrip" ? "md:col-span-3" : "md:col-span-4",
                        transparent ? "bg-white/10 border-white/20 hover:bg-white/5" : "bg-white border-slate-300 hover:bg-slate-50"
                    )}>
                        <div onClick={() => setShowDropdown(!showDropdown)} className="h-full">
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Travellers & Class</span>
                            <div className="flex items-baseline space-x-1">
                                <span className={cn("text-2xl font-bold transition-colors", transparent ? "text-white group-hover:text-white" : "text-slate-800 group-hover:text-primary")}>{passengers}</span>
                                <span className={cn("text-sm font-medium", transparent ? "text-white/80" : "text-slate-600")}>Traveller(s)</span>
                            </div>
                            <p className={cn("text-xs truncate", transparent ? "text-white/60 group-hover:text-white/80" : "text-slate-500 group-hover:text-slate-700")}>
                                {classes.find(c => c.value === flightClass)?.label}
                            </p>
                        </div>

                        {/* Dropdown */}
                        {showDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                                {/* Triangle arrow */}
                                <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Cabin Class</label>
                                        <div className="space-y-2">
                                            {classes.map((c) => (
                                                <label key={c.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                                                    <input
                                                        type="radio"
                                                        name="class"
                                                        value={c.value}
                                                        checked={flightClass === c.value}
                                                        onChange={() => setFlightClass(c.value)}
                                                        className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                                                    />
                                                    <span className="text-sm font-medium text-slate-700">{c.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Travellers</label>
                                        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-2 border border-slate-200">
                                            <button
                                                type="button"
                                                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-primary disabled:opacity-50 font-bold text-lg"
                                                disabled={passengers <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="font-bold text-slate-800">{passengers}</span>
                                            <button
                                                type="button"
                                                onClick={() => setPassengers(Math.min(9, passengers + 1))}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-primary font-bold text-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowDropdown(false)}
                                        className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Backdrop to close dropdown */}
                        {showDropdown && (
                            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
                        )}
                    </div>
                </div>

                <div className="absolute -bottom-14 left-0 right-0 flex justify-center">
                    <button type="submit" className="bg-primary text-white font-bold py-3 px-12 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2 uppercase">
                        <span>Search Flights</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
