import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';
import FlightSearchForm from '../../components/flight/FlightSearchForm';
import FlightCard from '../../components/flight/FlightCard';
import { Flight } from '../../types';
import { searchFlights } from '../../services/duffel';

const FlightsScreen = () => {
    const { themeColors } = useConfig();
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const generateMockFlights = (params: any) => {
        return [
            {
                id: 'mock-1',
                airline: 'Indigo',
                airlineCode: '6E',
                flightNumber: '254',
                departureTime: `${params.date}T08:00:00`,
                arrivalTime: `${params.date}T10:15:00`,
                from: params.from,
                to: params.to,
                duration: '2h 15m',
                stops: 0,
                price: 4500,
                currency: 'INR'
            },
            {
                id: 'mock-2',
                airline: 'Air India',
                airlineCode: 'AI',
                flightNumber: '865',
                departureTime: `${params.date}T14:30:00`,
                arrivalTime: `${params.date}T16:50:00`,
                from: params.from,
                to: params.to,
                duration: '2h 20m',
                stops: 0,
                price: 5200,
                currency: 'INR'
            },
            {
                id: 'mock-3',
                airline: 'Vistara',
                airlineCode: 'UK',
                flightNumber: '955',
                departureTime: `${params.date}T18:00:00`,
                arrivalTime: `${params.date}T22:30:00`,
                from: params.from,
                to: params.to,
                duration: '4h 30m',
                stops: 1,
                price: 4800,
                currency: 'INR'
            }
        ];
    };

    const handleSearch = async (searchParams: any) => {
        setLoading(true);
        setHasSearched(true);
        setFlights([]); // Clear previous results

        try {
            console.log("Searching flights with params:", searchParams);
            const response = await searchFlights(
                searchParams.from,
                searchParams.to,
                searchParams.date,
                searchParams.passengers,
                searchParams.cabin
            );

            if (response.data && response.data.offers && response.data.offers.length > 0) {
                // Map Duffel Offers to our Flight Type
                const mappedFlights: Flight[] = response.data.offers.map((offer: any) => {
                    const slice = offer.slices[0];
                    const segment = slice.segments[0];
                    return {
                        id: offer.id,
                        airline: offer.owner.name,
                        airlineCode: offer.owner.iata_code || 'XX',
                        flightNumber: segment.operating_carrier_flight_number || '000',
                        airlineLogo: offer.owner.logo_symbol_url,
                        departureTime: segment.departing_at,
                        arrivalTime: segment.arriving_at,
                        from: segment.origin.iata_code || segment.origin.city_name,
                        to: segment.destination.iata_code || segment.destination.city_name,
                        duration: slice.duration || '0h 0m',
                        stops: slice.segments.length - 1,
                        price: parseFloat(offer.total_amount),
                        currency: offer.total_currency,
                    };
                });
                setFlights(mappedFlights);
            } else {
                console.log("No live flights found. Using mock data.");
                setFlights(generateMockFlights(searchParams));
                Alert.alert('Demo Mode', 'No live flights found for this route on Test API. Showing demo results.');
            }
        } catch (error) {
            console.error("Flight search error:", error);
            // Fallback to mock data on error too
            setFlights(generateMockFlights(searchParams));
            Alert.alert('Demo Mode', 'API Error or Network issue. Showing demo results.');
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
                            <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, marginBottom: 20 }}>Flights</Text>
                            <FlightSearchForm onSearch={handleSearch} />
                            {hasSearched && (
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: themeColors.text, marginVertical: 16 }}>
                                    {loading ? 'Searching...' : `Found ${flights.length} Flights`}
                                </Text>
                            )}
                        </View>
                    }
                    data={flights}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <FlightCard flight={item} onPress={() => { }} />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    style={{ paddingHorizontal: 16 }}
                    ListEmptyComponent={
                        (!loading && hasSearched) ? (
                            <Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 20 }}>No flights found.</Text>
                        ) : null
                    }
                    ListFooterComponent={loading ? <ActivityIndicator size="large" color={themeColors.primary} style={{ marginTop: 20 }} /> : null}
                />
            </View>
        </ScreenLayout>
    );
};

export default FlightsScreen;
