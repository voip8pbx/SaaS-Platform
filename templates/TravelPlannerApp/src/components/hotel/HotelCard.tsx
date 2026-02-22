import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Star, Wifi } from 'lucide-react-native';
import { HotelData } from '../../types';
import { useConfig } from '../../context/ConfigContext';

interface HotelCardProps {
    hotel: HotelData;
    onPress: () => void;
}

const HotelCard = ({ hotel, onPress }: HotelCardProps) => {
    const { themeColors } = useConfig();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
            onPress={onPress}
        >
            {/* Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' }}
                    style={styles.image}
                />
                <View style={styles.ratingBadge}>
                    <Star size={12} color="#fbbf24" fill="#fbbf24" style={{ marginRight: 4 }} />
                    <Text style={styles.ratingText}>{hotel.rating || 4.5} <Text style={{ fontWeight: 'normal', color: '#6b7280' }}>({hotel.user_ratings_total || 100})</Text></Text>
                </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={[styles.name, { color: themeColors.text }]} numberOfLines={1}>{hotel.name}</Text>
                <View style={styles.row}>
                    <MapPin size={14} color="#6b7280" />
                    <Text style={styles.address} numberOfLines={1}>{hotel.address}</Text>
                </View>

                {/* Amenities */}
                <View style={styles.amenities}>
                    {(hotel.amenities || ["Free Wifi", "Pool", "Spa"]).slice(0, 3).map((amenity, i) => (
                        <View key={i} style={styles.amenityBadge}>
                            {amenity === "Free Wifi" && <Wifi size={10} color="#6b7280" style={{ marginRight: 4 }} />}
                            <Text style={styles.amenityText}>{amenity}</Text>
                        </View>
                    ))}
                    {(hotel.amenities?.length || 3) > 3 && (
                        <View style={styles.amenityBadge}>
                            <Text style={styles.amenityText}>+{((hotel.amenities?.length || 3) - 3)} more</Text>
                        </View>
                    )}
                </View>

                <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
                    <View>
                        <Text style={styles.priceLabel}>Price per night</Text>
                        <View style={styles.priceRow}>
                            <Text style={[styles.price, { color: themeColors.text }]}>₹ {hotel.price?.toLocaleString()}</Text>
                            <Text style={styles.oldPrice}>₹ {Math.round(hotel.price * 1.2).toLocaleString()}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.viewBtn, { backgroundColor: themeColors.primary }]}>
                        <Text style={styles.viewBtnText}>View Details</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        marginBottom: 16,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 180,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    ratingBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(255,255,255,0.95)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1f2937',
    },
    content: {
        padding: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 4,
    },
    address: {
        color: '#6b7280',
        fontSize: 12,
        flex: 1,
    },
    amenities: {
        flexDirection: 'row',
        gap: 6,
        marginVertical: 12,
        flexWrap: 'wrap',
    },
    amenityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    amenityText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#4b5563',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingTop: 12,
        borderTopWidth: 1,
    },
    priceLabel: {
        fontSize: 10,
        color: '#9ca3af',
        marginBottom: 2,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 6,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    oldPrice: {
        fontSize: 12,
        color: '#9ca3af',
        textDecorationLine: 'line-through',
    },
    viewBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    viewBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    }
});

export default HotelCard;
