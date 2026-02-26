"use client";

import { useEffect, useState } from "react";
import { PackageCard } from "@/components/client/packages/PackageCard";
import { getPackages } from "@/app/client/packages/page";
import { siteConfig } from "@/config/client/siteConfig";

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

export function ModernPackages() {
    if (!siteConfig.features.packages) return null;

    const [packages, setPackages] = useState<Package[]>([]);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages();
                setPackages(data);
            } catch (error) {
                console.error("Failed to fetch packages:", error);
            }
        };

        fetchPackages();
    }, []);

    return (
        <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                    Exclusive Travel Packages
                </h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Explore our top-rated destinations with exclusive offers and premium experiences.
                </p>
            </div>

            <div className="relative w-full">
                <div className="flex w-max animate-scroll hover:[animation-play-state:paused] [animation-direction:reverse]">
                    <div className="flex gap-8 px-4">
                        {packages.map((pkg) => (
                            <div key={`original-${pkg.id}`} className="w-[350px] flex-shrink-0">
                                <PackageCard pkg={pkg} />
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-8 px-4">
                        {packages.map((pkg) => (
                            <div key={`duplicate-${pkg.id}`} className="w-[350px] flex-shrink-0">
                                <PackageCard pkg={pkg} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

