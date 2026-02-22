"use client";

import { useState } from "react";
import { FlightSearchForm } from "@/components/client/flight/FlightSearchForm";
import { HotelSearchForm } from "@/components/client/hotel/HotelSearchForm";
import { TrainSearchForm } from "@/components/client/train/TrainSearchForm";
import { CabSearchForm } from "@/components/client/cab/CabSearchForm";
import { RentalSearchForm } from "@/components/client/rental/RentalSearchForm";
import { CruiseSearchForm } from "@/components/client/cruise/CruiseSearchForm";
import { VillaSearchForm } from "@/components/client/villa/VillaSearchForm";
import { siteConfig } from "@/config/client/siteConfig";
import { ClassicHero } from "@/components/client/layouts/classic/ClassicHero";
import { ModernHero } from "@/components/client/layouts/modern/ModernHero";
import { MinimalHero } from "@/components/client/layouts/MinimalHero";
import { ShowcaseHero } from "@/components/client/layouts/ShowcaseHero";

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
