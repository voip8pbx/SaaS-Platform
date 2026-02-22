"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut } from "lucide-react";
import { siteConfig } from "@/config/client/siteConfig";
import { AuthModal } from "@/components/client/auth/AuthModal";

export function ClassicHeader() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <>
            <header className="py-6 border-b border-gray-200">
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/* Left: Logo/Brand */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/" className="flex items-center gap-2">
                            {/* Placeholder logic for logo if needed later, currently just text as requested but aligned to corner */}
                            <span className="text-2xl font-serif font-bold tracking-tight text-black dark:text-white">{siteConfig.name}</span>
                        </Link>
                    </div>

                    {/* Center: Navigation */}
                    <nav className="hidden md:flex space-x-8 font-serif italic text-lg text-gray-600 dark:text-gray-300">
                        {siteConfig.features.flights && (
                            <Link href="/flights" className="hover:text-black dark:hover:text-white hover:underline">Flight</Link>
                        )}
                        {siteConfig.features.hotels && (
                            <Link href="/hotels" className="hover:text-black dark:hover:text-white hover:underline">Hotel</Link>
                        )}
                        {siteConfig.features.packages && (
                            <Link href="/packages" className="hover:text-black dark:hover:text-white hover:underline">Package</Link>
                        )}
                        {siteConfig.features.trains && (
                            <Link href="/Train" className="hover:text-black dark:hover:text-white hover:underline">Trains</Link>
                        )}
                        {siteConfig.features.cabs && (
                            <Link href="/cabs" className="hover:text-black dark:hover:text-white hover:underline">Cabs</Link>
                        )}
                        {siteConfig.features.rentals && (
                            <Link href="/CarBikeRental" className="hover:text-black dark:hover:text-white hover:underline">Rentals</Link>
                        )}
                        <Link href="/news" className="hover:text-black dark:hover:text-white hover:underline">News</Link>
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex-1 flex justify-end items-center space-x-4">
                        {session?.user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    {session.user.image ? (
                                        <img
                                            src={session.user.image}
                                            alt={session.user.name || "User"}
                                            className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                            <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium font-serif italic text-gray-700 dark:text-gray-300 max-w-[150px] truncate">
                                        {session.user.name?.split(" ")[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-serif italic text-gray-700 dark:text-gray-300 font-medium"
                            >
                                <User className="h-4 w-4" />
                                <span>Sign In</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}
