"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plane, Package, Calendar, Globe, Bot, Shield, Save, Layout, CheckCircle, Palette, Moon, Sun, Monitor, ExternalLink, Settings, Ship, Home, Train, Car, Sparkles } from 'lucide-react';
import { LayoutSelector } from './LayoutStyle/LayoutSelector';
import Lottie from 'lottie-react';
import backgroundAnimation from './asset/Background looping animation.json';

export default function SuperAdminDashboard() {
  const router = useRouter();
  const [dashboardTheme, setDashboardTheme] = useState<'dark' | 'light'>('dark');
  const [formData, setFormData] = useState({
    name: 'My Travel Site',
    description: 'The best way to plan your next adventure.',
    logo: '',
    primaryColor: '#8b5cf6',
    theme: 'light',
    layout: 'classic',
    heroImage: '',
    features: {
      flights: true,
      packages: true,
      hotels: true,
      trains: true,
      cabs: true,
      rentals: true,
      cars: false,
      aiPlanner: true,
      cruises: true,
      villas: true,
      news: true,
    }
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleDashboardTheme = () => {
    setDashboardTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt })
      });

      if (!res.ok) throw new Error('Generation failed');

      const data = await res.json();
      setFormData(prev => ({
        ...prev,
        name: data.name,
        description: data.description,
        primaryColor: data.primaryColor,
        theme: data.theme,
        layout: data.layout || 'classic',
        heroImage: data.heroImage
      }));
      setIsAiModalOpen(false);
      setAiPrompt('');
    } catch (error) {
      console.error(error);
      alert('Failed to generate configuration. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFeatureToggle = (key: keyof typeof formData.features) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: !prev.features[key]
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('saving');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('logoPath', formData.logo);
      data.append('primaryColor', formData.primaryColor);
      data.append('theme', formData.theme);
      data.append('layout', formData.layout);
      data.append('heroImage', formData.heroImage);
      data.append('features', JSON.stringify(formData.features));
      if (logoFile) {
        data.append('logoFile', logoFile);
      }

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
        title={`Switch to ${dashboardTheme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {dashboardTheme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-purple-600" />
        )}
      </motion.button>

      {/* Animated Lottie Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 flex items-center justify-center ${dashboardTheme === 'dark' ? 'opacity-20' : 'opacity-10'}`}>
          <Lottie
            animationData={backgroundAnimation}
            loop={true}
            autoplay={true}
            style={{
              width: '100%',
              height: '100%',
              minWidth: '100vw',
              minHeight: '100vh',
              objectFit: 'cover',
            }}
            className="scale-110"
          />
        </div>
        {/* Subtle gradient overlay for depth */}
        <div className={`absolute top-[-20%] left-[-15%] w-[60%] h-[60%] rounded-full blur-[120px] ${dashboardTheme === 'dark' ? 'bg-purple-600/10' : 'bg-purple-400/15'
          }`} />
        <div className={`absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] rounded-full blur-[120px] ${dashboardTheme === 'dark' ? 'bg-cyan-600/5' : 'bg-blue-400/10'
          }`} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
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
            <span className={`text-xs font-medium ${dashboardTheme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Super Analytics & Control</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold mb-3 ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Site Generator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-sm max-w-xl mx-auto ${dashboardTheme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}
          >
            Configure your Travel Planner instance based on the core template. Enable features, set identity, and deploy updates instantly.
          </motion.p>
        </header>

        {/* AI Generator Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-6 py-2.5 font-semibold text-white text-sm transition-all duration-200 bg-gradient-to-r from-purple-600 to-purple-500 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] focus:outline-none"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Generate with AI</span>
          </button>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-6"
        >
          {/* Brand Identity Section */}
          <div className={`rounded-xl p-6 ${dashboardTheme === 'dark' ? 'bg-[#13131a] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <div className="flex items-center space-x-2 mb-5">
              <div className={`p-1.5 rounded-lg ${dashboardTheme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                <Layout className={`w-4 h-4 ${dashboardTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h2 className={`text-lg font-semibold ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Brand Identity</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Website Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                  placeholder="My Travel Site"
                />
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Upload Logo</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={`w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:cursor-pointer cursor-pointer ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-slate-400 file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20' : 'bg-gray-50 border border-gray-300 text-gray-700 file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200'}`}
                  />
                  {formData.logo && !logoFile && (
                    <div className={`text-xs mt-1 ${dashboardTheme === 'dark' ? 'text-slate-600' : 'text-gray-500'}`}>Current: {formData.logo}</div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Site Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all min-h-[80px] resize-none ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
                  placeholder="The best way to plan your next adventure."
                />
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className={`rounded-xl p-6 ${dashboardTheme === 'dark' ? 'bg-[#13131a] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <div className="flex items-center space-x-2 mb-5">
              <div className={`p-1.5 rounded-lg ${dashboardTheme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                <Palette className={`w-4 h-4 ${dashboardTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h2 className={`text-lg font-semibold ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Appearance</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Primary Color */}
              <div className="space-y-2">
                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Primary Color</label>
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-lg overflow-hidden flex-shrink-0 ${dashboardTheme === 'dark' ? 'border border-white/10' : 'border-2 border-gray-300'}`}>
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="h-full w-full cursor-pointer border-0 transform scale-150"
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className={`flex-1 rounded-lg px-3 py-2 font-mono text-xs uppercase ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/5 text-white' : 'bg-gray-50 border border-gray-300 text-gray-900'}`}
                    placeholder="#8B5CF6"
                  />
                </div>
              </div>

              {/* Theme Preference */}
              <div className="space-y-2">
                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Theme Preference</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'light', icon: Sun, label: 'Light' },
                    { id: 'dark', icon: Moon, label: 'Dark' },
                    { id: 'system', icon: Monitor, label: 'System' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, theme: item.id })}
                      className={`
                        flex flex-col items-center justify-center p-3 rounded-lg border transition-all
                        ${formData.theme === item.id
                          ? 'bg-purple-500/20 border-purple-500/50 text-white'
                          : dashboardTheme === 'dark'
                            ? 'bg-[#1a1a24] border-white/5 text-slate-400 hover:bg-white/5'
                            : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'}
                      `}
                    >
                      <item.icon className="w-4 h-4 mb-1.5" />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Layout Style */}
              <div className="md:col-span-2 space-y-2">
                <label className={`text-xs font-medium uppercase tracking-wide ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-600'}`}>Layout Style</label>
                <LayoutSelector
                  currentLayout={formData.layout}
                  onChange={(id) => setFormData({ ...formData, layout: id })}
                  dashboardTheme={dashboardTheme}
                />
              </div>
            </div>
          </div>

          {/* Platform Features Section */}
          <div className={`rounded-xl p-6 ${dashboardTheme === 'dark' ? 'bg-[#13131a] border border-white/5' : 'bg-white border border-gray-200 shadow-sm'}`}>
            <div className="flex items-center space-x-2 mb-5">
              <div className={`p-1.5 rounded-lg ${dashboardTheme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                <CheckCircle className={`w-4 h-4 ${dashboardTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h2 className={`text-lg font-semibold ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Platform Features</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <FeatureCard
                icon={Plane}
                label="Flight Search"
                active={formData.features.flights}
                onClick={() => handleFeatureToggle('flights')}
                onCustomize={() => router.push('/customize?feature=flights')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Package}
                label="Holiday Packages"
                active={formData.features.packages}
                onClick={() => handleFeatureToggle('packages')}
                onCustomize={() => router.push('/customize?feature=packages')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Calendar}
                label="Hotel Search"
                active={formData.features.hotels}
                onClick={() => handleFeatureToggle('hotels')}
                onCustomize={() => router.push('/customize?feature=hotels')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Bot}
                label="AI Trip Planner"
                active={formData.features.aiPlanner}
                onClick={() => handleFeatureToggle('aiPlanner')}
                onCustomize={() => router.push('/customize?feature=ai')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Train}
                label="Train Search"
                active={formData.features.trains}
                onClick={() => handleFeatureToggle('trains')}
                onCustomize={() => router.push('/customize?feature=trains')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Car}
                label="Cab Search"
                active={formData.features.cabs}
                onClick={() => handleFeatureToggle('cabs')}
                onCustomize={() => router.push('/customize?feature=cabs')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Car}
                label="Car & Bike Rental"
                active={formData.features.rentals}
                onClick={() => handleFeatureToggle('rentals')}
                onCustomize={() => router.push('/customize?feature=rentals')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Ship}
                label="Cruise Search"
                active={formData.features.cruises}
                onClick={() => handleFeatureToggle('cruises')}
                onCustomize={() => router.push('/customize?feature=cruises')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Home}
                label="Villa Rentals"
                active={formData.features.villas}
                onClick={() => handleFeatureToggle('villas')}
                onCustomize={() => router.push('/customize?feature=villas')}
                dashboardTheme={dashboardTheme}
              />
              <FeatureCard
                icon={Globe}
                label="News"
                active={formData.features.news}
                onClick={() => handleFeatureToggle('news')}
                onCustomize={() => router.push('/customize?feature=news')}
                dashboardTheme={dashboardTheme}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-3 pt-2">
            <a
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${dashboardTheme === 'dark' ? 'bg-white/5 border border-white/10 hover:bg-white/10 text-white' : 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-900 shadow-sm'}`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Preview</span>
            </a>
            <button
              type="submit"
              disabled={status === 'saving'}
              className={`
                flex items-center space-x-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all
                ${status === 'saving'
                  ? 'bg-slate-700 cursor-wait'
                  : 'bg-gradient-to-r from-purple-600 to-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:scale-105'}
              `}
            >
              {status === 'saving' ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  <span>Deploying...</span>
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Updated!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create Website</span>
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>

      {/* AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-xl p-6 w-full max-w-md shadow-2xl relative ${dashboardTheme === 'dark' ? 'bg-[#13131a] border border-white/10' : 'bg-white border border-gray-200'}`}
          >
            <button
              onClick={() => setIsAiModalOpen(false)}
              className={`absolute top-4 right-4 text-xl ${dashboardTheme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`}
            >
              ✕
            </button>
            <div className="flex items-center space-x-3 mb-4">
              <div className={`p-2 rounded-lg ${dashboardTheme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                <Bot className={`w-5 h-5 ${dashboardTheme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h3 className={`text-xl font-bold ${dashboardTheme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AI Site Designer</h3>
            </div>
            <p className={`text-sm mb-5 ${dashboardTheme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              Describe your dream travel website (e.g., "A luxury dark-themed site for Maldives holidays"). The AI will generate the name, theme, and colors.
            </p>

            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Enter your prompt..."
              className={`w-full rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 mb-5 h-28 resize-none ${dashboardTheme === 'dark' ? 'bg-[#1a1a24] border border-white/10 text-white placeholder:text-slate-600' : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-400'}`}
              autoFocus
            />

            <button
              onClick={handleAiGenerate}
              disabled={isGenerating || !aiPrompt.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span>
                  <span>Designing...</span>
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4" />
                  <span>Generate Configuration</span>
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon: Icon, label, active, onClick, onCustomize, disabled = false, dashboardTheme = 'dark' }: any) {
  return (
    <div className={`
      group relative flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer
      ${disabled
        ? `opacity-50 cursor-not-allowed ${dashboardTheme === 'dark' ? 'border-white/5 bg-[#1a1a24]' : 'border-gray-200 bg-gray-50'}`
        : active
          ? 'border-purple-500/30 bg-purple-500/10'
          : dashboardTheme === 'dark'
            ? 'border-white/5 bg-[#1a1a24] hover:bg-white/5'
            : 'border-gray-200 bg-white hover:bg-gray-50'}\n    `}>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="flex items-center flex-1 outline-none"
      >
        <div className={`
          p-2 rounded-lg mr-3 transition-colors
          ${active
            ? 'bg-purple-500 text-white'
            : dashboardTheme === 'dark'
              ? 'bg-white/5 text-slate-400'
              : 'bg-gray-100 text-gray-600'}\n        `}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 text-left">
          <div className={`text-sm font-medium ${active ? 'text-white' : dashboardTheme === 'dark' ? 'text-slate-300' : 'text-gray-900'}`}>{label}</div>
          <div className={`text-xs mt-0.5 ${dashboardTheme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>{active ? 'Enabled' : 'Disabled'}</div>
        </div>
      </button>

      {/* Toggle indicator */}
      <div className={`
        w-9 h-5 rounded-full transition-colors flex-shrink-0
        ${active ? 'bg-purple-500' : dashboardTheme === 'dark' ? 'bg-white/10' : 'bg-gray-300'}\n      `}>
        <div className={`
          w-4 h-4 rounded-full bg-white transition-transform mt-0.5
          ${active ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'}\n        `} />
      </div>
    </div>
  );
}
