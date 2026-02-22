import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Exported for reuse in other layouts
export const PACKAGES = [
    {
        id: "PKG001",
        title: "Magical Maldives",
        location: "Maldives",
        duration: "5 Nights / 6 Days",
        price: 45000,
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
        rating: 4.8,
        reviews: 120,
        amenities: ["Flight", "Hotel", "Meals", "Transfer"]
    },
    {
        id: "PKG002",
        title: "Dubai Delight",
        location: "Dubai",
        duration: "4 Nights / 5 Days",
        price: 35000,
        image: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=2000&auto=format&fit=crop",
        rating: 4.5,
        reviews: 85,
        amenities: ["Flight", "Hotel", "Sightseeing", "Visa"]
    },
    {
        id: "PKG003",
        title: "Bali Bliss",
        location: "Bali, Indonesia",
        duration: "6 Nights / 7 Days",
        price: 55000,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop",
        rating: 4.7,
        reviews: 200,
        amenities: ["Flight", "Villa", "Breakfast", "Tours"]
    },
    {
        id: "PKG004",
        title: "Kerala Backwaters",
        location: "Kerala, India",
        duration: "3 Nights / 4 Days",
        price: 18000,
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop",
        rating: 4.6,
        reviews: 150,
        amenities: ["Houseboat", "Meals", "Transfer"]
    },
    {
        id: "PKG005",
        title: "Spectacular Singapore",
        location: "Singapore",
        duration: "4 Nights / 5 Days",
        price: 42000,
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2000&auto=format&fit=crop",
        rating: 4.7,
        reviews: 180,
        amenities: ["Flight", "Hotel", "City Tour", "Sentosa"]
    },
    {
        id: "PKG006",
        title: "Tropical Thailand",
        location: "Phuket & Bangkok",
        duration: "5 Nights / 6 Days",
        price: 38000,
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop",
        rating: 4.6,
        reviews: 220,
        amenities: ["Flight", "Beach Hotel", "Breakfast", "Island Tour"]
    },
    {
        id: "PKG007",
        title: "Shimla Serenity",
        location: "Shimla, Himachal Pradesh",
        duration: "3 Nights / 4 Days",
        price: 15000,
        image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=2000&auto=format&fit=crop",
        rating: 4.5,
        reviews: 95,
        amenities: ["Volvo Bus", "Hotel", "Sightseeing", "Meals"]
    },
    {
        id: "PKG008",
        title: "Majestic Manali",
        location: "Manali, Himachal Pradesh",
        duration: "4 Nights / 5 Days",
        price: 18500,
        image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2000&auto=format&fit=crop",
        rating: 4.8,
        reviews: 140,
        amenities: ["Volvo Bus", "Resort", "Snow Points", "Meals"]
    },
    {
        id: "PKG009",
        title: "New York Highlights",
        location: "New York, USA",
        duration: "6 Nights / 7 Days",
        price: 125000,
        image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=2000&auto=format&fit=crop",
        rating: 4.9,
        reviews: 110,
        amenities: ["Flight", "City Stay", "City Pass", "Visa Assistance"]
    },
    {
        id: "PKG010",
        title: "Parisian Dreams",
        location: "Paris, France",
        duration: "5 Nights / 6 Days",
        price: 98000,
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop",
        rating: 4.8,
        reviews: 145,
        amenities: ["Flight", "Hotel", "Eiffel Tour", "Breakfast"]
    },
    {
        id: "PKG011",
        title: "Swiss Alpine Adventure",
        location: "Zurich & Interlaken",
        duration: "6 Nights / 7 Days",
        price: 135000,
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2000&auto=format&fit=crop",
        rating: 4.9,
        reviews: 160,
        amenities: ["Flight", "Swiss Pass", "Hotel", "Scenic Train"]
    },
    {
        id: "PKG012",
        title: "London Royal Experience",
        location: "London, UK",
        duration: "5 Nights / 6 Days",
        price: 105000,
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop",
        rating: 4.7,
        reviews: 130,
        amenities: ["Flight", "Hotel", "City Pass", "Breakfast"]
    },
    {
        id: "PKG013",
        title: "Tokyo Modern & Traditional",
        location: "Tokyo, Japan",
        duration: "6 Nights / 7 Days",
        price: 115000,
        image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=2000&auto=format&fit=crop",
        rating: 4.8,
        reviews: 190,
        amenities: ["Flight", "Hotel", "Bullet Train", "Guided Tour"]
    },
    {
        id: "PKG014",
        title: "Sydney Harbour Escape",
        location: "Sydney, Australia",
        duration: "7 Nights / 8 Days",
        price: 145000,
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2000&auto=format&fit=crop",
        rating: 4.9,
        reviews: 115,
        amenities: ["Flight", "Hotel", "Opera House", "Cruise"]
    },
    {
        id: "PKG015",
        title: "Santorini Sunset Bliss",
        location: "Santorini, Greece",
        duration: "4 Nights / 5 Days",
        price: 110000,
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2000&auto=format&fit=crop",
        rating: 4.9,
        reviews: 210,
        amenities: ["Flight", "Luxury Villa", "Sunset Cruise", "Breakfast"]
    }
];

