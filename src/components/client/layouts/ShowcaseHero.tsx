"use client";
import { siteConfig } from "@/config/client/siteConfig";
import { cn } from "@/lib/client/utils";

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

export function ShowcaseHero({ activeTab, setActiveTab, showFlights, showHotels, showTrains, showCabs, showRentals, showCruises, children }: LayoutProps) {
    return (
        <section className="relative min-h-[800px] flex items-center justify-end overflow-hidden">
            {/* ... (keep background) ... */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${siteConfig.heroImage}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 flex justify-end text-right">
                <div className="w-full max-w-2xl">
                    <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-purple-500/50 bg-purple-500/10 text-purple-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        Premium Travel
                    </div>
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Display <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Perfected</span>.
                    </h1>
                    <p className="text-lg text-slate-400 mb-12 ml-auto max-w-md">
                        {siteConfig.description}
                    </p>

                    {/* Glassmorphism Panel */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-purple-500/30 transition-all duration-700"></div>

                        <div className="relative z-10 flex justify-end space-x-3 mb-6 flex-wrap gap-y-2">
                            {showFlights && (
                                <button
                                    onClick={() => setActiveTab("flights")}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                                        activeTab === "flights" ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40" : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    Flights
                                </button>
                            )}
                            {showHotels && (
                                <button
                                    onClick={() => setActiveTab("hotels")}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                                        activeTab === "hotels" ? "bg-pink-600 text-white shadow-lg shadow-pink-500/40" : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    Hotels
                                </button>
                            )}
                            {showTrains && (
                                <button
                                    onClick={() => setActiveTab("trains")}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                                        activeTab === "trains" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/40" : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    Trains
                                </button>
                            )}
                            {showCabs && (
                                <button
                                    onClick={() => setActiveTab("cabs")}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                                        activeTab === "cabs" ? "bg-rose-600 text-white shadow-lg shadow-rose-500/40" : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    Cabs
                                </button>
                            )}
                            {showRentals && (
                                <button
                                    onClick={() => setActiveTab("rentals")}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                                        activeTab === "rentals" ? "bg-violet-600 text-white shadow-lg shadow-violet-500/40" : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    Rentals
                                </button>
                            )}
                            {showCruises && (
                                <button
                                    onClick={() => setActiveTab("cruises")}
                                    className={cn(
                                        "px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300",
                                        activeTab === "cruises" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/40" : "text-white/60 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    Cruises
                                </button>
                            )}
                        </div>

                        <div className="text-left [&_input]:bg-white/10 [&_input]:border-white/20 [&_input]:text-white [&_input]:placeholder-white/40 [&_label]:text-slate-300">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
