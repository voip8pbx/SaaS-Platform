import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useConfig } from '../../context/ConfigContext';
import { Plane, Hotel, Train, Car, Briefcase, MapPin, Calendar, Users, Search, Home, Palmtree, Ship } from 'lucide-react-native';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import PackageList from '../PackageList';
import NewsList from '../NewsList';
import { PACKAGES, PackageCard } from '../../screens/packages/PackagesScreen';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

const ClassicLayout = () => {
    const navigation = useNavigation<any>(); // Add navigation
    const { config, themeColors } = useConfig();
    const [activeTab, setActiveTab] = useState('flights');

    const tabs = [
        { id: 'Flights', label: 'Flights', icon: Plane, enabled: config.features.flights },
        { id: 'Hotels', label: 'Hotels', icon: Hotel, enabled: config.features.hotels },
        { id: 'Trains', label: 'Trains', icon: Train, enabled: config.features.trains },
        { id: 'Cabs', label: 'Cabs', icon: Car, enabled: config.features.cabs },
        { id: 'Rentals', label: 'Rentals', icon: Home, enabled: config.features.rentals },
        { id: 'Villas', label: 'Villas', icon: Palmtree, enabled: config.features.villas },
        { id: 'Cruises', label: 'Cruises', icon: Ship, enabled: config.features.cruises },
    ].filter(t => t.enabled);

    const handleTabPress = (screenName: string) => {
        setActiveTab(screenName);
        navigation.navigate(screenName);
    };

    return (
        <View style={{ flex: 1, backgroundColor: themeColors.background }}>
            <AppHeader />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={{ uri: config.heroImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop' }}
                    style={styles.heroImage}
                >
                    <View style={styles.overlay}>
                        <SafeAreaView>
                            <Text style={styles.heroTitle}>{config.name}</Text>
                            <Text style={styles.heroSubtitle}>{config.description}</Text>
                        </SafeAreaView>
                    </View>
                </ImageBackground>

                <View style={[styles.searchContainer, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <TouchableOpacity
                                    key={tab.id}
                                    onPress={() => handleTabPress(tab.id)}
                                    style={styles.scrollItem}
                                >
                                    <View style={[styles.iconContainer, isActive && { backgroundColor: themeColors.primary + '20' }]}>
                                        <Icon size={24} color={isActive ? themeColors.primary : '#6b7280'} />
                                    </View>
                                    <Text style={[
                                        styles.scrollText,
                                        { color: isActive ? themeColors.primary : '#6b7280' }
                                    ]}>
                                        {tab.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* New Sections */}

                {/* Packages Section */}
                <View style={{ marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 15, alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', color: themeColors.text }}>Popular Packages</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Packages')}>
                            <Text style={{ color: themeColors.primary, fontWeight: 'bold' }}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                        {PACKAGES.slice(0, 5).map((item: any) => (
                            <PackageCard
                                key={item.id}
                                item={item}
                                themeColors={themeColors}
                                style={{ width: 300, marginRight: 15 }}
                            />
                        ))}
                    </ScrollView>
                </View>
                <NewsList limit={5} onViewAll={() => navigation.navigate('News')} />
                <AppFooter />
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
    heroImage: {
        width: '100%',
        height: 300,
        justifyContent: 'flex-end',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
        justifyContent: 'center',
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    heroSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        marginTop: 8,
    },
    searchContainer: {
        margin: 16,
        marginTop: -40,
        borderRadius: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
    },
    scrollContent: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    scrollItem: {
        alignItems: 'center',
        marginRight: 24,
        width: 60,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    scrollText: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    chatButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 1000,
        elevation: 10,
    }
});

export default ClassicLayout;
