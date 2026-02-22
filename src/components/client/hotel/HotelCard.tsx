"use client";

import { Star, MapPin, Wifi, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export interface HotelData {
    id: string;
    name: string;
    address: string;
    price: number;
    rating: number;
    image: string;
    amenities: string[];
    user_ratings_total?: number;
}

export function HotelCard({ hotel }: { hotel: HotelData }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1">
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                    src={!imgError ? (hotel.image || '/placeholder-hotel.jpg') : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'}
                    alt={hotel.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={() => setImgError(true)}
                    unoptimized
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-800 flex items-center shadow-lg">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1.5" />
                    {hotel.rating || 4.5} <span className="text-slate-400 font-normal ml-1">({hotel.user_ratings_total || 100})</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-1">{hotel.name}</h3>
                    <div className="flex items-start mt-2 text-slate-500 text-sm">
                        <MapPin className="w-4 h-4 mr-1 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{hotel.address}</span>
                    </div>
                </div>

                {/* Amenities (Placeholder based on API or default) */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {(hotel.amenities || ["Free Wifi", "Pool", "Spa"]).slice(0, 3).map((amenity, i) => (
                        <span key={i} className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full flex items-center border border-slate-100">
                            {amenity === "Free Wifi" && <Wifi className="w-3 h-3 mr-1.5" />}
                            {amenity}
                        </span>
                    ))}
                    {(hotel.amenities?.length || 3) > 3 && (
                        <span className="px-2 py-1 bg-slate-50 text-slate-500 text-xs rounded-full border border-slate-100">
                            +{((hotel.amenities?.length || 3) - 3)} more
                        </span>
                    )}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                    <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">Price per night</p>
                        <div className="flex items-baseline">
                            <span className="text-2xl font-bold text-slate-900">₹ {hotel.price?.toLocaleString()}</span>
                            <span className="text-xs text-slate-400 ml-1 line-through">₹ {Math.round(hotel.price * 1.2).toLocaleString()}</span>
                        </div>
                    </div>
                    <button className="bg-primary text-white font-bold py-2.5 px-6 rounded-lg hover:bg-primary/90 transition-all shadow-md shadow-primary/20 text-sm">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}
