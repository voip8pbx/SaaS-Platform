"use client";
import { siteConfig } from "@/config/client/siteConfig";
import { cn } from "@/lib/client/utils";
import { Plane, BedDouble, Map, ArrowRight, Train, Car, Bike, Ship, Home } from "lucide-react";
import { ChatBot } from "@/components/client/shared/ChatBot";

interface LayoutProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    showFlights: boolean;
    showHotels: boolean;
    showTrains?: boolean;
    showCabs?: boolean;
    showRentals?: boolean;
    showCruises?: boolean;
    showVillas?: boolean;
    children: React.ReactNode;
}

export function ClassicHero({ activeTab, setActiveTab, showFlights, showHotels, showTrains, showCabs, showRentals, showCruises, showVillas, children }: LayoutProps) {
    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                    style={{ backgroundImage: `url('${siteConfig.heroImage}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
            </div>

            {/* Navbar Placeholder (Visual only, to match mockup feeling if nav is transparent) */}
            <div className="absolute top-0 left-0 w-full p-6 z-20 flex justify-between items-center text-white container mx-auto px-4 lg:hidden">
                {/* This is a visual hint, actual nav is likely global. Keeping it clean. */}
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">

                {/* Hero Typography - Centered & Serif as per mockup */}
                <div className="text-center pt-30 mb-10 md:mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg font-serif">
                        {siteConfig.description || "Your Journey Begins Here"}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                        Discover incredible destinations and seamless travel planning with {siteConfig.name}.
                    </p>
                </div>

                {/* White Label Search Card */}
                <div className="w-full mb-10 mt-20 max-w-6xl mx-auto backdrop-blur-md rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 ring-1 ring-white/20">

                    {/* Tab Navigation - Solid Bar Style */}
                    <div className="flex items-center bg-transparent border-b border-white/10 overflow-hidden rounded-t-2xl">
                        {showFlights && (
                            <button
                                onClick={() => setActiveTab("flights")}
                                className={cn(
                                    "flex-1 py-4 md:py-5 flex items-center justify-center gap-2 text-sm md:text-base font-bold transition-all duration-300 relative overflow-hidden group",
                                    activeTab === "flights"
                                        ? "text-white bg-white/20"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Plane className={cn("w-9 h-9", activeTab === "flights" ? "animate-pulse" : "")} />
                                <span>Flights</span>
                                {activeTab === "flights" && (
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45 transform origin-center" />
                                )}
                            </button>
                        )}

                        {showHotels && (
                            <button
                                onClick={() => setActiveTab("hotels")}
                                className={cn(
                                    "flex-1 py-4 md:py-5 flex items-center justify-center gap-2 text-sm md:text-base font-bold transition-all duration-300 relative overflow-hidden group",
                                    activeTab === "hotels"
                                        ? "text-white bg-white/20"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <BedDouble className={cn("w-5 h-5", activeTab === "hotels" ? "animate-pulse" : "")} />
                                <span>Hotels</span>
                                {activeTab === "hotels" && (
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45 transform origin-center" />
                                )}
                            </button>
                        )}

                        {showTrains && (
                            <button
                                onClick={() => setActiveTab("trains")}
                                className={cn(
                                    "flex-1 py-4 md:py-5 flex items-center justify-center gap-2 text-sm md:text-base font-bold transition-all duration-300 relative overflow-hidden group",
                                    activeTab === "trains"
                                        ? "text-white bg-white/20"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Train className={cn("w-5 h-5", activeTab === "trains" ? "animate-pulse" : "")} />
                                <span>Trains</span>
                                {activeTab === "trains" && (
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45 transform origin-center" />
                                )}
                            </button>
                        )}

                        {showCabs && (
                            <button
                                onClick={() => setActiveTab("cabs")}
                                className={cn(
                                    "flex-1 py-4 md:py-5 flex items-center justify-center gap-2 text-sm md:text-base font-bold transition-all duration-300 relative overflow-hidden group",
                                    activeTab === "cabs"
                                        ? "text-white bg-white/20"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Car className={cn("w-5 h-5", activeTab === "cabs" ? "animate-pulse" : "")} />
                                <span>Cabs</span>
                                {activeTab === "cabs" && (
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45 transform origin-center" />
                                )}
                            </button>
                        )}

                        {showRentals && (
                            <button
                                onClick={() => setActiveTab("rentals")}
                                className={cn(
                                    "flex-1 py-4 md:py-5 flex items-center justify-center gap-2 text-sm md:text-base font-bold transition-all duration-300 relative overflow-hidden group",
                                    activeTab === "rentals"
                                        ? "text-white bg-white/20"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Bike className={cn("w-5 h-5", activeTab === "rentals" ? "animate-pulse" : "")} />
                                <span>Rentals</span>
                                {activeTab === "rentals" && (
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45 transform origin-center" />
                                )}
                            </button>
                        )}

                        {showCruises && (
                            <button
                                onClick={() => setActiveTab("cruises")}
                                className={cn(
                                    "flex-1 py-4 md:py-5 flex items-center justify-center gap-2 text-sm md:text-base font-bold transition-all duration-300 relative overflow-hidden group",
                                    activeTab === "cruises"
                                        ? "text-white bg-white/20"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Ship className={cn("w-5 h-5", activeTab === "cruises" ? "animate-pulse" : "")} />
                                <span>Cruises</span>
                                {activeTab === "cruises" && (
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45 transform origin-center" />
                                )}
                            </button>
                        )}

                        {showVillas && (
                            <button
                                onClick={() => setActiveTab("villas")}
                                className={cn(
                                    "flex-1 py-4 md:py-5 flex items-center justify-center gap-2 text-sm md:text-base font-bold transition-all duration-300 relative overflow-hidden group",
                                    activeTab === "villas"
                                        ? "text-white bg-white/20"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                )}
                            >
                                <Home className={cn("w-5 h-5", activeTab === "villas" ? "animate-pulse" : "")} />
                                <span>Villas</span>
                                {activeTab === "villas" && (
                                    <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-inherit rotate-45 transform origin-center" />
                                )}
                            </button>
                        )}
                    </div>

                    {/* Search Form Container */}
                    <div className="w-full max-w-6xl mx-auto bg-transparent p-4 md:p-6">
                        {children}
                    </div>
                </div>
            </div>
            {/* ChatBot */}
            <ChatBot />
        </section>
    );
}
