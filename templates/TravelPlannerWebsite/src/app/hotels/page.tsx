import { HotelSearchForm } from "@/components/hotel/HotelSearchForm";
import { HotelCard, HotelData } from "@/components/hotel/HotelCard";
import { fetchHotels } from "@/lib/hotel-service";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

export default async function HotelsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const resolvedSearchParams = await searchParams;
    const location = (resolvedSearchParams.location as string) || "Goa";
    const maxPrice = parseInt((resolvedSearchParams.maxPrice as string) || "50000");

    const checkIn = (resolvedSearchParams.checkIn as string);
    const checkOut = (resolvedSearchParams.checkOut as string);

    // Fetch hotels using the service which uses Google API
    let hotels: HotelData[] = await fetchHotels(location, checkIn, checkOut);

    // Filter locally by price if needed (since API price filtering is limited/simulated)
    if (hotels.length > 0) {
        hotels = hotels.filter(h => h.price <= maxPrice);
    }

    const isClassic = siteConfig.layout === 'classic';

    return (
        <div className={cn("min-h-screen pb-20", isClassic ? 'bg-white dark:bg-slate-950 font-serif' : 'bg-slate-50')}>
            {/* Hero Section for Hotels */}
            <div className={cn("relative w-full overflow-hidden", isClassic ? 'h-[400px]' : 'h-[500px]')}>
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop')` }}
                />
                <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 pt-10">
                    <h1 className={cn("font-bold text-white mb-6 drop-shadow-lg tracking-tight", isClassic ? 'text-5xl md:text-7xl italic' : 'text-4xl md:text-6xl')}>
                        {isClassic ? 'Your Perfect Stay.' : 'Find Your Perfect Stay'}
                    </h1>
                    <p className={cn("text-slate-200 max-w-2xl drop-shadow-md", isClassic ? 'text-xl md:text-2xl font-light' : 'text-lg md:text-xl')}>
                        Discover top-rated hotels, resorts, and vacation rentals in {location} and beyond.
                    </p>
                </div>
            </div>

            {/* Search Form Container */}
            <div className={cn("container mx-auto px-4 mb-16", isClassic ? '-mt-16 relative z-30' : '')}>
                <div className={isClassic ? 'bg-white dark:bg-slate-900 p-6 rounded-xl shadow-2xl border border-slate-100 dark:border-gray-800 max-w-4xl mx-auto' : ''}>
                    <HotelSearchForm />
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                    <div>
                        <h2 className={cn("text-2xl font-bold", isClassic ? 'text-black dark:text-white font-serif text-3xl' : 'text-slate-900')}>
                            {isClassic ? `Stays in ${location}` : `Hotels in ${location}`}
                        </h2>
                        <p className={cn("mt-1", isClassic ? "text-gray-500 dark:text-gray-400" : "text-slate-500")}>Showing {hotels.length} properties within your budget</p>
                    </div>

                    {/* Sort/Filter Pills */}
                    <div className="flex gap-2 mt-4 md:mt-0">
                        <span className={cn("px-4 py-1.5 rounded-full border text-sm font-medium cursor-pointer transition-colors",
                            isClassic ? 'bg-white dark:bg-slate-900 border-black dark:border-gray-500 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black' : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                        )}>Rating 4.0+</span>
                        <span className={cn("px-4 py-1.5 rounded-full border text-sm font-medium cursor-pointer transition-colors",
                            isClassic ? 'bg-white dark:bg-slate-900 border-black dark:border-gray-500 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black' : 'bg-white border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                        )}>Free Cancellation</span>
                    </div>
                </div>

                {hotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {hotels.map(hotel => (
                            <div key={hotel.id} className="h-full">
                                <HotelCard hotel={hotel} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={cn("rounded-2xl p-12 text-center border shadow-sm", isClassic ? "bg-white dark:bg-slate-900 border-gray-100 dark:border-gray-800" : "bg-white border-slate-100")}>
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h3 className={cn("text-xl font-bold mb-2", isClassic ? "text-black dark:text-white" : "text-slate-900")}>No hotels found</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                            We couldn't find any hotels in "{location}" matching your criteria. Try changing the location or filters.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
