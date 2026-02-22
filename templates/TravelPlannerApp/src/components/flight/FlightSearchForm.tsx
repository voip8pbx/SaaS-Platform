import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Plane, Calendar, User, Search, Check } from 'lucide-react-native';
import { useConfig } from '../../context/ConfigContext';

import PlaceAutocompleteInput from '../shared/PlaceAutocompleteInput';

const INDIAN_IATA_CODES: { [key: string]: string } = {
    "Agartala": "IXA", "Agatti": "AGX", "Agra": "AGR", "Ahmedabad": "AMD", "Aizawl": "AJL", "Akola": "AKD",
    "Allahabad": "IXD", "Along": "IXV", "Amritsar": "ATQ", "Aurangabad": "IXU", "Bagdogra": "IXB", "Balurghat": "RGH",
    "Bangalore": "BLR", "Bareilly": "BEK", "Belgaum": "IXG", "Bellary": "BEP", "Bhatinda": "BUP", "Bhavnagar": "BHU",
    "Bhopal": "BHO", "Bhubaneswar": "BBI", "Bhuj": "BHJ", "Bikaner": "BKB", "Bilaspur": "PAB", "Car Nicobar": "CBD",
    "Chandigarh": "IXC", "Chennai": "MAA", "Cochin": "COK", "Coimbatore": "CJB", "Cooch Behar": "COH", "Cuddapah": "CDP",
    "Daman": "NMB", "Daporijo": "DEP", "Darjeeling": "DAI", "Dehradun": "DED", "Dhanbad": "DBD", "Dibrugarh": "DIB",
    "Dimapur": "DMU", "Diu": "DIU", "Durgapur": "RDP", "Guwahati": "GAU", "Gaya": "GAY", "Goa": "GOI", "Gorakhpur": "GOP",
    "Guna": "GUX", "Gwalior": "GWL", "Hissar": "HSS", "Hubli": "HBX", "Hyderabad": "HYD", "Imphal": "IMF", "Indore": "IDR",
    "Jabalpur": "JLR", "Jagdalpur": "JGB", "Jaipur": "JAI", "Jaisalmer": "JSA", "Jamnagar": "JGA", "Jamshedpur": "IXW",
    "Jeypore": "PYB", "Jodhpur": "JDH", "Jammu": "IXJ", "Jorhat": "JRH", "Kailashahar": "IXH", "Kamalpur": "IXQ",
    "Kandla": "IXY", "Kangra": "DHM", "Kanpur": "KNU", "Keshod": "IXK", "Khajuraho": "HJR", "Khowai": "IXN", "Kolhapur": "KLH",
    "Kolkata": "CCU", "Kota": "KTU", "Kozhikode": "CCJ", "Kullu Manali": "KUU", "Latur": "LTU", "Leh": "IXL", "Lilabari": "IXI",
    "Lucknow": "LKO", "Ludhiana": "LUH", "Madurai": "IXM", "Malda": "LDA", "Mangalore": "IXE", "Mohanbari": "MOH",
    "Mumbai": "BOM", "Muzaffarnagar": "MZA", "Muzaffarpur": "MZU", "Mysore": "MYQ", "Nagpur": "NAG", "Nanded": "NDC",
    "New Delhi": "DEL", "Neyveli": "NVY", "Osmanabad": "OMN", "Pantnagar": "PGH", "Pasighat": "IXT", "Pathankot": "IXP",
    "Patna": "PAT", "Pondicherry": "PNY", "Porbandar": "PBD", "Port Blair": "IXZ", "Pune": "PNQ", "Puttaparthi": "PUT",
    "Raipur": "RPR", "Rajahmundry": "RJA", "Rajkot": "RAJ", "Rajouri": "RJI", "Ramagundam": "RMD", "Ranchi": "IXR",
    "Ratnagiri": "RTC", "Rewa": "REW", "Rourkela": "RRK", "Rupsi": "RUP", "Salem": "SXV", "Satna": "TNI", "Shillong": "SHL",
    "Shimla": "SLV", "Silchar": "IXS", "Solapur": "SSE", "Srinagar": "SXR", "Surat": "STV", "Tezpur": "TEZ", "Tezu": "TEI",
    "Thanjavur": "TJV", "Thiruvananthapuram": "TRV", "Thoothukudi": "TCR", "Tiruchirapalli": "TRZ", "Tirupati": "TIR",
    "Vadodara": "BDQ", "Varanasi": "VNS", "Vijayanagar": "VDY", "Vijayawada": "VGA", "Visakhapatnam": "VTZ", "Warangal": "WGC",
    "Zero": "ZER", "Delhi": "DEL", "Bengaluru": "BLR", "Kochi": "COK"
};

