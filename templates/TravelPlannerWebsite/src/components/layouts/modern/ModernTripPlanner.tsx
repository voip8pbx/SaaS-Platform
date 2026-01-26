"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plane, MapPin, Calendar, Users, Building, ArrowRight, Train, Car, Clock, Bike, Ship, Home } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function ModernTripPlanner() {
    const router = useRouter();
    const { features } = siteConfig;

    // Flight State
    const [flightFrom, setFlightFrom] = useState("DEL");
    const [flightTo, setFlightTo] = useState("BOM");
    const [flightDate, setFlightDate] = useState(new Date().toISOString().split('T')[0]);
    const [returnDate, setReturnDate] = useState("");
    const [passengers, setPassengers] = useState(1);
    const [tripType, setTripType] = useState("oneWay");

    // Hotel State
    const [hotelLocation, setHotelLocation] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    // Train State
    const [trainFrom, setTrainFrom] = useState("");
    const [trainTo, setTrainTo] = useState("");
    const [trainDate, setTrainDate] = useState("");
    const [trainPassengers, setTrainPassengers] = useState(1);

    // Cab State
    const [cabFrom, setCabFrom] = useState("");
    const [cabTo, setCabTo] = useState("");
    const [cabDate, setCabDate] = useState("");
    const [cabTime, setCabTime] = useState("");

    // Rental State
    const [rentalLocation, setRentalLocation] = useState("");
    const [rentalDate, setRentalDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [dropoffTime, setDropoffTime] = useState("");
    const [rentalType, setRentalType] = useState("car");

    // Cruise State
    // Cruise State
    const [cruiseLocation, setCruiseLocation] = useState("");
    const [cruiseDate, setCruiseDate] = useState("");

    // Villa State
    const [villaLocation, setVillaLocation] = useState("");
    const [villaCheckIn, setVillaCheckIn] = useState("");
    const [villaCheckOut, setVillaCheckOut] = useState("");
    const [villaGuests, setVillaGuests] = useState(1);

    // Autocomplete State
    // Autocomplete State
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeField, setActiveField] = useState<string | null>(null);

    useEffect(() => {
        const timer = setTimeout(async () => {
            const query =
                activeField === 'hotel' ? hotelLocation :
                    activeField === 'trainFrom' ? trainFrom :
                        activeField === 'trainTo' ? trainTo :
                            activeField === 'cabFrom' ? cabFrom :
                                activeField === 'cabTo' ? cabTo :
                                    activeField === 'rental' ? rentalLocation :
                                        activeField === 'cruise' ? cruiseLocation :
                                            activeField === 'villa' ? villaLocation : '';

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
    }, [hotelLocation, trainFrom, trainTo, cabFrom, cabTo, rentalLocation, cruiseLocation, villaLocation, activeField]);

    const handleFlightSearch = () => {
        const params = new URLSearchParams();
        params.set("from", flightFrom);
        params.set("to", flightTo);
        params.set("date", flightDate);
        if (returnDate) params.set("returnDate", returnDate);
        params.set("passengers", passengers.toString());
        params.set("cabin", "economy"); // default to economy for quick search
        router.push(`/flights?${params.toString()}`);
    };

    const handleHotelSearch = () => {
        const params = new URLSearchParams();
        if (hotelLocation) params.set("location", hotelLocation);
        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        params.set("guests", guests.toString());
        router.push(`/hotels?${params.toString()}`);
    };

    const handleTrainSearch = () => {
        const params = new URLSearchParams();
        if (trainFrom) params.set("from", trainFrom);
        if (trainTo) params.set("to", trainTo);
        if (trainDate) params.set("date", trainDate);
        params.set("passengers", trainPassengers.toString());
        router.push(`/Train?${params.toString()}`);
    };

    const handleCabSearch = () => {
        const params = new URLSearchParams();
        if (cabFrom) params.set("from", cabFrom);
        if (cabTo) params.set("to", cabTo);
        if (cabDate) params.set("date", cabDate);
        if (cabTime) params.set("time", cabTime);
        router.push(`/cabs?${params.toString()}`);
    };

    const handleRentalSearch = () => {
        const params = new URLSearchParams();
        if (rentalLocation) params.set("location", rentalLocation);
        if (rentalDate) params.set("date", rentalDate);
        if (pickupTime) params.set("pickupTime", pickupTime);
        if (dropoffTime) params.set("dropoffTime", dropoffTime);
        params.set("type", rentalType);
        router.push(`/CarBikeRental?${params.toString()}`);
    };

    const handleCruiseSearch = () => {
        const params = new URLSearchParams();
        if (cruiseLocation) params.set("location", cruiseLocation);
        if (cruiseDate) params.set("date", cruiseDate);
        router.push(`/cruises?${params.toString()}`);
    };

    const handleVillaSearch = () => {
        const params = new URLSearchParams();
        if (villaLocation) params.set("location", villaLocation);
        if (villaCheckIn) params.set("checkIn", villaCheckIn);
        if (villaCheckOut) params.set("checkOut", villaCheckOut);
        params.set("guests", villaGuests.toString());
        router.push(`/villas?${params.toString()}`);
    };

    return (
        <section className="py-20 bg-slate-50/50 dark:bg-slate-950">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Plan Your Trip</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Seamlessly book flights, hotels, and trains specifically curated for your next adventure.</p>
                </div>
            </div>

            <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 px-4 md:px-8 scrollbar-hide">
                {/* Find Flights Card */}
                {features.flights && (
                    <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-[380px] snap-center bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <Plane className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Find Flights</h3>
                        </div>

                        <div className="space-y-5 flex-grow">
                            {/* Trip Type Toggle */}
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
                                <button
                                    onClick={() => setTripType("oneWay")}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${tripType === "oneWay" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}
                                >
                                    One Way
                                </button>
                                <button
                                    onClick={() => setTripType("roundTrip")}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${tripType === "roundTrip" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}
                                >
                                    Round Trip
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">From</label>
                                    <div className="relative group">
                                        <Plane className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="text"
                                            value={flightFrom}
                                            onChange={(e) => setFlightFrom(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase"
                                            placeholder="From"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">To</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="text"
                                            value={flightTo}
                                            onChange={(e) => setFlightTo(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all uppercase"
                                            placeholder="To"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={`grid gap-4 ${tripType === 'roundTrip' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Departure</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="date"
                                            value={flightDate}
                                            onChange={(e) => setFlightDate(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                                {tripType === 'roundTrip' && (
                                    <div className="space-y-1.5 animate-in fade-in zoom-in-95 duration-200">
                                        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Return</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            <input
                                                type="date"
                                                value={returnDate}
                                                onChange={(e) => setReturnDate(e.target.value)}
                                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Passengers</label>
                                <div className="relative group">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <select
                                        value={passengers}
                                        onChange={(e) => setPassengers(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleFlightSearch}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                            >
                                <span>See all flights</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Book Hotels Card */}
                {features.hotels && (
                    <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-[380px] snap-center bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <Building className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Book Hotels</h3>
                        </div>

                        <div className="space-y-5 flex-grow">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={hotelLocation}
                                        onChange={(e) => setHotelLocation(e.target.value)}
                                        onFocus={() => setActiveField('hotel')}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Where are you going?"
                                    />
                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && activeField === 'hotel' && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.place_id}
                                                    onClick={() => {
                                                        setHotelLocation(suggestion.description);
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Check In</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="date"
                                            value={checkIn}
                                            onChange={(e) => setCheckIn(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Check Out</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="date"
                                            value={checkOut}
                                            onChange={(e) => setCheckOut(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Guests</label>
                                <div className="relative group">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <select
                                        value={guests}
                                        onChange={(e) => setGuests(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleHotelSearch}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                            >
                                <span>See all hotels</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Book Cabs Card */}
                {features.cabs && (
                    <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-[380px] snap-center bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <Car className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Book Cabs</h3>
                        </div>

                        <div className="space-y-5 flex-grow">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Pick Up</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={cabFrom}
                                        onChange={(e) => setCabFrom(e.target.value)}
                                        onFocus={() => setActiveField('cabFrom')}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Pickup Location"
                                    />
                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && activeField === 'cabFrom' && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.place_id}
                                                    onClick={() => {
                                                        setCabFrom(suggestion.description);
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Drop Off</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={cabTo}
                                        onChange={(e) => setCabTo(e.target.value)}
                                        onFocus={() => setActiveField('cabTo')}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Drop Location"
                                    />
                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && activeField === 'cabTo' && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.place_id}
                                                    onClick={() => {
                                                        setCabTo(suggestion.description);
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="date"
                                            value={cabDate}
                                            onChange={(e) => setCabDate(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Time</label>
                                    <div className="relative group">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="time"
                                            value={cabTime}
                                            onChange={(e) => setCabTime(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleCabSearch}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                            >
                                <span>Find Cabs</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Find Trains Card */}
                {features.trains && (
                    <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-[380px] snap-center bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <Train className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Find Trains</h3>
                        </div>

                        <div className="space-y-5 flex-grow">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">From</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={trainFrom}
                                        onChange={(e) => setTrainFrom(e.target.value)}
                                        onFocus={() => setActiveField('trainFrom')}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Origin"
                                    />
                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && activeField === 'trainFrom' && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.place_id}
                                                    onClick={() => {
                                                        setTrainFrom(suggestion.description);
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">To</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={trainTo}
                                        onChange={(e) => setTrainTo(e.target.value)}
                                        onFocus={() => setActiveField('trainTo')}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Destination"
                                    />
                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && activeField === 'trainTo' && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.place_id}
                                                    onClick={() => {
                                                        setTrainTo(suggestion.description);
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Travel Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="date"
                                        value={trainDate}
                                        onChange={(e) => setTrainDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Passengers</label>
                                <div className="relative group">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <select
                                        value={trainPassengers}
                                        onChange={(e) => setTrainPassengers(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleTrainSearch}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                            >
                                <span>Find Trains</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Rent Bike & Car Card */}
                {features.rentals && (
                    <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-[380px] snap-center bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                {rentalType === 'car' ? <Car className="w-6 h-6 text-blue-600" /> : <Bike className="w-6 h-6 text-blue-600" />}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rent {rentalType === 'car' ? 'Car' : 'Bike'}</h3>
                        </div>

                        <div className="space-y-5 flex-grow">
                            {/* Vehicle Type Toggle */}
                            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-fit">
                                <button
                                    onClick={() => setRentalType("car")}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${rentalType === "car" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}
                                >
                                    Car
                                </button>
                                <button
                                    onClick={() => setRentalType("bike")}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${rentalType === "bike" ? "bg-white dark:bg-slate-700 text-blue-600 shadow-sm" : "text-slate-500 dark:text-slate-400 hover:text-slate-700"}`}
                                >
                                    Bike
                                </button>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={rentalLocation}
                                        onChange={(e) => setRentalLocation(e.target.value)}
                                        onFocus={() => setActiveField('rental')}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="City or Area"
                                    />
                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && activeField === 'rental' && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.place_id}
                                                    onClick={() => {
                                                        setRentalLocation(suggestion.description);
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Date</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="date"
                                        value={rentalDate}
                                        onChange={(e) => setRentalDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Pickup Time</label>
                                    <div className="relative group">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="time"
                                            value={pickupTime}
                                            onChange={(e) => setPickupTime(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Drop-off Time</label>
                                    <div className="relative group">
                                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="time"
                                            value={dropoffTime}
                                            onChange={(e) => setDropoffTime(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleRentalSearch}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                            >
                                <span>Find {rentalType === 'car' ? 'Cars' : 'Bikes'}</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Book Cruises Card */}
                {features.cruises && (
                    <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-[380px] snap-center bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <Ship className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Book Cruises</h3>
                        </div>

                        <div className="space-y-5 flex-grow">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Destination</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={cruiseLocation}
                                        onChange={(e) => setCruiseLocation(e.target.value)}
                                        onFocus={() => setActiveField('cruise')}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="Where do you want to go?"
                                    />
                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && activeField === 'cruise' && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.place_id}
                                                    onClick={() => {
                                                        setCruiseLocation(suggestion.description);
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Month</label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="month"
                                        value={cruiseDate}
                                        onChange={(e) => setCruiseDate(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleCruiseSearch}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                            >
                                <span>Find Cruises</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Rent Villas Card */}
                {features.villas && (
                    <div className="min-w-[85vw] md:min-w-[400px] lg:min-w-[380px] snap-center bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col transition-transform hover:-translate-y-1 duration-300">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                                <Home className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rent Villas & Flats</h3>
                        </div>

                        <div className="space-y-5 flex-grow">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        value={villaLocation}
                                        onChange={(e) => setVillaLocation(e.target.value)}
                                        onFocus={() => setActiveField('villa')}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-bold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        placeholder="City or Area"
                                    />
                                    {/* Suggestions Dropdown */}
                                    {showSuggestions && activeField === 'villa' && suggestions.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    key={suggestion.place_id}
                                                    onClick={() => {
                                                        setVillaLocation(suggestion.description);
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                    className="p-3 hover:bg-blue-50 dark:hover:bg-slate-700 cursor-pointer text-sm font-semibold text-slate-700 dark:text-slate-200 border-b border-slate-50 dark:border-slate-700 last:border-0 transition-colors"
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Check In</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="date"
                                            value={villaCheckIn}
                                            onChange={(e) => setVillaCheckIn(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Check Out</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <input
                                            type="date"
                                            value={villaCheckOut}
                                            onChange={(e) => setVillaCheckOut(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Guests</label>
                                <div className="relative group">
                                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                    <select
                                        value={villaGuests}
                                        onChange={(e) => setVillaGuests(Number(e.target.value))}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-3 pl-11 pr-4 font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
                                    >
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={handleVillaSearch}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center space-x-2"
                            >
                                <span>Find Villas</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
