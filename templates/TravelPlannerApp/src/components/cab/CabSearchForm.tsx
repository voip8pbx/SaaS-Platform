import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, Calendar, Clock } from 'lucide-react-native';
import { useConfig } from '../../context/ConfigContext';
import PlaceAutocompleteInput from '../shared/PlaceAutocompleteInput';

const CabSearchForm = () => {
    const navigation = useNavigation<any>();
    const { themeColors } = useConfig();

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [time, setTime] = useState('10:00');

    const handleSearch = () => {
        // Mock navigation
        console.log("Searching cabs", { from, to, date, time });
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            {/* From - Autocomplete */}
            <PlaceAutocompleteInput
                label="FROM"
                placeholder="Enter origin"
                value={from}
                onValueChange={setFrom}
                containerStyle={{ marginBottom: 12, zIndex: 20 }}
            />

            {/* To - Autocomplete */}
            <PlaceAutocompleteInput
                label="TO"
                placeholder="Enter destination"
                value={to}
                onValueChange={setTo}
                containerStyle={{ marginBottom: 12, zIndex: 10 }}
            />

            {/* Date & Time */}
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
                            placeholder="YYYY-MM-DD"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>
                <View style={[styles.inputGroup, { flex: 1, borderColor: themeColors.border }]}>
                    <View style={styles.inputContainer}>
                        <View style={styles.labelRow}>
                            <Clock size={12} color="#9ca3af" />
                            <Text style={styles.label}>TIME</Text>
                        </View>
                        <TextInput
                            style={[styles.input, { color: themeColors.text }]}
                            value={time}
                            onChangeText={setTime}
                            placeholder="HH:MM"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>
            </View>

            {/* Search Button */}
            <TouchableOpacity
                style={[styles.searchButton, { backgroundColor: themeColors.primary }]}
                onPress={handleSearch}
            >
                <Search size={20} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.searchButtonText}>FIND CABS</Text>
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

export default CabSearchForm;
