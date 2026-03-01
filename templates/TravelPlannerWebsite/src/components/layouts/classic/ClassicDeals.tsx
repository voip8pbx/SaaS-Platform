import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPackages } from "@/lib/package-service";

export async function ClassicDeals() {
    const packages = await getPackages();
    // Duplicate for seamless loop
    const marqueePackages = [...packages, ...packages];

    return (
        <section className="py-24 bg-[#f8f5f2] dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white font-serif mb-4">Our Top Travel Packages</h2>
                    <div className="w-24 h-1 bg-primary mx-auto opacity-50"></div>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full">
                <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                    {marqueePackages.map((deal, idx) => (
                        <div
                            key={`${deal.id}-${idx}`}
                            className="w-[350px] md:w-[400px] shrink-0 mx-4 group bg-white dark:bg-slate-900 rounded-t-3xl rounded-b-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Image Container */}
                            <div className="relative h-72 w-full overflow-hidden">
                                <Image
                                    src={deal.image}
                                    alt={deal.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            </div>

                            {/* Card Body */}
                            <div className="p-8 text-center bg-white dark:bg-slate-900 relative -mt-4 mx-4 rounded-xl shadow-sm border border-slate-100 dark:border-gray-800">
                                <h3 className="text-2xl font-bold text-slate-800 dark:text-gray-100 font-serif mb-3 truncate">{deal.title}</h3>
                                <p className="text-slate-500 dark:text-gray-400 text-sm mb-6 leading-relaxed font-light">{deal.duration}</p>

                                <div className="flex justify-between items-center border-t border-slate-100 dark:border-gray-800 pt-4">
                                    <div className="text-left">
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{deal.location}</div>
                                        <div className="text-primary font-serif font-bold italic">₹ {deal.price.toLocaleString()}</div>
                                    </div>

                                    <button className="px-6 py-2 bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 text-center mt-12">
                <Link href="/packages" className="inline-flex items-center text-slate-800 dark:text-gray-100 font-serif font-bold underline decoration-2 underline-offset-4 hover:text-primary transition-colors">
                    View All Packages <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
        </section>
    );
}
