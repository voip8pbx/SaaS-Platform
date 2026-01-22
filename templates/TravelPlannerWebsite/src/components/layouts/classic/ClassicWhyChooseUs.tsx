"use client";

import { siteConfig } from "@/config/siteConfig";
import Lottie from "lottie-react";
import contactUsAnimation from "@/components/Assets/contact us.json";
import moneySavingAnimation from "@/components/Assets/Money Saving.json";
import callUsNowAnimation from "@/components/Assets/Call us now.json";


export function ClassicWhyChooseUs() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-100 dark:border-gray-800 transition-colors duration-300">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-serif font-bold mb-4">Why Choose {siteConfig.name}?</h2>
                <div className="w-16 h-1 bg-primary mx-auto mb-16 opacity-30"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <div className="text-center group">
                        <div className="w-62 h-62 mx-auto mb-6 flex items-center justify-center border-2 border-slate-100 dark:border-gray-800 rounded-full text-primary group-hover:border-primary transition-colors duration-500 overflow-hidden">
                            <Lottie animationData={moneySavingAnimation} loop={true} className="w-full h-full p-2" />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Best Prices</h3>
                        <p className="text-slate-500 dark:text-gray-400 font-light leading-relaxed">We guarantee the best offers with no hidden fees.</p>
                    </div>

                    <div className="text-center group">
                        <div className="w-62 h-62 mx-auto mb-6 flex items-center justify-center border-2 border-slate-100 dark:border-gray-800 rounded-full text-primary group-hover:border-primary transition-colors duration-500 overflow-hidden">
                            <Lottie animationData={contactUsAnimation} loop={true} className="w-full h-full p-2" />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Expert Support</h3>
                        <p className="text-slate-500 dark:text-gray-400 font-light leading-relaxed">Our dedicated team is here to assist you 24/7.</p>
                    </div>

                    <div className="text-center group">
                        <div className="w-62 h-62 mx-auto mb-6 flex items-center justify-center border-2 border-slate-100 dark:border-gray-800 rounded-full text-primary group-hover:border-primary transition-colors duration-500 overflow-hidden">
                            <Lottie animationData={callUsNowAnimation} loop={true} className="w-full h-full p-2" />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3">Instant Booking</h3>
                        <p className="text-slate-500 dark:text-gray-400 font-light leading-relaxed">Secure your dream vacation in just a few clicks.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
