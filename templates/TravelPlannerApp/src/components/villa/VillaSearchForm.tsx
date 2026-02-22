import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, Calendar, Users, SlidersHorizontal } from 'lucide-react-native';
import { useConfig } from '../../context/ConfigContext';
import PlaceAutocompleteInput from '../shared/PlaceAutocompleteInput';

const VillaSearchForm = () => {
    const navigation = useNavigation<any>();
    const { themeColors } = useConfig();

    const [location, setLocation] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const handleSearch = () => {
        console.log("Searching villas", { location, checkIn, checkOut, guests });
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>

            {/* Location - Autocomplete */}
            <PlaceAutocompleteInput
                label="LOCATION"
                placeholder="City, Area or Region"
                value={location}
                onValueChange={setLocation}
                containerStyle={{ marginBottom: 12, zIndex: 10 }}
            />

            {/* Check In / Out */}
            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8, borderColor: themeColors.border }]}>
                    <View style={styles.inputContainer}>
                        <View style={styles.labelRow}>
                            <Calendar size={12} color="#9ca3af" />
                            <Text style={styles.label}>CHECK-IN</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { color: themeColors.text }]}
                            value={checkIn}
                            onChangeText={setCheckIn}
                            placeholder="Date"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>
                <View style={[styles.inputGroup, { flex: 1, borderColor: themeColors.border }]}>
                    <View style={styles.inputContainer}>
                        <View style={styles.labelRow}>
                            <Calendar size={12} color="#9ca3af" />
                            <Text style={styles.label}>CHECK-OUT</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { color: themeColors.text }]}
                            value={checkOut}
                            onChangeText={setCheckOut}
                            placeholder="Date"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>
            </View>

            {/* Guests */}
            <View style={[styles.inputGroup, { borderColor: themeColors.border, marginBottom: 12 }]}>
                <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                        <Users size={12} color="#9ca3af" />
                        <Text style={styles.label}>GUESTS</Text>
                    </View>
                    <View style={styles.guestControl}>
                        <TouchableOpacity
                            onPress={() => setGuests(Math.max(1, guests - 1))}
                            style={styles.guestBtn}
                        >
                            <Text style={[styles.guestBtnText, { color: themeColors.text }]}>-</Text>
                        </TouchableOpacity>
                        <Text style={[styles.guestValue, { color: themeColors.text }]}>{guests}</Text>
                        <TouchableOpacity
                            onPress={() => setGuests(guests + 1)}
                            style={styles.guestBtn}
                        >
                            <Text style={[styles.guestBtnText, { color: themeColors.text }]}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity
                style={[styles.searchButton, { backgroundColor: themeColors.primary }]}
                onPress={handleSearch}
            >
                <Search size={20} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.searchButtonText}>SEARCH</Text>
            </TouchableOpacity>
        </View>
    );
};

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
        marginBottom: 12,
    },
    guestControl: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginTop: 4,
    },
    guestBtn: {
        padding: 4,
    },
    guestBtnText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    guestValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

export default VillaSearchForm;
