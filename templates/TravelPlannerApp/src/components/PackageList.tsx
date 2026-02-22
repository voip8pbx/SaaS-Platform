import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useConfig } from '../context/ConfigContext';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

const MOCK_PACKAGES = [
    {
        id: '1',
        title: 'Bali Paradise Retreat',
        location: 'Indonesia',
        duration: '5 Days / 4 Nights',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop',
        rating: 4.8,
        amenities: ['Breakfast', 'Spa', 'Transfer']
    },
    {
        id: '2',
        title: 'Swiss Alps Adventure',
        location: 'Switzerland',
        duration: '7 Days / 6 Nights',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop',
        rating: 4.9,
        amenities: ['Guided Tours', 'Hotel', 'Train']
    },
    {
        id: '3',
        title: 'Maldives Luxury Villa',
        location: 'Maldives',
        duration: '4 Days / 3 Nights',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop',
        rating: 4.9,
        amenities: ['All Inclusive', 'Seaplane', 'Water Villa']
    }
];

const PackageList = () => {
    const { config, themeColors } = useConfig();

    if (!config.features.packages) return null;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: themeColors.text }]}>Popular Packages</Text>
                <TouchableOpacity>
                    <Text style={[styles.viewAll, { color: themeColors.primary }]}>View All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {MOCK_PACKAGES.map((pkg) => (
                    <TouchableOpacity
                        key={pkg.id}
                        style={[styles.card, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
                    >
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: pkg.image }} style={styles.image} resizeMode="cover" />
                            <View style={styles.ratingBadge}>
                                <Star size={12} color="#fbbf24" fill="#fbbf24" style={{ marginRight: 4 }} />
                                <Text style={styles.ratingText}>{pkg.rating}</Text>
                            </View>
                        </View>

                        <View style={styles.content}>
                            <Text style={[styles.pkgTitle, { color: themeColors.text }]} numberOfLines={1}>{pkg.title}</Text>

                            <View style={styles.row}>
                                <MapPin size={14} color="#6b7280" />
                                <Text style={styles.locationText}>{pkg.location}</Text>
                            </View>

                            <View style={styles.row}>
                                <Clock size={14} color="#6b7280" />
                                <Text style={styles.durationText}>{pkg.duration}</Text>
                            </View>

                            <View style={styles.amenities}>
                                {pkg.amenities.map((item, index) => (
                                    <View key={index} style={styles.amenityBadge}>
                                        <Text style={styles.amenityText}>{item}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={styles.footer}>
                                <View>
                                    <Text style={styles.priceLabel}>Starting from</Text>
                                    <Text style={[styles.price, { color: themeColors.text }]}>₹ {pkg.price.toLocaleString('en-IN')}</Text>
                                </View>
                                <TouchableOpacity style={[styles.btn, { backgroundColor: themeColors.primary }]}>
                                    <ArrowRight size={20} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    viewAll: {
        fontSize: 14,
        fontWeight: '600',
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    card: {
        width: CARD_WIDTH,
        marginRight: 16,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    imageContainer: {
        height: 150,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255,255,255,0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    content: {
        padding: 16,
    },
    pkgTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        color: '#6b7280',
        fontSize: 12,
        marginLeft: 4,
    },
    durationText: {
        color: '#6b7280',
        fontSize: 12,
        marginLeft: 4,
    },
    amenities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginVertical: 12,
    },
    amenityBadge: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    amenityText: {
        fontSize: 10,
        color: '#4b5563',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    priceLabel: {
        fontSize: 10,
        color: '#6b7280',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    btn: {
        padding: 8,
        borderRadius: 20,
    }
});

export default PackageList;
