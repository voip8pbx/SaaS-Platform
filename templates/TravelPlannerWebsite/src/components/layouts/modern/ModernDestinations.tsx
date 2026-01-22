"use client";
import Image from "next/image";

const DESTINATIONS = [
    {
        id: 1,
        title: "Romantic Paris",
        description: "Experience the magic of the City of Love. Visit the Eiffel Tower, Louvre, and charming cafes.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Historic Kyoto",
        description: "Step back in time to ancient temples, traditional tea houses, and beautiful cherry blossoms.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Tranquil Maldives",
        description: "Relax in overwater bungalows, crystal clear waters, and white sandy beaches.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Vibrant New York",
        description: "Immerse yourself in the energy of the Big Apple. Times Square, Central Park, and more.",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    },
];

export function ModernDestinations() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
                        Explore Featured Destinations
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {DESTINATIONS.map((dest) => (
                        <div key={dest.id} className="group bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                            <div className="relative h-56 w-full overflow-hidden">
                                <Image
                                    src={dest.image}
                                    alt={dest.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{dest.title}</h3>
                                <p className="text-base text-slate-500 mb-6 flex-grow line-clamp-3 leading-relaxed">
                                    {dest.description}
                                </p>
                                <button className="w-full bg-white border border-slate-200 text-slate-700 hover:text-white hover:bg-slate-900 hover:border-slate-900 rounded-xl py-3 font-semibold transition-all shadow-sm">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
