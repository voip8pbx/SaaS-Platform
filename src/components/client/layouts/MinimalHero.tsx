"use client";
import { siteConfig } from "@/config/client/siteConfig";
import { cn } from "@/lib/client/utils";
import { ChatBot } from "@/components/client/shared/ChatBot";

interface LayoutProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    showFlights: boolean;
    showHotels: boolean;
    showTrains: boolean;
    showCabs: boolean;
    showRentals: boolean;
    showCruises?: boolean;
    children: React.ReactNode;
}

export function MinimalHero({ activeTab, setActiveTab, showFlights, showHotels, showTrains, showCabs, showRentals, showCruises, children }: LayoutProps) {
    return (
        <section className="pt-32 pb-10 bg-white min-h-[500px]">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Content Left */}
                <div className="order-2 md:order-1">
                    <h1 className="text-5xl font-light text-slate-900 mb-6 tracking-tight">
                        {siteConfig.description}
                    </h1>
                    <div className="flex space-x-6 border-b border-slate-100 mb-8 overflow-x-auto">
                        {showFlights && (
                            <button
                                onClick={() => setActiveTab("flights")}
                                className={cn(
                                    "pb-3 text-sm font-medium transition-all relative whitespace-nowrap",
                                    activeTab === "flights"
                                        ? "text-slate-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-900"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                Book Flights
                            </button>
                        )}
                        {showHotels && (
                            <button
                                onClick={() => setActiveTab("hotels")}
                                className={cn(
                                    "pb-3 text-sm font-medium transition-all relative whitespace-nowrap",
                                    activeTab === "hotels"
                                        ? "text-slate-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-900"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                Find Hotels
                            </button>
                        )}
                        {showTrains && (
                            <button
                                onClick={() => setActiveTab("trains")}
                                className={cn(
                                    "pb-3 text-sm font-medium transition-all relative whitespace-nowrap",
                                    activeTab === "trains"
                                        ? "text-slate-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-900"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                Find Trains
                            </button>
                        )}
                        {showCabs && (
                            <button
                                onClick={() => setActiveTab("cabs")}
                                className={cn(
                                    "pb-3 text-sm font-medium transition-all relative whitespace-nowrap",
                                    activeTab === "cabs"
                                        ? "text-slate-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-900"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                Book Cabs
                            </button>
                        )}
                        {showRentals && (
                            <button
                                onClick={() => setActiveTab("rentals")}
                                className={cn(
                                    "pb-3 text-sm font-medium transition-all relative whitespace-nowrap",
                                    activeTab === "rentals"
                                        ? "text-slate-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-900"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                Rentals
                            </button>
                        )}
                        {showCruises && (
                            <button
                                onClick={() => setActiveTab("cruises")}
                                className={cn(
                                    "pb-3 text-sm font-medium transition-all relative whitespace-nowrap",
                                    activeTab === "cruises"
                                        ? "text-slate-900 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-slate-900"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                Cruises
                            </button>
                        )}
                    </div>

                    <div className="bg-slate-50 p-6 rounded-xl">
                        {children}
                    </div>
                </div>

                {/* Hero Image Right */}
                <div className="order-1 md:order-2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
                    <div
                        className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-1000"
                        style={{ backgroundImage: `url('${siteConfig.heroImage}')` }}
                    ></div>
                </div>
            </div>
            {/* ChatBot */}
            <ChatBot />
        </section>
    );
}
