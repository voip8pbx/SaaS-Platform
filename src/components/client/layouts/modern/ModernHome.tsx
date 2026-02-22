"use client";
import { ModernHero } from "./ModernHero";
import { ModernDestinations } from "./ModernDestinations";
import { ModernTripPlanner } from "./ModernTripPlanner";
import { ModernPackages } from "./ModernPackages";
import { ModernNews } from "./ModernNews";
import { siteConfig } from "@/config/client/siteConfig";

export function ModernHome() {
    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
            <ModernHero />
            <ModernDestinations />
            <ModernTripPlanner />
            <ModernPackages />
            {siteConfig.features.news && <ModernNews />}
        </div>
    );
}
