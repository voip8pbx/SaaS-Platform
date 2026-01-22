"use client";

import { useState } from "react";
import { FlightSearchForm } from "@/components/flight/FlightSearchForm";
import { HotelSearchForm } from "@/components/hotel/HotelSearchForm";
import { TrainSearchForm } from "@/components/train/TrainSearchForm";
import { CabSearchForm } from "@/components/cab/CabSearchForm";
import { RentalSearchForm } from "@/components/rental/RentalSearchForm";
import { CruiseSearchForm } from "@/components/cruise/CruiseSearchForm";
import { VillaSearchForm } from "@/components/villa/VillaSearchForm";
import { siteConfig } from "@/config/siteConfig";
import { ClassicHero } from "@/components/layouts/classic/ClassicHero";
import { ModernHero } from "@/components/layouts/modern/ModernHero";
import { MinimalHero } from "@/components/layouts/MinimalHero";
import { ShowcaseHero } from "@/components/layouts/ShowcaseHero";

export function HeroSection() {
    const { layout, features } = siteConfig;
    const showFlights = features.flights;
    const showHotels = features.hotels;
    const showTrains = features.trains;
    const showCabs = features.cabs;
    const showRentals = features.rentals;
    const showCruises = features.cruises;
    const showVillas = features.villas;

    // Determine default tab
    const [activeTab, setActiveTab] = useState(showFlights ? "flights" : showHotels ? "hotels" : showTrains ? "trains" : showCabs ? "cabs" : showRentals ? "rentals" : "flights");

    const renderLayout = () => {
        const props = {
            activeTab,
            setActiveTab,
            showFlights,
            showHotels,
            showTrains,
            showCabs,
            showRentals,
            showCruises,
            showVillas,
            children: (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === "flights" && showFlights && <FlightSearchForm transparent={layout === 'classic'} />}
                    {activeTab === "hotels" && showHotels && <HotelSearchForm transparent={layout === 'classic'} />}
                    {activeTab === "trains" && showTrains && <TrainSearchForm transparent={layout === 'classic'} />}
                    {activeTab === "cabs" && showCabs && <CabSearchForm transparent={layout === 'classic'} />}
                    {activeTab === "rentals" && showRentals && <RentalSearchForm transparent={layout === 'classic'} />}
                    {activeTab === "cruises" && showCruises && <CruiseSearchForm transparent={layout === 'classic'} />}
                    {activeTab === "villas" && showVillas && <VillaSearchForm transparent={layout === 'classic'} />}
                </div>
            )
        };

        switch (layout) {
            case 'modern':
                return <ModernHero />;
            case 'minimal':
                return <MinimalHero {...props} />;
            case 'showcase':
                return <ShowcaseHero {...props} />;
            case 'classic':
            default:
                return <ClassicHero {...props} />;
        }
    };

    if (!showFlights && !showHotels) return null;

    return renderLayout();
}
