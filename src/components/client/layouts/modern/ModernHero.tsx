"use client";
import { siteConfig } from "@/config/client/siteConfig";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChatBot } from "@/components/client/shared/ChatBot";

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2044&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop"
];

export function ModernHero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative h-[650px] flex items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Images with Glide/Fade effect */}
            <div className="absolute inset-0 z-0 bg-slate-900">
                {HERO_IMAGES.map((image, index) => (
                    <div
                        key={image}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={image}
                            alt="Hero Background"
                            fill
                            className="object-cover blur-[1px] brightness-75"
                            priority={index === 0}
                        />
                    </div>
                ))}

                {/* Gradient overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/80"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-900/20 to-slate-950/40"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-8 flex flex-col items-center">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-2xl">
                        Your Journey Awaits
                    </h1>
                    <p className="text-lg md:text-xl text-slate-100 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
                        Discover extraordinary destinations and create unforgettable memories with {siteConfig.name}.
                    </p>
                </div>

                <div className="pt-2">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-10 py-4 text-base shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1"
                    >
                        Start Your Adventure
                    </button>
                </div>
            </div>
            {/* ChatBot */}
            <ChatBot />
        </section>
    );
}