const FlightSearchForm = ({ onSearch }: { onSearch?: (params: any) => void }) => {
    const navigation = useNavigation<any>();
    const { themeColors } = useConfig();

    const [tripType, setTripType] = useState('oneWay');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [returnDate, setReturnDate] = useState('');
    const [passengers, setPassengers] = useState(1);
    const [flightClass, setFlightClass] = useState('economy');
    const [showOptions, setShowOptions] = useState(false);

    const classes = [
        { label: 'Economy', value: 'economy' },
        { label: 'Premium Economy', value: 'premium_economy' },
        { label: 'Business', value: 'business' },
        { label: 'First', value: 'first' },
    ];

    const handleSearch = () => {
        if (onSearch) {
            onSearch({
                from,
                to,
                date,
                returnDate,
                passengers,
                cabin: flightClass,
                tripType
            });
        } else {
            // Fallback or deprecated navigation
            navigation.navigate('Flights', {
                from,
                to,
                date,
                returnDate,
                passengers,
                cabin: flightClass,
                tripType
            });
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
            {/* Trip Type Tabs */}
            <View style={styles.tabRow}>
                <TouchableOpacity
                    style={[styles.tab, tripType === 'oneWay' && { backgroundColor: themeColors.primary + '20' }]}
                    onPress={() => setTripType('oneWay')}
                >
                    <View style={[styles.radio, { borderColor: tripType === 'oneWay' ? themeColors.primary : '#9ca3af' }]}>
                        {tripType === 'oneWay' && <View style={[styles.radioInner, { backgroundColor: themeColors.primary }]} />}
                    </View>
                    <Text style={[styles.tabText, { color: themeColors.text }]}>One Way</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, tripType === 'roundTrip' && { backgroundColor: themeColors.primary + '20' }]}
                    onPress={() => setTripType('roundTrip')}
                >
                    <View style={[styles.radio, { borderColor: tripType === 'roundTrip' ? themeColors.primary : '#9ca3af' }]}>
                        {tripType === 'roundTrip' && <View style={[styles.radioInner, { backgroundColor: themeColors.primary }]} />}
                    </View>
                    <Text style={[styles.tabText, { color: themeColors.text }]}>Round Trip</Text>
                </TouchableOpacity>
            </View>

            {/* From / To */}
            <PlaceAutocompleteInput
                label="FROM"
                placeholder="City or Airport"
                value={from}
                onValueChange={setFrom}
                mode="static"
                staticData={INDIAN_IATA_CODES}
                containerStyle={{ marginBottom: 12, zIndex: 20 }}
            />

            <PlaceAutocompleteInput
                label="TO"
                placeholder="City or Airport"
                value={to}
                onValueChange={setTo}
                mode="static"
                staticData={INDIAN_IATA_CODES}
                containerStyle={{ marginBottom: 12, zIndex: 10 }}
            />

            {/* Dates */}
            <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8, borderColor: themeColors.border }]}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>DEPARTURE</Text>
                        <TextInput
                            style={[styles.input, { color: themeColors.text }]}
                            value={date}
                            onChangeText={setDate}
                            placeholder="YYYY-MM-DD"
                            placeholderTextColor="#9ca3af"
                        />
                    </View>
                </View>
                {tripType === 'roundTrip' && (
                    <View style={[styles.inputGroup, { flex: 1, borderColor: themeColors.border }]}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>RETURN</Text>
                            <TextInput
                                style={[styles.input, { color: themeColors.text }]}
                                value={returnDate}
                                onChangeText={setReturnDate}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#9ca3af"
                            />
                        </View>
                    </View>
                )}
            </View>

            {/* Travellers & Class */}
            <TouchableOpacity
                style={[styles.inputGroup, { borderColor: themeColors.border, padding: 12 }]}
                onPress={() => setShowOptions(!showOptions)}
            >
                <Text style={styles.label}>TRAVELLERS & CLASS</Text>
                <View style={styles.paxRow}>
                    <Text style={[styles.paxCount, { color: themeColors.text }]}>{passengers}</Text>
                    <Text style={[styles.paxLabel, { color: themeColors.text }]}>Traveller(s)</Text>
                </View>
                <Text style={styles.classLabel}>{classes.find(c => c.value === flightClass)?.label}</Text>
            </TouchableOpacity>

            {/* Options Dropdown (Expanded) */}
            {showOptions && (
                <View style={[styles.optionsContainer, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
                    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>Cabin Class</Text>
                    {classes.map((c) => (
                        <TouchableOpacity
                            key={c.value}
                            style={styles.optionRow}
                            onPress={() => setFlightClass(c.value)}
                        >
                            <View style={[styles.radio, { borderColor: flightClass === c.value ? themeColors.primary : '#9ca3af' }]}>
                                {flightClass === c.value && <View style={[styles.radioInner, { backgroundColor: themeColors.primary }]} />}
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
                            onPress={() => setPassengers(Math.min(9, passengers + 1))}
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
                <Text style={styles.searchButtonText}>SEARCH FLIGHTS</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        gap: 12,
        marginBottom: 20,
    },
    tabRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        gap: 8,
    },
    tabText: {
        fontWeight: 'bold',
        fontSize: 14,
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
    row: {
        flexDirection: 'row',
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
        marginTop: 8,
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

export default FlightSearchForm;
