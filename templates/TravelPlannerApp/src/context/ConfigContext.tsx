import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SiteConfig } from '../types';
import { Appearance, Platform } from 'react-native';

const DEFAULT_CONFIG: SiteConfig = {
    name: 'Travel Planner',
    description: 'Plan your trip',
    logo: '',
    primaryColor: '#3b82f6',
    theme: 'light',
    layout: 'classic',
    heroImage: '',
    adminUserId: '',
    features: {
        flights: true,
        packages: true,
        hotels: true,
        trains: true,
        cabs: true,
        rentals: true,
        cars: false,
        aiPlanner: false,
        cruises: true,
        villas: true,
        news: true,
    },
    contact: { phone: '', email: '', address: '' },
    social: { twitter: '', facebook: '', instagram: '', linkedin: '' },
    content: { aboutUs: '', career: '', blog: '' },
    currency: { code: 'USD', symbol: '$' }
};

// Use your machine's local IP address for physical devices
const API_URL = 'http://10.59.243.154:3001/api/config';

interface ConfigContextType {
    config: SiteConfig;
    loading: boolean;
    error: string | null;
    refreshConfig: () => Promise<void>;
    themeColors: {
        background: string;
        text: string;
        primary: string;
        card: string;
        border: string;
    };
}

const ConfigContext = createContext<ConfigContextType>({
    config: DEFAULT_CONFIG,
    loading: false,
    error: null,
    refreshConfig: async () => { },
    themeColors: {
        background: '#ffffff',
        text: '#000000',
        primary: '#3b82f6',
        card: '#ffffff',
        border: '#e5e7eb',
    }
});

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshConfig = async () => {
        try {
            console.log('Fetching config from:', API_URL);
            const response = await axios.get(API_URL);
            if (response.data) {
                setConfig(response.data);
                setError(null);
            }
        } catch (err) {
            console.error(`Failed to fetch config from ${API_URL}:`, err);
            setError('Failed to load configuration');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshConfig();
        const interval = setInterval(refreshConfig, 10000); // Poll every 10s
        return () => clearInterval(interval);
    }, []);

    const isDark = config.theme === 'dark' || (config.theme === 'system' && Appearance.getColorScheme() === 'dark');

    const themeColors = {
        background: isDark ? (config.customColors?.background || '#111827') : '#f9fafb',
        text: isDark ? '#f9fafb' : '#111827',
        primary: config.primaryColor || '#3b82f6',
        card: isDark ? '#1f2937' : '#ffffff',
        border: isDark ? '#374151' : '#e5e7eb',
    };

    return (
        <ConfigContext.Provider value={{ config, loading, error, refreshConfig, themeColors }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
