import React, { useState } from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';
import RentalSearchForm from '../../components/rental/RentalSearchForm';
import RentalCard from '../../components/rental/RentalCard';
import { fetchRentals, RentalSearchOptions } from '../../services/rental-service';
import { RentalData } from '../../types';

const RentalsScreen = () => {
    const { themeColors } = useConfig();
    const [rentals, setRentals] = useState<RentalData[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (options: RentalSearchOptions) => {
        setLoading(true);
        setHasSearched(true);
        try {
            const results = await fetchRentals(options);
            setRentals(results);
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
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, marginBottom: 20 }}>Vehicle Rentals</Text>
                            <RentalSearchForm onSearch={handleSearch} />
                            {hasSearched && (
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: themeColors.text, marginVertical: 16 }}>
                                    {loading ? 'Finding vehicles...' : `Available Vehicles (${rentals.length})`}
                                </Text>
                            )}
                        </View>
                    }
                    data={rentals}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <RentalCard rental={item} />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    style={{ paddingHorizontal: 16 }}
                    ListEmptyComponent={
                        !loading && hasSearched ? (
                            <View style={{ padding: 20, alignItems: 'center' }}>
                                <Text style={{ color: '#6b7280' }}>No rentals found in this location.</Text>
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

export default RentalsScreen;
