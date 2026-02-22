import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking, Platform, ActivityIndicator } from 'react-native';
import { useConfig } from '../context/ConfigContext';
import { Calendar, ExternalLink } from 'lucide-react-native';

const API_KEY = '351f440f489f16d00f44e55c018633597dbb424e69e7f51562806eeeeb84a964';

interface NewsListProps {
    limit?: number;
    onViewAll?: () => void;
}

const NewsList = ({ limit, onViewAll }: NewsListProps) => {
    const { config, themeColors } = useConfig();
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch(`https://serpapi.com/search.json?engine=google_news&q=Travel&gl=us&hl=en&api_key=${API_KEY}`);
            const data = await response.json();

            if (data.news_results) {
                const formattedNews = data.news_results.map((item: any) => ({
                    title: item.title,
                    source: item.source?.title || item.source?.name || "Unknown Source",
                    date: item.date,
                    snippet: item.snippet,
                    link: item.link,
                    thumbnail: item.thumbnail || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                }));
                setNews(formattedNews);
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!config.features.news) return null;

    const openLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    if (loading) {
        return (
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center', height: 200 }]}>
                <ActivityIndicator size="large" color={themeColors.primary} />
                <Text style={{ marginTop: 10, color: themeColors.text }}>Loading Travel News...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                <Text style={[styles.title, { color: themeColors.text }]}>Travel News</Text>
                {onViewAll && (
                    <TouchableOpacity onPress={onViewAll}>
                        <Text style={{ color: themeColors.primary, fontWeight: 'bold', fontSize: 14 }}>More</Text>
                    </TouchableOpacity>
                )}
            </View>

            <View style={styles.list}>
                {(limit ? news.slice(0, limit) : news).map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.card, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
                        onPress={() => openLink(item.link)}
                    >
                        <Image source={{ uri: item.thumbnail }} style={styles.image} />
                        <View style={styles.content}>
                            <View style={styles.metaRow}>
                                <Text style={styles.source}>{item.source}</Text>
                                <View style={styles.dateRow}>
                                    <Calendar size={12} color="#9ca3af" />
                                    <Text style={styles.date}>{item.date}</Text>
                                </View>
                            </View>
                            <Text style={[styles.newsTitle, { color: themeColors.text }]} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.snippet} numberOfLines={2}>{item.snippet}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 16,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    list: {
        gap: 16,
    },
    card: {
        flexDirection: 'row',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        height: 120,
    },
    image: {
        width: 100,
        height: '100%',
        backgroundColor: '#e5e7eb',
    },
    content: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    source: {
        fontSize: 10,
        color: '#3b82f6',
        backgroundColor: '#eff6ff',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontWeight: '600',
    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    date: {
        fontSize: 10,
        color: '#9ca3af',
    },
    newsTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 4,
    },
    snippet: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 4,
    }
});

export default NewsList;
