import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Dimensions, StatusBar, TextInput, Platform, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useConfig } from '../../context/ConfigContext';
import { Plane, Hotel, Train, Car, MapPin, Search, Calendar, Users, Clock, Bike, Ship, Home, ArrowRight, User } from 'lucide-react-native';
import AppFooter from '../AppFooter';
import NewsList from '../NewsList';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
import { AuthModal } from '../auth/AuthModal';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2044&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2068&auto=format&fit=crop"
];

const DESTINATIONS = [
    {
        id: 1,
        title: "Romantic Paris",
        description: "Experience the magic of the City of Love. Visit the Eiffel Tower, Louvre, and charming cafes.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Historic Kyoto",
        description: "Step back in time to ancient temples, traditional tea houses, and beautiful cherry blossoms.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Tranquil Maldives",
        description: "Relax in overwater bungalows, crystal clear waters, and white sandy beaches.",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Vibrant New York",
        description: "Immerse yourself in the energy of the Big Apple. Times Square, Central Park, and more.",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    },
];

const PACKAGES = [
    {
        id: '1',
        title: "Bali Bliss",
        location: "Bali, Indonesia",
        duration: "5 Days",
        price: 120000,
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1000",
        rating: 4.8,
    },
    {
        id: '2',
        title: "Swiss Alps Escape",
        location: "Interlaken, Switzerland",
        duration: "7 Days",
        price: 250000,
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1000",
        rating: 4.9,
    },
    {
        id: '3',
        title: "Dubai Luxury",
        location: "Dubai, UAE",
        duration: "4 Days",
        price: 85000,
        image: "https://images.unsplash.com/photo-1512453979798-5ea904ac66de?auto=format&fit=crop&q=80&w=1000",
        rating: 4.7,
    }
];

