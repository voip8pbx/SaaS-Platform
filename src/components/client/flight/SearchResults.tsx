"use client";

import { useState, useMemo } from "react";
import { Flight } from "@/types/client/flight";
import { FlightCard } from "@/components/client/flight/FlightCard";
import { cn } from "@/lib/client/utils";
import { SlidersHorizontal, ChevronDown, Check, Clock } from "lucide-react";

interface SearchResultsProps {
    flights: Flight[];
    isClassic: boolean;
}

export function SearchResults({ flights: initialFlights, isClassic }: SearchResultsProps) {
    // Filter States
    const [selectedStops, setSelectedStops] = useState<number[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
    const [departureTime, setDepartureTime] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Derived Data for Filters
    const airlines = useMemo(() => {
        const unique = new Set(initialFlights.map(f => f.airline));
        return Array.from(unique);
    }, [initialFlights]);

    const minPrice = useMemo(() => Math.min(...initialFlights.map(f => f.price), 0), [initialFlights]);
    const maxPrice = useMemo(() => Math.max(...initialFlights.map(f => f.price), 100000), [initialFlights]);

    // Filtering Logic
    const filteredFlights = useMemo(() => {
        return initialFlights.filter(flight => {
            // Stops
            if (selectedStops.length > 0 && !selectedStops.includes(flight.stops)) return false;

            // Price
            if (flight.price < priceRange[0] || flight.price > priceRange[1]) return false;

            // Airlines
            if (selectedAirlines.length > 0 && !selectedAirlines.includes(flight.airline)) return false;

            // Departure Time
            if (departureTime.length > 0) {
                const hour = new Date(flight.departureTime).getHours();
                const isMorning = departureTime.includes('morning') && hour >= 6 && hour < 12;
                const isAfternoon = departureTime.includes('afternoon') && hour >= 12 && hour < 18;
                const isEvening = departureTime.includes('evening') && hour >= 18 && hour < 24;
                const isNight = departureTime.includes('night') && hour >= 0 && hour < 6;

                if (!isMorning && !isAfternoon && !isEvening && !isNight) return false;
            }

            return true;
        });
    }, [initialFlights, selectedStops, priceRange, selectedAirlines, departureTime]);

    const toggleStop = (stop: number) => {
        setSelectedStops(prev => prev.includes(stop) ? prev.filter(s => s !== stop) : [...prev, stop]);
    };

    const toggleAirline = (airline: string) => {
        setSelectedAirlines(prev => prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]);
    };

    const toggleTime = (time: string) => {
        setDepartureTime(prev => prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]);
    };

    return (
        <div className="container mx-auto px-4 mt-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn("lg:hidden w-full px-4 py-3 border rounded-xl font-bold shadow-sm flex items-center justify-between",
                    isClassic ? "bg-white text-black border-gray-200" : "bg-white text-slate-900 border-slate-200"
                )}>
                <span className="flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Filters</span>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isFilterOpen ? "rotate-180" : "")} />
            </button>

            {/* Sidebar Filters */}
            <aside className={cn(
                "lg:block w-full lg:w-1/4 min-w-[280px]",
                isFilterOpen ? "block" : "hidden"
            )}>
                <div className={cn("rounded-2xl p-6 sticky top-24 space-y-8",
                    isClassic ? "bg-white border border-gray-200 shadow-sm" : "bg-white shadow-xl shadow-slate-200/50 border border-slate-100"
                )}>
                    <div>
                        <h3 className={cn("font-bold text-lg mb-4 flex items-center justify-between", isClassic ? "font-serif" : "")}>
                            Filters
                            <span
                                onClick={() => {
                                    setSelectedStops([]);
                                    setPriceRange([minPrice, maxPrice]);
                                    setSelectedAirlines([]);
                                    setDepartureTime([]);
                                }}
                                className="text-xs text-blue-600 cursor-pointer hover:underline font-normal"
                            >
                                Reset All
                            </span>
                        </h3>
                    </div>

                    {/* Stops */}
                    <div>
                        <p className="font-bold text-sm mb-3">Stops</p>
                        <div className="space-y-3">
                            {[0, 1, 2].map((stop) => (
                                <label key={stop} className="flex items-center space-x-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedStops.includes(stop) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                                        {selectedStops.includes(stop) && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedStops.includes(stop)}
                                        onChange={() => toggleStop(stop)}
                                    />
                                    <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">
                                        {stop === 0 ? "Non Stop" : `${stop} Stop${stop > 1 ? 's' : ''}`}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Departure Time */}
                    <div className={cn("pt-6 border-t", isClassic ? "border-gray-100" : "border-slate-100")}>
                        <p className="font-bold text-sm mb-3">Departure Time</p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'morning', label: 'Morning', sub: '6AM - 12PM' },
                                { id: 'afternoon', label: 'Afternoon', sub: '12PM - 6PM' },
                                { id: 'evening', label: 'Evening', sub: '6PM - 12AM' },
                                { id: 'night', label: 'Night', sub: '12AM - 6AM' }
                            ].map((time) => (
                                <div
                                    key={time.id}
                                    onClick={() => toggleTime(time.id)}
                                    className={cn(
                                        "border rounded-xl p-3 cursor-pointer transition-all text-center",
                                        departureTime.includes(time.id)
                                            ? "border-blue-600 bg-blue-50 text-blue-700"
                                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                                    )}
                                >
                                    <div className="text-xs font-bold">{time.label}</div>
                                    <div className="text-[10px] text-slate-400 mt-0.5">{time.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className={cn("pt-6 border-t", isClassic ? "border-gray-100" : "border-slate-100")}>
                        <div className="flex justify-between items-center mb-4">
                            <p className="font-bold text-sm">Price Range</p>
                            <p className="text-xs font-bold text-blue-600">₹{priceRange[1].toLocaleString()}</p>
                        </div>
                        <input
                            type="range"
                            min={minPrice}
                            max={200000} // Cap for better UX
                            step={1000}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    {/* Airlines */}
                    <div className={cn("pt-6 border-t", isClassic ? "border-gray-100" : "border-slate-100")}>
                        <p className="font-bold text-sm mb-3">Airlines</p>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {airlines.map((airline) => (
                                <label key={airline} className="flex items-center space-x-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedAirlines.includes(airline) ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                                        {selectedAirlines.includes(airline) && <Check className="w-3.5 h-3.5 text-white" />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedAirlines.includes(airline)}
                                        onChange={() => toggleAirline(airline)}
                                    />
                                    <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors w-full truncate">
                                        {airline}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Results */}
            <main className="flex-1 w-full min-w-0">
                <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <h2 className={cn("font-bold text-xl", isClassic ? "font-serif" : "")}>
                        {filteredFlights.length} Flights available
                    </h2>

                    {/* Simplified Sort (Mock) */}
                    <select className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20">
                        <option>Recommended</option>
                        <option>Cheapest First</option>
                        <option>Fastest First</option>
                        <option>Earliest Departure</option>
                    </select>
                </div>

                <div className="space-y-4">
                    {filteredFlights.map(flight => (
                        <div key={flight.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <FlightCard flight={flight} />
                        </div>
                    ))}

                    {filteredFlights.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm text-center">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                <Clock className="w-8 h-8 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No flights found</h3>
                            <p className="text-slate-500 max-w-sm">
                                We couldn't find any flights matching your applied filters. Try adjusting them to see more results.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedStops([]);
                                    setPriceRange([minPrice, maxPrice]);
                                    setSelectedAirlines([]);
                                    setDepartureTime([]);
                                }}
                                className="mt-6 text-blue-600 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
