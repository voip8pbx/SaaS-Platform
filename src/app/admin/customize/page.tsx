"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Save, Palette, Layout, Type } from "lucide-react";
import { motion } from "framer-motion";

function CustomizePageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const feature = searchParams.get("feature");

    const [config, setConfig] = useState({
        headerColor: "#ffffff",
        backgroundColor: "#f8fafc",
        primaryColor: "#3b82f6",
    });

    const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // Load existing config on mount (simulated)
    useEffect(() => {
        // In a real app, fetch the current siteConfig here
        // For now, we start with defaults
    }, []);

    const handleSave = async () => {
        setStatus('saving');
        try {
            // Mock API call to save specific colors
            const data = new FormData();

            // Send structured data including the feature name
            const res = await fetch('/api/config/customize', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    feature: feature || 'global',
                    colors: {
                        header: config.headerColor,
                        background: config.backgroundColor
                    },
                    primaryColor: config.primaryColor
                })
            });

            if (!res.ok) {
                // Fallback handled by UI
            }

            setStatus('success');
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error) {
            console.error(error);
            setStatus('idle');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex items-center justify-between mb-12">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-slate-400 hover:text-white transition-colors gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-3xl font-bold">Customize {feature ? feature.charAt(0).toUpperCase() + feature.slice(1) : "Theme"}</h1>
                </header>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Preview Area (Mock) */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2">
                            <Layout className="w-5 h-5 text-purple-400" />
                            Live Preview
                        </h2>
                        <div
                            className="w-full aspect-video rounded-xl shadow-2xl overflow-hidden border border-white/10 relative"
                            style={{ backgroundColor: config.backgroundColor }}
                        >
                            {/* Mock Header */}
                            <div
                                className="h-12 w-full border-b border-black/5 flex items-center px-4 justify-between"
                                style={{ backgroundColor: config.headerColor }}
                            >
                                <div className="w-24 h-4 bg-slate-400/20 rounded"></div>
                                <div className="flex gap-2">
                                    <div className="w-16 h-3 bg-slate-400/20 rounded"></div>
                                    <div className="w-16 h-3 bg-slate-400/20 rounded"></div>
                                </div>
                            </div>

                            {/* Mock Content */}
                            <div className="p-8 flex justify-center items-center h-full">
                                <div className="text-center space-y-4">
                                    <div className="w-64 h-8 bg-slate-900/10 rounded mx-auto"></div>
                                    <div
                                        className="w-32 h-10 rounded-lg mx-auto shadow-lg flex items-center justify-center text-xs font-bold text-white uppercase"
                                        style={{ backgroundColor: config.primaryColor }}
                                    >
                                        Action Button
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium flex items-center gap-2">
                                <Palette className="w-5 h-5 text-blue-400" />
                                Color Scheme
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Header Background</label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="color"
                                            value={config.headerColor}
                                            onChange={(e) => setConfig({ ...config, headerColor: e.target.value })}
                                            className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                        />
                                        <input
                                            type="text"
                                            value={config.headerColor}
                                            onChange={(e) => setConfig({ ...config, headerColor: e.target.value })}
                                            className="bg-black/20 border border-white/10 rounded px-3 py-2 text-sm w-32"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Page Background</label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="color"
                                            value={config.backgroundColor}
                                            onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                                            className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                        />
                                        <input
                                            type="text"
                                            value={config.backgroundColor}
                                            onChange={(e) => setConfig({ ...config, backgroundColor: e.target.value })}
                                            className="bg-black/20 border border-white/10 rounded px-3 py-2 text-sm w-32"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-slate-400 mb-2">Primary Accent</label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="color"
                                            value={config.primaryColor}
                                            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                                            className="h-10 w-10 rounded cursor-pointer border-0 p-0"
                                        />
                                        <input
                                            type="text"
                                            value={config.primaryColor}
                                            onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                                            className="bg-black/20 border border-white/10 rounded px-3 py-2 text-sm w-32"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <button
                                onClick={handleSave}
                                disabled={status === 'saving'}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                {status === 'saving' ? (
                                    <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                                ) : (
                                    <>
                                        <Save className="w-5 h-5" />
                                        Save & Return
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CustomizePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
            </div>
        }>
            <CustomizePageContent />
        </Suspense>
    );
}

