import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, Calendar, Clock, Car, Bike } from 'lucide-react-native';
import { useConfig } from '../../context/ConfigContext';
import PlaceAutocompleteInput from '../shared/PlaceAutocompleteInput';

import { RentalSearchOptions } from '../../services/rental-service';

interface RentalSearchFormProps {
    onSearch?: (options: RentalSearchOptions) => void;
}

const RentalSearchForm = ({ onSearch }: RentalSearchFormProps) => {
    const navigation = useNavigation<any>();
    const { themeColors } = useConfig();

    const [rentalType, setRentalType] = useState<'car' | 'bike'>('car');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [pickupTime, setPickupTime] = useState('10:00');
    const [dropoffTime, setDropoffTime] = useState('18:00');

    const handleSearch = () => {
        if (onSearch) {
            onSearch({
                location,
                type: rentalType,
                date
            });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>

            {/* Type Switcher */}
            <View style={styles.switcherContainer}>
                <View style={[styles.switcher, { backgroundColor: themeColors.border + '40' }]}>
                    <TouchableOpacity
                        style={[styles.switchBtn, rentalType === 'car' && { backgroundColor: themeColors.card, shadowColor: '#000', shadowOpacity: 0.1, elevation: 2 }]}
                        onPress={() => setRentalType('car')}
                    >
                        <Car size={16} color={rentalType === 'car' ? themeColors.primary : '#6b7280'} />
                        <Text style={[styles.switchText, { color: rentalType === 'car' ? themeColors.primary : '#6b7280' }]}>Car</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.switchBtn, rentalType === 'bike' && { backgroundColor: themeColors.card, shadowColor: '#000', shadowOpacity: 0.1, elevation: 2 }]}
                        onPress={() => setRentalType('bike')}
                    >
                        <Bike size={16} color={rentalType === 'bike' ? themeColors.primary : '#6b7280'} />
                        <Text style={[styles.switchText, { color: rentalType === 'bike' ? themeColors.primary : '#6b7280' }]}>Bike</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Location - Autocomplete */}
            <PlaceAutocompleteInput
                label="LOCATION"
                placeholder="Enter city or area"
                value={location}
                onValueChange={setLocation}
                containerStyle={{ marginBottom: 12, zIndex: 10 }}
            />

            {/* Date & Times */}
            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8, borderColor: themeColors.border }]}>
                    <View style={styles.inputContainer}>
                        <View style={styles.labelRow}>
                            <Calendar size={12} color="#9ca3af" />
                            <Text style={styles.label}>DATE</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { color: themeColors.text }]}
                            value={date}
                            onChangeText={setDate}
                            placeholder="Date"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>
                <View style={[styles.inputGroup, { flex: 1, borderColor: themeColors.border }]}>
                    <View style={styles.inputContainer}>
                        <View style={styles.labelRow}>
                            <Clock size={12} color="#9ca3af" />
                            <Text style={styles.label}>PICKUP</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { color: themeColors.text }]}
                            value={pickupTime}
                            onChangeText={setPickupTime}
                            placeholder="Time"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>
            </View>

            {/* Drop off */}
            <View style={[styles.inputGroup, { borderColor: themeColors.border, marginBottom: 12 }]}>
                <View style={styles.inputContainer}>
                    <View style={styles.labelRow}>
                        <Clock size={12} color="#9ca3af" />
                        <Text style={styles.label}>DROP-OFF TIME</Text>
                    </View>
                    <TextInput
                        style={[styles.input, { color: themeColors.text }]}
                        value={dropoffTime}
                        onChangeText={setDropoffTime}
                        placeholder="Time"
                        placeholderTextColor="#9ca3af"
                    />
                </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity
                style={[styles.searchButton, { backgroundColor: themeColors.primary }]}
                onPress={handleSearch}
            >
                <Search size={20} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.searchButtonText}>FIND {rentalType === 'car' ? 'CARS' : 'BIKES'}</Text>
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
    switcherContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    switcher: {
        flexDirection: 'row',
        padding: 4,
        borderRadius: 12,
    },
    switchBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        gap: 6,
    },
    switchText: {
        fontWeight: 'bold',
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

export default RentalSearchForm;
