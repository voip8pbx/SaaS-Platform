"use client";
import { Plane } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Flight } from "@/lib/client/flightTypes";

interface FlightCardProps {
    flight: Flight;
}



export function FlightCard({ flight }: FlightCardProps) {
    return (
        <div className="bg-card rounded-lg shadow-sm border border-border p-4 md:p-6 mb-4 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 w-full space-y-4">
                {/* Outbound */}
                <FlightLegRow data={flight} label="Outbound" />

                {/* Return */}
                {flight.returnLeg && (
                    <>
                        <div className="h-px bg-border my-2"></div>
                        <FlightLegRow data={flight.returnLeg} label="Return" />
                    </>
                )}
            </div>

            {/* Price & Action */}
            <div className="flex flex-col items-end w-full md:w-1/4 pl-0 md:pl-4 md:border-l border-border mt-4 md:mt-0 self-center">
                <p className="text-2xl font-bold text-foreground mb-1">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: flight.currency, maximumFractionDigits: 0 }).format(flight.price)}
                </p>
                <p className="text-xs text-muted-foreground mb-3">per traveller</p>
                <button className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary/90 transition-colors w-full md:w-auto shadow-sm">
                    Book Now
                </button>
            </div>
        </div>
    );
}

function FlightLegRow({ data, label }: { data: any, label?: string }) {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
            {/* Airline Info */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-1/3">
                <div className="w-12 h-12 flex items-center justify-center bg-card rounded-full border border-border overflow-hidden relative">
                    {data.airlineLogo && !imageError ? (
                        <img
                            src={data.airlineLogo}
                            alt={data.airline}
                            className="w-full h-full object-contain p-2"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-600 font-bold text-xs">
                            {data.airlineCode}
                        </div>
                    )}
                </div>
                <div>
                    <p className="font-bold text-foreground">{data.airline}</p>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">{data.airlineCode}-{data.flightNumber}</span>
                        {label && <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-medium uppercase tracking-wider">{label}</span>}
                    </div>
                </div>
            </div>

            {/* Flight Timing */}
            <div className="flex items-center w-full md:w-2/3 justify-between px-4">
                <div className="text-left">
                    <p className="text-xl font-bold text-foreground">{format(new Date(data.departureTime), "HH:mm")}</p>
                    <p className="text-xs text-muted-foreground font-medium">{data.from}</p>
                </div>

                <div className="flex flex-col items-center px-4 w-full">
                    <p className="text-xs text-muted-foreground mb-1">{data.duration}</p>
                    <div className="w-full flex items-center">
                        <div className="h-[1px] w-full bg-border"></div>
                        <Plane className="h-4 w-4 text-border mx-2 transform rotate-90" />
                        <div className="h-[1px] w-full bg-border"></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{data.stops === 0 ? "Non-stop" : `${data.stops} Stop(s)`}</p>
                </div>

                <div className="text-right">
                    <p className="text-xl font-bold text-foreground">{format(new Date(data.arrivalTime), "HH:mm")}</p>
                    <p className="text-xs text-muted-foreground font-medium">{data.to}</p>
                </div>
            </div>
        </div>
    );
}
