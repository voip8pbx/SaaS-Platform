import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";


// Moving data out to avoid duplication, or keep it here for now if simple
const DEAL_DATA = [
    {
        id: 1,
        title: "Summer in Maldives",
        description: "5 Nights / 6 Days starting @ $999",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
        tag: "Trending"
    },
    {
        id: 2,
        title: "Explore Dubai",
        description: "Special Shopping Festival Offers",
        image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=2000&auto=format&fit=crop",
        tag: "Best Seller"
    },
    {
        id: 3,
        title: "Bali Getaway",
        description: "Luxury villas with private pool",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
        tag: "Honeymoon"
    }
];

export function StandardDeals() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground">Exclusive Offers</h2>
                        <p className="text-muted-foreground mt-2">Handpicked packages just for you.</p>
                    </div>
                    <Link href="/packages" className="text-primary font-semibold flex items-center hover:underline">
                        View All Offers <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {DEAL_DATA.map((deal) => (
                        <div key={deal.id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-card cursor-pointer border border-border flex flex-col h-full">
                            <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0">
                                <Image
                                    src={deal.image}
                                    alt={deal.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-foreground uppercase tracking-wider shadow-sm">
                                    {deal.tag}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-card-foreground mb-2 group-hover:text-primary transition-colors">{deal.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{deal.description}</p>
                                <div className="pt-4 mt-auto border-t border-border flex justify-between items-center text-sm font-medium">
                                    <span className="text-primary hover:underline">View Details</span>
                                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
