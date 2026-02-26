"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle, Mail, Phone, MapPin, Twitter, Facebook, Instagram, Linkedin, FileText, Globe, Moon, Sun, Shield, ExternalLink } from 'lucide-react';
import Lottie from 'lottie-react';
import backgroundAnimation from '../asset/Background looping animation.json';

export default function AdminDashboard() {
    const [dashboardTheme, setDashboardTheme] = useState<'dark' | 'light'>('dark');
    const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'success' | 'error'>('loading');

    // State for all config (to preserve hidden fields)
    const [config, setConfig] = useState<any>({
        name: '',
        description: '',
        logo: '',
        primaryColor: '',
        theme: 'light',
        layout: 'classic',
        heroImage: '',
        adminUserId: '',
        features: {},
        contact: { phone: '', email: '', address: '' },
        social: { twitter: '', facebook: '', instagram: '', linkedin: '' },
        content: { aboutUs: '', career: '', blog: '' }
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetch(`/api/config?t=${Date.now()}`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch config');
            const data = await res.json();
            setConfig(data);
            setStatus('idle');
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const toggleDashboardTheme = () => {
        setDashboardTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('saving');

        try {
            const data = new FormData();
            // Append preserved fields
            data.append('name', config.name || '');
            data.append('description', config.description || '');
            data.append('logoPath', config.logo || '');
            data.append('primaryColor', config.primaryColor || '');
            data.append('theme', config.theme || 'light');
            data.append('layout', config.layout || 'classic');
            data.append('heroImage', config.heroImage || '');
            data.append('adminUserId', config.adminUserId || '');
            data.append('features', JSON.stringify(config.features || {}));

            // Append editable fields
            data.append('contact_phone', config.contact?.phone || '');
            data.append('contact_email', config.contact?.email || '');
            data.append('contact_address', config.contact?.address || '');

            data.append('social_twitter', config.social?.twitter || '');
            data.append('social_facebook', config.social?.facebook || '');
            data.append('social_instagram', config.social?.instagram || '');
            data.append('social_linkedin', config.social?.linkedin || '');

            data.append('content_aboutUs', config.content?.aboutUs || '');
            data.append('content_career', config.content?.career || '');
            data.append('content_blog', config.content?.blog || '');

            const response = await fetch('/api/config', {
                method: 'POST',
                body: data
            });

            if (!response.ok) throw new Error('Failed to update');

            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const updateContact = (key: string, value: string) => {
        setConfig((prev: any) => ({
            ...prev,
            contact: { ...prev.contact, [key]: value }
        }));
    };

    const updateSocial = (key: string, value: string) => {
        setConfig((prev: any) => ({
            ...prev,
            social: { ...prev.social, [key]: value }
        }));
    };

    const updateContent = (key: string, value: string) => {
        setConfig((prev: any) => ({
            ...prev,
            content: { ...prev.content, [key]: value }
        }));
    };

    if (status === 'loading') {
        return (
            <div className={`min-h-screen flex items-center justify-center ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] text-white' : 'bg-gray-50 text-gray-900'}`}>
                <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] text-white' : 'bg-gray-50 text-gray-900'} selection:bg-purple-500/30 transition-colors duration-300`}>
            {/* Floating Theme Toggle Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={toggleDashboardTheme}
                className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${dashboardTheme === 'dark'
                    ? 'bg-white/10 hover:bg-white/20 border border-white/20'
                    : 'bg-white hover:bg-gray-100 border border-gray-200 shadow-md'
                    }`}
            >
                {dashboardTheme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-purple-600" />}
            </motion.button>

            {/* Animated Lottie Background */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className={`absolute inset-0 flex items-center justify-center ${dashboardTheme === 'dark' ? 'opacity-20' : 'opacity-10'}`}>
                    <Lottie
                        animationData={backgroundAnimation}
                        loop={true}
                        autoplay={true}
                        style={{ width: '100%', height: '100%', minWidth: '100vw', minHeight: '100vh', objectFit: 'cover' }}
                        className="scale-110"
                    />
                </div>
                <div className={`absolute top-[-20%] left-[-15%] w-[60%] h-[60%] rounded-full blur-[120px] ${dashboardTheme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-400/15'}`} />
                <div className={`absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] rounded-full blur-[120px] ${dashboardTheme === 'dark' ? 'bg-cyan-600/5' : 'bg-blue-400/10'}`} />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
                <header className="mb-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full mb-3 ${dashboardTheme === 'dark'
                            ? 'bg-white/5 border border-white/10'
                            : 'bg-white border border-gray-200 shadow-sm'
                            }`}
                    >
                        <Shield className={`w-3.5 h-3.5 ${dashboardTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                        <span className={`text-xs font-medium ${dashboardTheme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Admin Control Panel</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`text-4xl md:text-5xl font-bold mb-3 ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}
                    >
                        Website Content Manager
                    </motion.h1>
                    <p className={`text-sm max-w-xl mx-auto ${dashboardTheme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                        Manage your website's contact information, social media links, and page content.
                    </p>
                </header>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid gap-6"
                >
                    {/* Contact Details Section */}
                    <div className={`rounded-xl p-6 ${dashboardTheme === 'dark' ? 'bg-[#13131a] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                        <div className="flex items-center space-x-2 mb-5">
                            <div className={`p-1.5 rounded-lg ${dashboardTheme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                                <Phone className={`w-4 h-4 ${dashboardTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                            </div>
                            <h2 className={`text-lg font-semibold ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Contact Details</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Contact Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={config.contact?.phone || ''}
                                        onChange={(e) => updateContact('phone', e.target.value)}
                                        className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={config.contact?.email || ''}
                                        onChange={(e) => updateContact('email', e.target.value)}
                                        className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                        placeholder="contact@example.com"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Physical Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={config.contact?.address || ''}
                                        onChange={(e) => updateContact('address', e.target.value)}
                                        className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                        placeholder="123 Street Name, City, Country"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media Section */}
                    <div className={`rounded-xl p-6 ${dashboardTheme === 'dark' ? 'bg-[#13131a] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                        <div className="flex items-center space-x-2 mb-5">
                            <div className={`p-1.5 rounded-lg ${dashboardTheme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                                <Globe className={`w-4 h-4 ${dashboardTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                            </div>
                            <h2 className={`text-lg font-semibold ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Social Media</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>X (Twitter)</label>
                                <div className="relative">
                                    <Twitter className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={config.social?.twitter || ''}
                                        onChange={(e) => updateSocial('twitter', e.target.value)}
                                        className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                        placeholder="https://x.com/username"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Facebook</label>
                                <div className="relative">
                                    <Facebook className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={config.social?.facebook || ''}
                                        onChange={(e) => updateSocial('facebook', e.target.value)}
                                        className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                        placeholder="https://facebook.com/username"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Instagram</label>
                                <div className="relative">
                                    <Instagram className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={config.social?.instagram || ''}
                                        onChange={(e) => updateSocial('instagram', e.target.value)}
                                        className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                        placeholder="https://instagram.com/username"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>LinkedIn</label>
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        value={config.social?.linkedin || ''}
                                        onChange={(e) => updateSocial('linkedin', e.target.value)}
                                        className={`w-full rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                        placeholder="https://linkedin.com/company/username"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Pages Section */}
                    <div className={`rounded-xl p-6 ${dashboardTheme === 'dark' ? 'bg-[#13131a] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
                        <div className="flex items-center space-x-2 mb-5">
                            <div className={`p-1.5 rounded-lg ${dashboardTheme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                                <FileText className={`w-4 h-4 ${dashboardTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                            </div>
                            <h2 className={`text-lg font-semibold ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Pages Content</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>About Us</label>
                                <textarea
                                    value={config.content?.aboutUs || ''}
                                    onChange={(e) => updateContent('aboutUs', e.target.value)}
                                    className={`w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all min-h-[100px] ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                    placeholder="Write about your company here..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Career Page</label>
                                <textarea
                                    value={config.content?.career || ''}
                                    onChange={(e) => updateContent('career', e.target.value)}
                                    className={`w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all min-h-[100px] ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                    placeholder="Describe career opportunities..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Blog Page Introduction</label>
                                <textarea
                                    value={config.content?.blog || ''}
                                    onChange={(e) => updateContent('blog', e.target.value)}
                                    className={`w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all min-h-[100px] ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                                    placeholder="Welcome text for your blog..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center items-center gap-4 pt-4">
                        <a
                            href={process.env.NEXT_PUBLIC_TEMPLATE_SITE_URL || "http://localhost:3003"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold text-sm transition-all ${dashboardTheme === 'dark' ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 shadow-sm'}`}
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Preview</span>
                        </a>
                        <button
                            type="submit"
                            disabled={status === 'saving'}
                            className={`
                        flex items-center space-x-2 px-8 py-3 rounded-full font-semibold text-sm transition-all
                        ${status === 'saving'
                                    ? 'bg-slate-700 cursor-wait'
                                    : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105 text-white'}
                    `}
                        >
                            {status === 'saving' ? (
                                <>
                                    <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                                    <span>Saving Changes...</span>
                                </>
                            ) : status === 'success' ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Updated Successfully!</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>Save Changes</span>
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            </div >
        </div >
    );
}
