
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Star, MapPin, Car, Bike } from 'lucide-react-native';
import { RentalData } from '../../types';
import { useConfig } from '../../context/ConfigContext';

interface RentalCardProps {
    rental: RentalData;
}

const RentalCard = ({ rental }: RentalCardProps) => {
    const { themeColors } = useConfig();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: rental.image }}
                    style={styles.image}
                />
                <View style={styles.ratingBadge}>
                    <Star size={12} color="#fbbf24" fill="#fbbf24" style={{ marginRight: 4 }} />
                    <Text style={styles.ratingText}>{rental.rating}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.name, { color: themeColors.text }]} numberOfLines={1}>{rental.agency}</Text>
                    {rental.type === 'car' ? <Car size={20} color={themeColors.primary} /> : <Bike size={20} color={themeColors.primary} />}
                </View>

                <View style={styles.row}>
                    <MapPin size={14} color="#6b7280" />
                    <Text style={styles.address} numberOfLines={1}>{rental.address}</Text>
                </View>

                {/* Features */}
                <View style={styles.features}>
                    {rental.features.map((feature, i) => (
                        <View key={i} style={styles.featureBadge}>
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>

                <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
                    <View>
                        <Text style={styles.priceLabel}>From</Text>
                        <Text style={[styles.price, { color: themeColors.text }]}>₹ {rental.price}<Text style={styles.priceUnit}>/day</Text></Text>
                    </View>
                    <TouchableOpacity style={[styles.bookBtn, { backgroundColor: themeColors.primary }]}>
                        <Text style={styles.bookBtnText}>Book Now</Text>
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
        height: 160,
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 12,
    },
    address: {
        color: '#6b7280',
        fontSize: 12,
        flex: 1,
    },
    features: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 12,
    },
    featureBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: '#f3f4f6',
    },
    featureText: {
        fontSize: 10,
        color: '#4b5563',
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
    },
    priceLabel: {
        fontSize: 10,
        color: '#9ca3af',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceUnit: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: 'normal',
    },
    bookBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    bookBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
    }
});

export default RentalCard;