const ModernLayout = () => {
    const navigation = useNavigation<any>();
    const { config, themeColors } = useConfig();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [authModalVisible, setAuthModalVisible] = useState(false);

    // Trip Planner State
    const [tripType, setTripType] = useState('oneWay');
    const [flightFrom, setFlightFrom] = useState('DEL');
    const [flightTo, setFlightTo] = useState('BOM');
    const [flightDate, setFlightDate] = useState(new Date().toISOString().split('T')[0]);
    const [flightPassengers, setFlightPassengers] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleFlightSearch = () => {
        navigation.navigate('Flights', {
            from: flightFrom,
            to: flightTo,
            date: flightDate,
            passengers: flightPassengers,
            tripType
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: themeColors.background }}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <AuthModal visible={authModalVisible} onClose={() => setAuthModalVisible(false)} />

            {/* Floating User Profile Button */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    top: Platform.OS === 'ios' ? 50 : 40,
                    right: 20,
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 100,
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.3)',
                    // backdropFilter not supported in RN
                }}
                onPress={() => setAuthModalVisible(true)}
            >
                <User size={24} color="white" />
            </TouchableOpacity>

            {/* Fixed Hero Section (Behind ScrollView) */}
            <View style={[styles.heroContainer, { height: height * 0.6, position: 'absolute', top: 0, width: width, zIndex: 0 }]}>
                {HERO_IMAGES.map((img, index) => (
                    <Image
                        key={index}
                        source={{ uri: img }}
                        style={[
                            styles.heroImage,
                            { opacity: index === currentImageIndex ? 1 : 0 }
                        ]}
                        blurRadius={1}
                    />
                ))}
                <View style={styles.heroOverlay} />

                <View style={styles.heroContent}>
                    <Text style={styles.heroTitle}>Your Journey Awaits</Text>
                    <Text style={styles.heroSubtitle}>
                        Discover extraordinary destinations with {config.name}.
                    </Text>
                    <TouchableOpacity style={[styles.heroBtn, { backgroundColor: themeColors.primary }]} onPress={() => navigation.navigate('Flights')}>
                        <Text style={styles.heroBtnText}>Start Your Adventure</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Scrollable Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 0 }}
                style={{ flex: 1 }}
            >
                {/* Transparent Spacer to Reveal Hero */}
                <View style={{ height: height * 0.6 }} />

                {/* Main Content Sheet (Slides up over Hero) */}
                <View style={{
                    backgroundColor: themeColors.background,
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    paddingTop: 32,
                    paddingBottom: 40,
                    minHeight: height * 0.5,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 10
                }}>

                    {/* Destinations Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Explore Featured Destinations</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
                            {DESTINATIONS.map((dest) => (
                                <TouchableOpacity key={dest.id} style={[styles.destinationCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
                                    <Image source={{ uri: dest.image }} style={styles.destImage} />
                                    <View style={styles.destInfo}>
                                        <Text style={[styles.destName, { color: themeColors.text }]}>{dest.title}</Text>
                                        <Text numberOfLines={2} style={[styles.destDesc, { color: themeColors.text + '99' }]}>{dest.description}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Trip Planner Section (Horizontal Cards) */}
                    <View style={[styles.section, { backgroundColor: themeColors.card, paddingVertical: 40 }]}>
                        <View style={{ paddingHorizontal: 20, marginBottom: 25 }}>
                            <Text style={[styles.sectionTitle, { color: themeColors.text, marginLeft: 0 }]}>Plan Your Trip</Text>
                            <Text style={{ color: themeColors.text + '99' }}>Seamlessly book flights, hotels, and trains.</Text>
                        </View>

                        {/* Services Grid (Replaced ScrollView) */}
                        <View style={{ paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 15, justifyContent: 'space-between' }}>
                            {[
                                { id: 'Flights', label: 'Flights', icon: Plane, enabled: config.features.flights, c1: '#3b82f6', c2: '#2563eb' },
                                { id: 'Hotels', label: 'Hotels', icon: Hotel, enabled: config.features.hotels, c1: '#8b5cf6', c2: '#7c3aed' },
                                { id: 'Trains', label: 'Trains', icon: Train, enabled: config.features.trains, c1: '#ef4444', c2: '#dc2626' },
                                { id: 'Cabs', label: 'Cabs', icon: Car, enabled: config.features.cabs, c1: '#f59e0b', c2: '#d97706' },
                                { id: 'Rentals', label: 'Rentals', icon: Bike, enabled: config.features.rentals, c1: '#10b981', c2: '#059669' },
                                { id: 'Villas', label: 'Villas', icon: Home, enabled: config.features.villas, c1: '#ec4899', c2: '#db2777' },
                                { id: 'Cruises', label: 'Cruises', icon: Ship, enabled: config.features.cruises, c1: '#06b6d4', c2: '#0891b2' },
                            ].filter(f => f.enabled).map((item) => {
                                const Icon = item.icon;
                                const tileWidth = (width - 60 - 30) / 3; // 3 columns
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={{
                                            width: tileWidth,
                                            height: tileWidth,
                                            borderRadius: 20,
                                            overflow: 'hidden',
                                            elevation: 8,
                                            shadowColor: item.c2,
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.3,
                                            shadowRadius: 8,
                                        }}
                                        onPress={() => navigation.navigate(item.id)}
                                    >
                                        <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                                            <Defs>
                                                <LinearGradient id={`grad-${item.id}`} x1="0" y1="0" x2="1" y2="1">
                                                    <Stop offset="0" stopColor={item.c1} stopOpacity="1" />
                                                    <Stop offset="1" stopColor={item.c2} stopOpacity="1" />
                                                </LinearGradient>
                                            </Defs>
                                            <Rect x="0" y="0" width="100%" height="100%" fill={`url(#grad-${item.id})`} />
                                        </Svg>

                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                            <View style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: 25,
                                                backgroundColor: 'rgba(255,255,255,0.2)',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderWidth: 1,
                                                borderColor: 'rgba(255,255,255,0.3)'
                                            }}>
                                                <Icon color="white" size={24} />
                                            </View>
                                            <Text style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}>{item.label}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    {/* Exclusive Packages */}
                    {config.features.packages && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Exclusive Travel Packages</Text>
                                <Text style={{ color: themeColors.text + '99', marginBottom: 16, marginLeft: 20 }}>Explore our top-rated destinations.</Text>
                            </View>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
                                {PACKAGES.map((pkg) => (
                                    <TouchableOpacity key={pkg.id} style={[styles.pkgCard, { backgroundColor: themeColors.card, borderColor: themeColors.border }]} onPress={() => navigation.navigate('PackageDetails', { packageId: pkg.id })}>
                                        <Image source={{ uri: pkg.image }} style={styles.pkgImage} />
                                        <View style={styles.pkgContent}>
                                            <Text style={[styles.pkgTitle, { color: themeColors.text }]}>{pkg.title}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                                                <MapPin size={12} color="#9ca3af" />
                                                <Text style={{ fontSize: 12, color: '#6b7280', marginLeft: 4 }}>{pkg.location}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                                                <Text style={{ fontWeight: 'bold', color: themeColors.primary }}>₹{pkg.price.toLocaleString()}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#f59e0b' }}>★ {pkg.rating}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    {/* News Section */}
                    {config.features.news && (
                        <View style={{ paddingBottom: 20 }}>
                            <NewsList limit={5} />
                        </View>
                    )}

                    <AppFooter />
                </View>
            </ScrollView>

            {/* Floating AI Chat Button */}
            <TouchableOpacity
                style={styles.chatButton}
                onPress={() => navigation.navigate('AIChat')}
            >
                <LottieView
                    source={require('../../../assets/Livechatbot.json')}
                    autoPlay
                    loop
                    style={{ width: 80, height: 80 }}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    heroContainer: {
        width: width,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: '100%',
        resizeMode: 'cover',
    },
    heroOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    heroContent: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    heroSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.95)',
        textAlign: 'center',
        marginBottom: 32,
        maxWidth: 300,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    heroBtn: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
    },
    heroBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    section: {
        paddingVertical: 24,
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 4,
    },
    destinationCard: {
        width: 250,
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        elevation: 3,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    destImage: {
        width: '100%',
        height: 160,
    },
    destInfo: {
        padding: 16,
    },
    destName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    destDesc: {
        fontSize: 13,
        lineHeight: 18,
    },
    plannerCard: {
        width: 300,
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        elevation: 5,
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        justifyContent: 'space-between',
        height: 380,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 12,
    },
    iconBox: {
        padding: 12,
        borderRadius: 16,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    toggleRow: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    toggleBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    toggleText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    inputLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#94a3b8',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        fontWeight: '600',
    },
    searchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
        marginTop: 10,
    },
    searchBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    pkgCard: {
        width: 220,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        backgroundColor: 'white',
    },
    pkgImage: {
        width: '100%',
        height: 140,
    },
    pkgContent: {
        padding: 12,
    },
    pkgTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 1000,
        elevation: 10,
    }
});

export default ModernLayout;