// Exported component so it can be used in Home screens
export const PackageCard = ({ item, themeColors, style }: { item: typeof PACKAGES[0], themeColors: any, style?: any }) => (
    <TouchableOpacity
        style={[styles.card, { backgroundColor: themeColors.card, borderColor: themeColors.border }, style]}
    >
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
            <View style={styles.ratingBadge}>
                <Star size={12} color="#fbbf24" fill="#fbbf24" style={{ marginRight: 4 }} />
                <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
        </View>

        <View style={styles.content}>
            <Text style={[styles.pkgTitle, { color: themeColors.text }]} numberOfLines={1}>{item.title}</Text>

            <View style={styles.row}>
                <MapPin size={14} color="#6b7280" />
                <Text style={styles.locationText}>{item.location}</Text>
            </View>

            <View style={styles.row}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.durationText}>{item.duration}</Text>
            </View>

            <View style={styles.amenities}>
                {item.amenities.map((amenity, index) => (
                    <View key={index} style={styles.amenityBadge}>
                        <Text style={styles.amenityText}>{amenity}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.footer}>
                <View>
                    <Text style={styles.priceLabel}>Starting from</Text>
                    <Text style={[styles.price, { color: themeColors.text }]}>₹ {item.price.toLocaleString('en-IN')}</Text>
                </View>
                <TouchableOpacity style={[styles.btn, { backgroundColor: themeColors.primary }]}>
                    <ArrowRight size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    </TouchableOpacity>
);

const PackagesScreen = () => {
    const { themeColors } = useConfig();

    return (
        <ScreenLayout>
            <View style={[styles.container, { backgroundColor: themeColors.background }]}>
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, { color: themeColors.text }]}>Holiday Packages</Text>
                    <Text style={styles.headerSubtitle}>Discover our handpicked holiday packages for your perfect vacation.</Text>
                </View>

                <FlatList
                    data={PACKAGES}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <PackageCard item={item} themeColors={themeColors} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6b7280',
        marginTop: 5,
    },
    listContent: {
        padding: 20,
        paddingBottom: 100, // Extra padding for safe area/bottom bars
    },
    card: {
        marginBottom: 20,
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
        height: 180,
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    locationText: {
        color: '#6b7280',
        fontSize: 13,
        marginLeft: 6,
    },
    durationText: {
        color: '#6b7280',
        fontSize: 13,
        marginLeft: 6,
    },
    amenities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginVertical: 14,
    },
    amenityBadge: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
    },
    amenityText: {
        fontSize: 11,
        color: '#4b5563',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    priceLabel: {
        fontSize: 12,
        color: '#6b7280',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    btn: {
        padding: 10,
        borderRadius: 25,
    }
});

export default PackagesScreen;
