"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, ExternalLink } from 'lucide-react';

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

export default function NewsPage() {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchNews = async () => {
            try {
                // Fetching news via local proxy to avoid CORS
                const response = await fetch('/api/client/news');
                const data = await response.json();

                if (data.news_results && data.news_results.length > 0) {
                    setNews(data.news_results);
                } else {
                    console.warn("News API returned no results or error.", data.error);
                }
            } catch (error) {
                console.error("Failed to fetch news:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-serif mb-4">
                        Travel News
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Latest updates, stories, and insights from the world of travel.
                    </p>
                </header>

                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex flex-col md:flex-row h-full md:h-48 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-2xl overflow-hidden">
                                <div className="w-full md:w-1/3 h-48 md:h-full bg-gray-300 dark:bg-gray-700" />
                                <div className="p-6 flex-1 space-y-4">
                                    <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
                                    <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : news.length > 0 ? (
                    <div className="space-y-8">
                        {news.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
                            >
                                {/* Image Section */}
                                <div className="relative w-full md:w-1/3 h-56 md:h-auto overflow-hidden bg-gray-200">
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
                                        <div className="flex items-center justify-center h-full text-gray-400">
                                            <span className="text-sm">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 md:hidden bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                                        {typeof item.source === 'object' && item.source !== null ? (item.source as any).name : item.source}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="hidden md:inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold">
                                            {typeof item.source === 'object' && item.source !== null ? (item.source as any).name : item.source}
                                        </span>
                                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 gap-2">
                                            <Calendar className="w-3 h-3" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            {item.title}
                                        </a>
                                    </h2>

                                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-3 mb-6 flex-grow">
                                        {item.snippet}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors gap-1"
                                        >
                                            Read Full Story <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-gray-500">No news found at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
