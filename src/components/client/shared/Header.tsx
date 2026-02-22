"use client";

import Link from "next/link";
import { siteConfig } from "@/config/client/siteConfig";
import { Menu, X, Plane, Package, Phone, User, Globe, LogOut, Train, Car } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/client/utils";
import { AuthModal } from "@/components/client/auth/AuthModal";
import { useSession, signOut } from "next-auth/react";
import { ClassicHeader } from "@/components/client/layouts/classic/ClassicHeader";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { data: session } = useSession();

    if (siteConfig.layout === 'classic') {
        return <ClassicHeader />;
    }

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        {siteConfig.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={siteConfig.logo} alt="Logo" className="h-8 w-8 object-contain" />
                        ) : (
                            <Globe className="h-6 w-6 text-primary" />
                        )}
                        <span className="text-xl font-bold text-primary">
                            {siteConfig.name}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {siteConfig.features.flights && (
                            <Link href="/flights" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                                <Plane className="h-4 w-4" />
                                <span>Flights</span>
                            </Link>
                        )}
                        {siteConfig.features.hotels && (
                            <Link href="/hotels" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M10 22v-6.57" /><path d="M12 11h.01" /><path d="M12 7h.01" /><path d="M14 15.43V22" /><path d="M15 16a5 5 0 0 0-6 0" /><path d="M16 11h.01" /><path d="M16 7h.01" /><path d="M8 11h.01" /><path d="M8 7h.01" /><rect x="4" y="2" width="16" height="20" rx="2" /></svg>
                                <span>Hotels</span>
                            </Link>
                        )}
                        {siteConfig.features.packages && (
                            <Link href="/packages" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                                <Package className="h-4 w-4" />
                                <span>Packages</span>
                            </Link>
                        )}
                        {siteConfig.features.trains && (
                            <Link href="/Train" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                                <Train className="h-4 w-4" />
                                <span>Trains</span>
                            </Link>
                        )}
                        {siteConfig.features.cabs && (
                            <Link href="/cabs" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                                <Car className="h-4 w-4" />
                                <span>Cabs</span>
                            </Link>
                        )}
                        {siteConfig.features.rentals && (
                            <Link href="/CarBikeRental" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                                <Car className="h-4 w-4" />
                                <span>Rentals</span>
                            </Link>
                        )}
                        {siteConfig.features.news && (
                            <Link href="/news" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                                <Globe className="h-4 w-4" />
                                <span>News</span>
                            </Link>
                        )}
                        <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
                            About Us
                        </Link>
                        <Link href="/contact" className="flex items-center space-x-1 text-sm font-medium hover:text-primary transition-colors">
                            <Phone className="h-4 w-4" />
                            <span>Contact</span>
                        </Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {session?.user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    {session.user.image ? (
                                        <img
                                            src={session.user.image}
                                            alt={session.user.name || "User"}
                                            className="h-8 w-8 rounded-full border border-border"
                                        />
                                    ) : (
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center border border-border">
                                            <User className="h-4 w-4 text-primary" />
                                        </div>
                                    )}
                                    <span className="text-sm font-medium max-w-[150px] truncate">
                                        {session.user.name?.split(" ")[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsAuthOpen(true)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-full border hover:bg-muted transition-colors text-sm font-medium"
                            >
                                <User className="h-4 w-4" />
                                <span>Sign In</span>
                            </button>
                        )}

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden border-t p-4 bg-background">
                        <nav className="flex flex-col space-y-4">
                            {siteConfig.features.flights && (
                                <Link href="/flights" className="flex items-center space-x-2 text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                    <Plane className="h-4 w-4" />
                                    <span>Flights</span>
                                </Link>
                            )}
                            {siteConfig.features.hotels && (
                                <Link href="/hotels" className="flex items-center space-x-2 text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M10 22v-6.57" /><path d="M12 11h.01" /><path d="M12 7h.01" /><path d="M14 15.43V22" /><path d="M15 16a5 5 0 0 0-6 0" /><path d="M16 11h.01" /><path d="M16 7h.01" /><path d="M8 11h.01" /><path d="M8 7h.01" /><rect x="4" y="2" width="16" height="20" rx="2" /></svg>
                                    <span>Hotels</span>
                                </Link>
                            )}
                            {siteConfig.features.packages && (
                                <Link href="/packages" className="flex items-center space-x-2 text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                    <Package className="h-4 w-4" />
                                    <span>Packages</span>
                                </Link>
                            )}
                            {siteConfig.features.trains && (
                                <Link href="/Train" className="flex items-center space-x-2 text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                    <Train className="h-4 w-4" />
                                    <span>Trains</span>
                                </Link>
                            )}
                            {siteConfig.features.cabs && (
                                <Link href="/cabs" className="flex items-center space-x-2 text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                    <Car className="h-4 w-4" />
                                    <span>Cabs</span>
                                </Link>
                            )}
                            {siteConfig.features.rentals && (
                                <Link href="/CarBikeRental" className="flex items-center space-x-2 text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                    <Car className="h-4 w-4" />
                                    <span>Rentals</span>
                                </Link>
                            )}
                            {siteConfig.features.news && (
                                <Link href="/news" className="flex items-center space-x-2 text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                    <Globe className="h-4 w-4" />
                                    <span>News</span>
                                </Link>
                            )}
                            <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                About Us
                            </Link>
                            <Link href="/contact" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                                Contact
                            </Link>
                            <hr />
                            {session?.user ? (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 px-2">
                                        {session.user.image ? (
                                            <img
                                                src={session.user.image}
                                                alt={session.user.name || "User"}
                                                className="h-8 w-8 rounded-full"
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User className="h-4 w-4 text-primary" />
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{session.user.name}</span>
                                            <span className="text-xs text-muted-foreground">{session.user.email}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left flex items-center space-x-2 text-sm font-medium text-red-500 hover:bg-muted p-2 rounded-md"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => { setIsAuthOpen(true); setIsMenuOpen(false); }}
                                    className="w-full text-left flex items-center space-x-2 text-sm font-medium hover:text-primary"
                                >
                                    <User className="h-4 w-4" />
                                    <span>Sign In</span>
                                </button>
                            )}
                        </nav>
                    </div>
                )}
            </header>

            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </>
    );
}
