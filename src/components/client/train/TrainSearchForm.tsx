"use client";

import { useState } from "react";
import { Train, Calendar, User, Search } from "lucide-react";
import { cn } from "@/lib/client/utils";
import { useRouter } from "next/navigation";

interface TrainSearchFormProps {
    transparent?: boolean;
}

export function TrainSearchForm({ transparent }: TrainSearchFormProps) {
    const router = useRouter();
    const [passengers, setPassengers] = useState(1);
    const [trainClass, setTrainClass] = useState("all");
    const [showDropdown, setShowDropdown] = useState(false);

    const classes = [
        { label: "All Classes", value: "all" },
        { label: "Sleeper (SL)", value: "SL" },
        { label: "AC 3 Tier (3A)", value: "3A" },
        { label: "AC 2 Tier (2A)", value: "2A" },
        { label: "AC First Class (1A)", value: "1A" },
        { label: "Chair Car (CC)", value: "CC" },
    ];

    function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const params = new URLSearchParams();
        const from = formData.get("from") as string;
        const to = formData.get("to") as string;
        const date = formData.get("date") as string;

        if (from) params.set("from", from);
        if (to) params.set("to", to);
        if (date) params.set("date", date);

        params.set("class", trainClass);
        params.set("passengers", passengers.toString());

        router.push(`/Train?${params.toString()}`);
    }

    return (
        <div className={cn(
            "rounded-xl p-6 md:p-8 relative z-10",
            transparent
                ? "bg-transparent w-full"
                : "bg-white shadow-xl max-w-5xl mx-auto -mt-32 border border-slate-100"
        )}>
            <div className="flex space-x-6 mb-6">

            </div>

            <form onSubmit={handleSearch} className="relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                    {/* From - To */}
                    <div className={cn(
                        "md:col-span-5 grid grid-cols-1 sm:grid-cols-2 rounded-lg overflow-hidden divide-y sm:divide-y-0 sm:divide-x",
                        transparent
                            ? "bg-white/10 border border-white/20 divide-white/20"
                            : "bg-white border border-slate-300 divide-slate-300"
                    )}>
                        <div className={cn("p-3 transition-colors cursor-text relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>From</span>
                            <input name="from" type="text" placeholder="NDLS" defaultValue="" className={cn("w-full bg-transparent font-bold text-2xl outline-none transition-colors uppercase placeholder:text-opacity-50", transparent ? "text-white placeholder:text-white/30 group-hover:text-white" : "text-slate-800 placeholder:text-slate-300 group-hover:text-primary")} />
                            <p className={cn("text-xs truncate", transparent ? "text-white/60 group-hover:text-white/80" : "text-slate-500 group-hover:text-slate-700")}>Origin Station</p>
                        </div>
                        <div className={cn("p-3 transition-colors cursor-text relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>To</span>
                            <input name="to" type="text" placeholder="BCT" defaultValue="" className={cn("w-full bg-transparent font-bold text-2xl outline-none transition-colors uppercase placeholder:text-opacity-50", transparent ? "text-white placeholder:text-white/30 group-hover:text-white" : "text-slate-800 placeholder:text-slate-300 group-hover:text-primary")} />
                            <p className={cn("text-xs truncate", transparent ? "text-white/60 group-hover:text-white/80" : "text-slate-500 group-hover:text-slate-700")}>Destination Station</p>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className={cn(
                        "grid grid-cols-1 md:col-span-3 rounded-lg overflow-hidden border",
                        transparent ? "bg-white/10 border-white/20" : "bg-white border-slate-300"
                    )}>
                        <div className={cn("p-3 transition-colors relative group", transparent ? "hover:bg-white/5" : "hover:bg-slate-50")}>
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Date</span>
                            <input name="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} min={new Date().toISOString().split('T')[0]} className={cn("w-full bg-transparent font-bold text-lg outline-none", transparent ? "text-white [color-scheme:dark]" : "text-slate-800")} />
                            <p className={cn("text-xs truncate mt-1", transparent ? "text-white/60 group-hover:text-white/80" : "text-slate-500 group-hover:text-slate-700")}>Journey Date</p>
                        </div>
                    </div>

                    {/* Travelers & Class */}
                    <div className={cn(
                        "relative rounded-lg p-3 transition-colors cursor-pointer group border md:col-span-4",
                        transparent ? "bg-white/10 border-white/20 hover:bg-white/5" : "bg-white border-slate-300 hover:bg-slate-50"
                    )}>
                        <div onClick={() => setShowDropdown(!showDropdown)} className="h-full">
                            <span className={cn("block text-xs font-bold uppercase tracking-wider mb-1", transparent ? "text-white/70" : "text-slate-500")}>Travellers & Class</span>
                            <div className="flex items-baseline space-x-1">
                                <span className={cn("text-2xl font-bold transition-colors", transparent ? "text-white group-hover:text-white" : "text-slate-800 group-hover:text-primary")}>{passengers}</span>
                                <span className={cn("text-sm font-medium", transparent ? "text-white/80" : "text-slate-600")}>Traveller(s)</span>
                            </div>
                            <p className={cn("text-xs truncate", transparent ? "text-white/60 group-hover:text-white/80" : "text-slate-500 group-hover:text-slate-700")}>
                                {classes.find(c => c.value === trainClass)?.label}
                            </p>
                        </div>

                        {/* Dropdown */}
                        {showDropdown && (
                            <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                                {/* Triangle arrow */}
                                <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-200 transform rotate-45"></div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Class</label>
                                        <div className="space-y-2 max-h-40 overflow-y-auto">
                                            {classes.map((c) => (
                                                <label key={c.value} className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-slate-50">
                                                    <input
                                                        type="radio"
                                                        name="class"
                                                        value={c.value}
                                                        checked={trainClass === c.value}
                                                        onChange={() => setTrainClass(c.value)}
                                                        className="w-4 h-4 text-primary focus:ring-primary accent-primary"
                                                    />
                                                    <span className="text-sm font-medium text-slate-700">{c.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Travellers</label>
                                        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-2 border border-slate-200">
                                            <button
                                                type="button"
                                                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-primary disabled:opacity-50 font-bold text-lg"
                                                disabled={passengers <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="font-bold text-slate-800">{passengers}</span>
                                            <button
                                                type="button"
                                                onClick={() => setPassengers(Math.min(6, passengers + 1))}
                                                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm text-slate-600 hover:text-primary font-bold text-lg"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowDropdown(false)}
                                        className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Backdrop to close dropdown */}
                        {showDropdown && (
                            <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)}></div>
                        )}
                    </div>
                </div>

                <div className="absolute -bottom-14 left-0 right-0 flex justify-center">
                    <button type="submit" className="bg-primary text-white font-bold py-3 px-12 rounded-full text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2 uppercase">
                        <Search className="w-5 h-5 mr-1" />
                        <span>Search Trains</span>
                    </button>
                </div>
            </form>
        </div>
    );
}
