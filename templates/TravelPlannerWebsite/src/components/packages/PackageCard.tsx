"use client";
import Image from "next/image";
import { Star, MapPin, Clock, ArrowRight, CheckCircle2, ImageOff } from "lucide-react";
import { useState } from "react";

interface Package {
    id: string;
    title: string;
    location: string;
    duration: string;
    price: number;
    image: string;
    rating: number;
    reviews: number;
    amenities: string[];
}

interface PackageCardProps {
    pkg: Package;
    horizontal?: boolean;
}

export function PackageCard({ pkg, horizontal }: PackageCardProps) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className={`bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-lg transition-all group flex h-full ${horizontal ? 'flex-col md:flex-row' : 'flex-col'}`}>
            <div className={`relative overflow-hidden bg-muted ${horizontal ? 'h-48 md:h-auto md:w-72 shrink-0' : 'h-48 w-full'}`}>
                {!imgError ? (
                    <Image
                        src={pkg.image}
                        alt={pkg.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes={horizontal ? "(max-width: 768px) 100vw, 300px" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"}
                        onError={() => setImgError(true)}
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                        <ImageOff className="w-8 h-8 mb-2" />
                        <span className="text-xs">Image not available</span>
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-foreground flex items-center shadow-sm">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                    {pkg.rating}
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{pkg.title}</h3>
                            <div className="flex items-center text-muted-foreground text-xs mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {pkg.location}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center text-muted-foreground text-xs mt-2 mb-4">
                        <Clock className="w-3 h-3 mr-1" />
                        {pkg.duration}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {pkg.amenities.map(amenity => (
                            <span key={amenity} className="text-[10px] bg-muted/50 text-muted-foreground px-2 py-1 rounded-full flex items-center">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> {amenity}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={`mt-auto pt-4 border-t border-border flex items-center justify-between ${horizontal ? 'md:border-none md:pt-0' : ''}`}>
                    <div>
                        <p className="text-xs text-muted-foreground">Starting from</p>
                        <p className="text-lg font-bold text-foreground">₹ {pkg.price.toLocaleString('en-IN')}</p>
                    </div>
                    <button className="bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors px-4 py-2 rounded-full text-sm font-bold flex items-center">
                        View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}
