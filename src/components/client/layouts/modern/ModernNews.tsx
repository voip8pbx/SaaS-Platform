"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react';

interface NewsItem {
    position: number;
    title: string;
    link: string;
    source: string | { name: string;[key: string]: any };
    date: string;
    snippet: string;
    thumbnail: string;
}

export function ModernNews() {
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
                // Fetching news via local proxy
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
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-16 text-center md:text-left">
                        <div>
                            <div className="h-10 w-64 bg-slate-200 animate-pulse rounded mb-4" />
                            <div className="h-6 w-96 bg-slate-200 animate-pulse rounded" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden h-40 animate-pulse">
                                <div className="w-full md:w-48 bg-slate-200 h-full" />
                                <div className="p-6 flex-1 space-y-4">
                                    <div className="h-4 w-1/4 bg-slate-200 rounded" />
                                    <div className="h-6 w-3/4 bg-slate-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (news.length === 0) return null;

    return (
        <section className="py-24 bg-slate-50 dark:bg-gray-950">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div className="text-center md:text-left w-full">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
                            Latest Travel News
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                            Stay updated with the latest trends and stories in travel.
                        </p>
                    </div>
                </div>

                {/* Vertical Scroll Container (FlatList-like) */}
                <div className="relative max-h-[730px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 dark:scrollbar-thumb-blue-500 pr-2">
                    <div className="flex flex-col gap-6">
                        {news.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 dark:border-gray-800 group min-h-[160px]"
                            >
                                {/* Image Section */}
                                <div className="relative w-full md:w-56 h-48 md:h-auto flex-shrink-0 bg-slate-200 dark:bg-gray-800">
                                    {item.thumbnail ? (
                                        <Image
                                            src={item.thumbnail}
                                            alt={item.title}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-slate-400">
                                            <span className="text-sm">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 left-2 md:hidden bg-blue-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md">
                                        {typeof item.source === 'object' && item.source !== null ? (item.source as any).name : item.source}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="hidden md:inline-block bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {typeof item.source === 'object' && item.source !== null ? (item.source as any).name : item.source}
                                        </span>
                                        <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 gap-1 ml-auto font-medium">
                                            <Calendar className="w-3 h-3" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            {item.title}
                                        </a>
                                    </h3>

                                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                                        {item.snippet}
                                    </p>

                                    <div className="mt-auto pt-2 flex justify-end">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-500 transition-colors gap-1"
                                        >
                                            Read More <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/news" className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-gray-700 rounded-full hover:bg-slate-50 dark:hover:bg-gray-800 hover:border-blue-600 hover:text-blue-600 transition-all font-bold">
                        View All News <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
