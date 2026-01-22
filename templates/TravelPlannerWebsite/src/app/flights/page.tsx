import { SearchResults } from "@/components/flight/SearchResults";
import { fetchFlights } from "@/lib/flight-service";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

export default async function FlightsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }> // NextJS 15 typing
}) {
    const resolvedSearchParams = await searchParams; // Next.js 15 searchParams is a promise

    const from = (resolvedSearchParams?.from as string) || "DEL";
    const to = (resolvedSearchParams?.to as string) || "BOM";
    const cabin = (resolvedSearchParams?.cabin as string) || "economy";
    const passengers = parseInt((resolvedSearchParams?.passengers as string) || "1", 10);
    const returnDate = (resolvedSearchParams?.returnDate as string);

    // Ensure date is valid or default to today (in local time)
    let date = (resolvedSearchParams?.date as string);
    const today = new Date().toLocaleDateString('en-CA');

    if (!date || date < today) {
        date = today;
    }

    const flights = await fetchFlights(from, to, date, passengers, cabin, returnDate);
    const isClassic = siteConfig.layout === 'classic';

    return (
        <div className={cn("min-h-screen pb-12", isClassic ? "bg-white dark:bg-slate-950" : "bg-slate-50/50")}>
            <div className={cn("py-10 shadow-sm relative z-10", isClassic ? "bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800" : "bg-slate-900 text-white")}>
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className={cn("text-3xl font-bold mb-2", isClassic ? "font-serif text-black dark:text-white" : "text-white")}>
                                Flights from {from} to {to}
                            </h1>
                            <div className="flex items-center gap-3 text-sm opacity-90">
                                <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                                    {new Date(date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'long' })}
                                    {returnDate ? ` - ${new Date(returnDate).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'long' })}` : ''}
                                </span>
                                <span className="hidden md:inline text-slate-400">•</span>
                                <span>{passengers} Traveller{passengers > 1 ? 's' : ''}</span>
                                <span className="hidden md:inline text-slate-400">•</span>
                                <span className="capitalize">{cabin} Class</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SearchResults flights={flights} isClassic={isClassic} />
        </div>
    );
}
