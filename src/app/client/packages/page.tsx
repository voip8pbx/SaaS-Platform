import { PackageCard } from "@/components/client/packages/PackageCard";
import { siteConfig } from "@/config/client/siteConfig";
import { cn } from "@/lib/client/utils";

export async function getPackages() {
    return [
        {
            id: "PKG001",
            title: "Magical Maldives",
            location: "Maldives",
            duration: "5 Nights / 6 Days",
            price: 45000,
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
            rating: 4.8,
            reviews: 120,
            amenities: ["Flight", "Hotel", "Meals", "Transfer"]
        },
        {
            id: "PKG002",
            title: "Dubai Delight",
            location: "Dubai",
            duration: "4 Nights / 5 Days",
            price: 35000,
            image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=2000&auto=format&fit=crop",
            rating: 4.5,
            reviews: 85,
            amenities: ["Flight", "Hotel", "Sightseeing", "Visa"]
        },
        {
            id: "PKG003",
            title: "Bali Bliss",
            location: "Bali, Indonesia",
            duration: "6 Nights / 7 Days",
            price: 55000,
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
            rating: 4.7,
            reviews: 200,
            amenities: ["Flight", "Villa", "Breakfast", "Tours"]
        },
        {
            id: "PKG004",
            title: "Kerala Backwaters",
            location: "Kerala, India",
            duration: "3 Nights / 4 Days",
            price: 18000,
            image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop",
            rating: 4.6,
            reviews: 150,
            amenities: ["Houseboat", "Meals", "Transfer"]
        },
        {
            id: "PKG005",
            title: "Spectacular Singapore",
            location: "Singapore",
            duration: "4 Nights / 5 Days",
            price: 42000,
            image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
            rating: 4.7,
            reviews: 180,
            amenities: ["Flight", "Hotel", "City Tour", "Sentosa"]
        },
        {
            id: "PKG006",
            title: "Tropical Thailand",
            location: "Phuket & Bangkok",
            duration: "5 Nights / 6 Days",
            price: 38000,
            image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop",
            rating: 4.6,
            reviews: 220,
            amenities: ["Flight", "Beach Hotel", "Breakfast", "Island Tour"]
        },
        {
            id: "PKG007",
            title: "Shimla Serenity",
            location: "Shimla, Himachal Pradesh",
            duration: "3 Nights / 4 Days",
            price: 15000,
            image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2000&auto=format&fit=crop",
            rating: 4.5,
            reviews: 95,
            amenities: ["Volvo Bus", "Hotel", "Sightseeing", "Meals"]
        },
        {
            id: "PKG008",
            title: "Majestic Manali",
            location: "Manali, Himachal Pradesh",
            duration: "4 Nights / 5 Days",
            price: 18500,
            image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2000&auto=format&fit=crop",
            rating: 4.8,
            reviews: 140,
            amenities: ["Volvo Bus", "Resort", "Snow Points", "Meals"]
        },
        {
            id: "PKG009",
            title: "New York Highlights",
            location: "New York, USA",
            duration: "6 Nights / 7 Days",
            price: 125000,
            image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2000&auto=format&fit=crop",
            rating: 4.9,
            reviews: 110,
            amenities: ["Flight", "City Stay", "City Pass", "Visa Assistance"]
        },
        {
            id: "PKG010",
            title: "Parisian Dreams",
            location: "Paris, France",
            duration: "5 Nights / 6 Days",
            price: 98000,
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop",
            rating: 4.8,
            reviews: 145,
            amenities: ["Flight", "Hotel", "Eiffel Tour", "Breakfast"]
        },
        {
            id: "PKG011",
            title: "Swiss Alpine Adventure",
            location: "Zurich & Interlaken",
            duration: "6 Nights / 7 Days",
            price: 135000,
            image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2000&auto=format&fit=crop",
            rating: 4.9,
            reviews: 160,
            amenities: ["Flight", "Swiss Pass", "Hotel", "Scenic Train"]
        },
        {
            id: "PKG012",
            title: "London Royal Experience",
            location: "London, UK",
            duration: "5 Nights / 6 Days",
            price: 105000,
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop",
            rating: 4.7,
            reviews: 130,
            amenities: ["Flight", "Hotel", "City Pass", "Breakfast"]
        },
        {
            id: "PKG013",
            title: "Tokyo Modern & Traditional",
            location: "Tokyo, Japan",
            duration: "6 Nights / 7 Days",
            price: 115000,
            image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop",
            rating: 4.8,
            reviews: 190,
            amenities: ["Flight", "Hotel", "Bullet Train", "Guided Tour"]
        },
        {
            id: "PKG014",
            title: "Sydney Harbour Escape",
            location: "Sydney, Australia",
            duration: "7 Nights / 8 Days",
            price: 145000,
            image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2000&auto=format&fit=crop",
            rating: 4.9,
            reviews: 115,
            amenities: ["Flight", "Hotel", "Opera House", "Cruise"]
        },
        {
            id: "PKG015",
            title: "Santorini Sunset Bliss",
            location: "Santorini, Greece",
            duration: "4 Nights / 5 Days",
            price: 110000,
            image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop",
            rating: 4.9,
            reviews: 210,
            amenities: ["Flight", "Luxury Villa", "Sunset Cruise", "Breakfast"]
        }
    ];
}

export default async function PackagesPage() {
    const packages = await getPackages();
    const isClassic = siteConfig.layout === 'classic';

    return (
        <div className={cn("min-h-screen py-12", isClassic ? "bg-white dark:bg-slate-950" : "bg-slate-50")}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h1 className={cn("text-4xl font-bold mb-4", isClassic ? "font-serif text-black dark:text-white" : "text-slate-900")}>Holiday Packages</h1>
                    <p className={cn("max-w-2xl mx-auto", isClassic ? "text-gray-600 dark:text-gray-400 font-serif italic" : "text-slate-600")}>Discover our handpicked holiday packages for your perfect vacation.</p>
                </div>

                <div className="flex flex-col gap-6 max-w-5xl mx-auto">
                    {packages.map(pkg => (
                        <div key={pkg.id} className="w-full">
                            <PackageCard pkg={pkg} horizontal />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
