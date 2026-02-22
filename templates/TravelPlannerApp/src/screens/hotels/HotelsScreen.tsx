import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';
import HotelSearchForm from '../../components/hotel/HotelSearchForm';
import HotelCard from '../../components/hotel/HotelCard';
import { HotelData } from '../../types';
import { fetchHotels } from '../../services/hotel-service';

const HotelsScreen = () => {
    const { themeColors } = useConfig();
    const route = useRoute<any>();
    const { location, checkIn, checkOut, guests, maxPrice } = route.params || {};

    const [hotels, setHotels] = useState<HotelData[]>([]);
    const [loading, setLoading] = useState(false);

    // Default location if none provided
    const targetLocation = location || "Mumbai";

    useEffect(() => {
        console.log("HotelsScreen mounted with params:", { targetLocation, checkIn, checkOut, maxPrice });
        loadHotels();
    }, [targetLocation]);

    const loadHotels = async () => {
        setLoading(true);
        try {
            const data = await fetchHotels(targetLocation, checkIn, checkOut);

            // Filter by price if maxPrice is set
            let filtered = data;
            if (maxPrice) {
                filtered = data.filter(h => h.price <= maxPrice);
            }

            setHotels(filtered);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenLayout scrollable={false}>
            <View style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <View style={{ padding: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, marginBottom: 20 }}>
                                Hotels in {targetLocation}
                            </Text>
                            <HotelSearchForm />
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: themeColors.text, marginVertical: 16 }}>
                                {loading ? 'Finding availability...' : `Available Hotels (${hotels.length})`}
                            </Text>
                        </View>
                    }
                    data={hotels}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <HotelCard hotel={item} onPress={() => { }} />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    style={{ paddingHorizontal: 16 }}
                    ListEmptyComponent={
                        !loading ? (
                            <View style={{ padding: 20, alignItems: 'center' }}>
                                <Text style={{ color: '#6b7280' }}>No hotels found matching your criteria.</Text>
                            </View>
                        ) : null
                    }
                    ListFooterComponent={
                        loading ? <ActivityIndicator size="large" color={themeColors.primary} style={{ marginTop: 20 }} /> : null
                    }
                />
            </View>
        </ScreenLayout>
    );
};

export default HotelsScreen;
