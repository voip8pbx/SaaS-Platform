"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/client/ui/button'; // Button not found, using HTML button

interface NewsItem {
    position: number;
    title: string;
    link: string;
    source: string | { name: string;[key: string]: any };
    date: string;
    snippet: string;
    thumbnail: string;
}

// API Key is now handled securely in the backend route /api/news

export function ClassicNews() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    const MOCK_NEWS: NewsItem[] = [
        {
            position: 1,
            title: "Top 10 Travel Destinations for 2024",
            link: "#",
            source: "Travel Weekly",
            date: "2 hours ago",
            snippet: "Discover the most trending travel spots for the upcoming year, from hidden gems to popular cities.",
            thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
        },
        {
            position: 2,
            title: "New Airline Routes Announced for Summer",
            link: "#",
            source: "Aviation Daily",
            date: "5 hours ago",
            snippet: "Major airlines are expanding their networks with new direct flights to exotic locations.",
            thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
        },
        {
            position: 3,
            title: "Sustainable Tourism on the Rise",
            link: "#",
            source: "EcoTravel",
            date: "1 day ago",
            snippet: "How travelers are making more eco-friendly choices and the impact on the industry.",
            thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
        },
        {
            position: 4,
            title: "Best Hotel Deals for the Weekend",
            link: "#",
            source: "Hotel Insider",
            date: "1 day ago",
            snippet: "Grab these limited-time offers for luxury stays at unbeatable prices.",
            thumbnail: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetching news via local proxy to avoid CORS
                const response = await fetch('/api/client/news');
                const data = await response.json();

                if (data.news_results && data.news_results.length > 0) {
                    setNews(data.news_results);
                } else {
                    console.warn("News API returned no results or error, using mock data.", data.error);
                    setNews(MOCK_NEWS);
                }
            } catch (error) {
                console.error("Failed to fetch news, using mock data:", error);
                setNews(MOCK_NEWS);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
                        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded" />
                    </div>
                    <div className="flex gap-6 overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="min-w-[350px] h-[400px] bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (news.length === 0) return null;

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-serif mb-2">
                            Latest Travel News
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Stay updated with the latest trends and stories in travel.
                        </p>
                    </div>
                    <Link href="/news" className="hidden md:flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                        View All News <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Vertical Scroll Container (FlatList-like) */}
                <div className="relative max-h-[730px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 dark:scrollbar-thumb-blue-500 pr-2">
                    <div className="flex flex-col gap-6">
                        {news.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 group min-h-[160px]"
                            >
                                {/* Image Section */}
                                <div className="relative w-full md:w-48 h-48 md:h-auto flex-shrink-0 bg-gray-200">
                                    {item.thumbnail ? (
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 200px"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <span className="text-sm">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 md:hidden bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                                        {typeof item.source === 'object' && item.source !== null ? (item.source as any).name : item.source}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-4 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="hidden md:inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider">
                                            {typeof item.source === 'object' && item.source !== null ? (item.source as any).name : item.source}
                                        </span>
                                        <div className="flex items-center text-xs text-gray-400 gap-1 ml-auto">
                                            <Calendar className="w-3 h-3" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            {item.title}
                                        </a>
                                    </h3>

                                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                                        {item.snippet}
                                    </p>

                                    <div className="mt-auto pt-2 flex justify-end">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors gap-1"
                                        >
                                            Read More <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <Link href="/news" className="inline-block md:hidden w-full py-3 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors font-semibold">
                        View All News
                    </Link>
                </div>
            </div>
        </section>
    );
}
