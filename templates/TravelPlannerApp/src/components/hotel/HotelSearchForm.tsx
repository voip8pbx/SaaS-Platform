import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapPin, Calendar, Users, SlidersHorizontal, ArrowRight } from 'lucide-react-native';
import PlaceAutocompleteInput from '../shared/PlaceAutocompleteInput';
import DateInput from '../shared/DateInput';
import { useConfig } from '../../context/ConfigContext';

const HotelSearchForm = () => {
    const navigation = useNavigation<any>();
    const { themeColors } = useConfig();

    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [priceRange, setPriceRange] = useState(50000);
    const [showFilters, setShowFilters] = useState(false);

    const handleSearch = () => {
        navigation.navigate('Hotels', {
            location,
            checkIn,
            checkOut,
            guests,
            maxPrice: priceRange
        });
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            {/* Location */}
            <View style={{ marginBottom: 12, zIndex: 50 }}>
                <PlaceAutocompleteInput
                    label="WHERE TO?"
                    placeholder="Enter city or hotel"
                    value={location}
                    onValueChange={setLocation}
                    containerStyle={{ zIndex: 50 }}
                />
            </View>

            {/* Dates */}
            <View style={[styles.row, { marginBottom: 12 }]}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <DateInput
                        label="CHECK-IN"
                        value={checkIn}
                        onChange={setCheckIn}
                        minDate={new Date().toISOString().split('T')[0]}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <DateInput
                        label="CHECK-OUT"
                        value={checkOut}
                        onChange={setCheckOut}
                        minDate={checkIn || new Date().toISOString().split('T')[0]}
                    />
                </View>
            </View>

            {/* Filters Toggle */}
            <TouchableOpacity
                style={styles.filterToggle}
                onPress={() => setShowFilters(!showFilters)}
            >
                <SlidersHorizontal size={14} color={showFilters ? themeColors.primary : '#6b7280'} />
                <Text style={[styles.filterText, { color: showFilters ? themeColors.primary : '#6b7280' }]}>
                    Advanced Filters
                </Text>
            </TouchableOpacity>

            {/* Filters Area */}
            {showFilters && (
                <View style={[styles.filtersContainer, { borderTopColor: themeColors.border }]}>
                    <View style={styles.filterRow}>
                        <Text style={[styles.filterLabel, { color: themeColors.text }]}>Guests</Text>
                        <View style={styles.guestControl}>
                            <TouchableOpacity
                                onPress={() => setGuests(Math.max(1, guests - 1))}
                                style={[styles.guestBtn, { backgroundColor: themeColors.border }]}
                            >
                                <Text style={[styles.guestBtnText, { color: themeColors.text }]}>-</Text>
                            </TouchableOpacity>
                            <Text style={[styles.guestValue, { color: themeColors.text }]}>{guests}</Text>
                            <TouchableOpacity
                                onPress={() => setGuests(guests + 1)}
                                style={[styles.guestBtn, { backgroundColor: themeColors.border }]}
                            >
                                <Text style={[styles.guestBtnText, { color: themeColors.text }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.filterRow}>
                        <Text style={[styles.filterLabel, { color: themeColors.text }]}>Max Price</Text>
                        <Text style={[styles.priceValue, { color: themeColors.primary }]}>₹ {priceRange.toLocaleString()}</Text>
                    </View>
                    {/* Simplified Slider using styled view for MVP */}
                    <View style={styles.sliderTrack}>
                        <View style={[styles.sliderFill, { backgroundColor: themeColors.primary, width: '50%' }]} />
                        <View style={[styles.sliderThumb, { borderColor: themeColors.primary, backgroundColor: 'white', left: '50%' }]} />
                    </View>
                </View>
            )}

            {/* Search Button */}
            <TouchableOpacity
                style={[styles.searchButton, { backgroundColor: themeColors.primary }]}
                onPress={handleSearch}
            >
                <SearchIcon />
                <Text style={styles.searchButtonText}>SEARCH</Text>
            </TouchableOpacity>
        </View>
    );
};

const SearchIcon = () => (
    // Simple custom SVG or lucide icon wrapper if needed, but for now just text or generic
    <View style={{ marginRight: 8 }}>
        {/* Icon rendered via lucide-react-native usually, but just keeping clean */}
    </View>
)

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        marginBottom: 20,
    },
    inputGroup: {
        borderWidth: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    inputContainer: {
        padding: 12,
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9ca3af',
        letterSpacing: 1,
    },
    input: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 0,
    },
    row: {
        flexDirection: 'row',
    },
    filterToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    filterText: {
        fontSize: 12,
        fontWeight: '600',
    },
    filtersContainer: {
        borderTopWidth: 1,
        paddingTop: 12,
        marginBottom: 12,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    filterLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    guestControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    guestBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    guestBtnText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    guestValue: {
        fontSize: 16,
        fontWeight: 'bold',
        minWidth: 20,
        textAlign: 'center',
    },
    priceValue: {
        fontWeight: 'bold',
    },
    sliderTrack: {
        height: 4,
        backgroundColor: '#e5e7eb',
        borderRadius: 2,
        marginBottom: 8,
        position: 'relative',
    },
    sliderFill: {
        height: '100%',
        borderRadius: 2,
    },
    sliderThumb: {
        position: 'absolute',
        top: -6,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        marginLeft: -8,
        elevation: 2,
    },
    searchButton: {
        padding: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default HotelSearchForm;
