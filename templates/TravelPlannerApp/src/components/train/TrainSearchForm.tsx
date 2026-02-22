import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Train, Search } from 'lucide-react-native';
import PlaceAutocompleteInput from '../shared/PlaceAutocompleteInput';
import DateInput from '../shared/DateInput';
import { useConfig } from '../../context/ConfigContext';

const TrainSearchForm = () => {
    const navigation = useNavigation<any>();
    const { themeColors } = useConfig();

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [passengers, setPassengers] = useState(1);
    const [trainClass, setTrainClass] = useState('all');
    const [showOptions, setShowOptions] = useState(false);

    const classes = [
        { label: "All Classes", value: "all" },
        { label: "Sleeper (SL)", value: "SL" },
        { label: "AC 3 Tier (3A)", value: "3A" },
        { label: "AC 2 Tier (2A)", value: "2A" },
        { label: "AC First Class (1A)", value: "1A" },
        { label: "Chair Car (CC)", value: "CC" },
    ];

    const handleSearch = () => {
        // Mock navigation or logic
        console.log("Searching trains", { from, to, date, passengers, trainClass });
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            {/* From / To */}
            {/* From / To */}
            <View style={{ gap: 12, zIndex: 50 }}>
                <PlaceAutocompleteInput
                    label="FROM"
                    placeholder="Origin City or Station"
                    value={from}
                    onValueChange={setFrom}
                    containerStyle={{ zIndex: 50 }}
                />
                <PlaceAutocompleteInput
                    label="TO"
                    placeholder="Destination City or Station"
                    value={to}
                    onValueChange={setTo}
                    containerStyle={{ zIndex: 40 }}
                />
            </View>
            {/* Date */}
            <View style={{ marginTop: 12 }}>
                <DateInput
                    label="JOURNEY DATE"
                    value={date}
                    onChange={setDate}
                    minDate={new Date().toISOString().split('T')[0]}
                />
            </View>

            {/* Travellers & Class */}
            <TouchableOpacity
                style={[styles.inputGroup, { borderColor: themeColors.border, padding: 12, marginTop: 12 }]}
                onPress={() => setShowOptions(!showOptions)}
            >
                <Text style={styles.label}>TRAVELLERS & CLASS</Text>
                <View style={styles.paxRow}>
                    <Text style={[styles.paxCount, { color: themeColors.text }]}>{passengers}</Text>
                    <Text style={[styles.paxLabel, { color: themeColors.text }]}>Traveller(s)</Text>
                </View>
                <Text style={styles.classLabel}>{classes.find(c => c.value === trainClass)?.label}</Text>
            </TouchableOpacity>

            {/* Options Dropdown (Expanded) */}
            {showOptions && (
                <View style={[styles.optionsContainer, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Class</Text>
                    {classes.map((c) => (
                        <TouchableOpacity
                            key={c.value}
                            style={styles.optionRow}
                            onPress={() => setTrainClass(c.value)}
                        >
                            <View style={[styles.radio, { borderColor: trainClass === c.value ? themeColors.primary : '#9ca3af' }]}>
                                {trainClass === c.value && <View style={[styles.radioInner, { backgroundColor: themeColors.primary }]} />}
                            </View>
                            <Text style={[styles.optionText, { color: themeColors.text }]}>{c.label}</Text>
                        </TouchableOpacity>
                    ))}

                    <View style={[styles.divider, { backgroundColor: themeColors.border }]} />

                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Travellers</Text>
                    <View style={styles.counterRow}>
                        <TouchableOpacity
                            onPress={() => setPassengers(Math.max(1, passengers - 1))}
                            style={[styles.counterBtn, { borderColor: themeColors.border }]}
                        >
                            <Text style={[styles.counterBtnText, { color: themeColors.text }]}>-</Text>
                        </TouchableOpacity>
                        <Text style={[styles.counterValue, { color: themeColors.text }]}>{passengers}</Text>
                        <TouchableOpacity
                            onPress={() => setPassengers(Math.min(6, passengers + 1))}
                            style={[styles.counterBtn, { borderColor: themeColors.border }]}
                        >
                            <Text style={[styles.counterBtnText, { color: themeColors.text }]}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.doneBtn, { backgroundColor: themeColors.primary }]}
                        onPress={() => setShowOptions(false)}
                    >
                        <Text style={styles.doneBtnText}>Done</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Search Button */}
            <TouchableOpacity
                style={[styles.searchButton, { backgroundColor: themeColors.primary }]}
                onPress={handleSearch}
            >
                <Search size={20} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.searchButtonText}>SEARCH TRAINS</Text>
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
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9ca3af',
        letterSpacing: 1,
        marginBottom: 4,
    },
    input: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 0,
        color: '#000',
    },
    paxRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 4,
    },
    paxCount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    paxLabel: {
        fontSize: 14,
        color: '#4b5563',
    },
    classLabel: {
        fontSize: 12,
        color: '#6b7280',
        marginTop: 2,
    },
    searchButton: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    optionsContainer: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginTop: 12,
    },
    sectionTitle: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        gap: 8,
    },
    radio: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    optionText: {
        fontSize: 14,
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        padding: 4,
    },
    counterBtn: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    counterBtnText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    counterValue: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    doneBtn: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    doneBtnText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default TrainSearchForm;
