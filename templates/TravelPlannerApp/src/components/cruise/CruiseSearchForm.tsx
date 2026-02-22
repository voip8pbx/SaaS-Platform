
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Search, MapPin, Calendar, ChevronDown, Check } from 'lucide-react-native';
import { useConfig } from '../../context/ConfigContext';
import PlaceAutocompleteInput from '../shared/PlaceAutocompleteInput';

const CruiseSearchForm = () => {
    const navigation = useNavigation<any>();
    const { themeColors } = useConfig();

    const [destination, setDestination] = useState('');
    const [month, setMonth] = useState('');
    const [showMonthPicker, setShowMonthPicker] = useState(false);

    // Generate next 12 months
    const getMonths = () => {
        const months = [];
        const date = new Date();
        for (let i = 0; i < 12; i++) {
            const d = new Date(date.getFullYear(), date.getMonth() + i, 1);
            const monthName = d.toLocaleString('default', { month: 'long' });
            const year = d.getFullYear();
            // In RN Android, toLocaleString might behave differently depending on engine/locale
            // A safer manual approach:
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const mName = monthNames[d.getMonth()];

            months.push({
                value: `${year}-${String(d.getMonth() + 1).padStart(2, '0')}`,
                label: `${mName} ${year}`
            });
        }
        return months;
    };

    const monthOptions = getMonths();

    const handleSearch = () => {
        console.log("Searching cruises", { destination, month });
        // navigation.navigate('CruisesList', { destination, month }); // Example
    };

    const selectedMonthLabel = monthOptions.find(m => m.value === month)?.label || "Select Month";

    return (
        <View style={[styles.container, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>

            {/* Destination */}
            <View style={{ marginBottom: 16, zIndex: 50 }}>
                {/* <Text style={styles.label}>PORT DESTINATION</Text> */}
                <PlaceAutocompleteInput
                    label="PORT DESTINATION"
                    placeholder="Where do you want to go?"
                    value={destination}
                    onValueChange={setDestination}
                    containerStyle={{ zIndex: 50 }}
                />
            </View>

            {/* Month Selection */}
            <View style={[styles.inputGroup, { borderColor: themeColors.border }]}>
                <Text style={styles.label}>MONTH OF TRAVEL</Text>
                <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => setShowMonthPicker(true)}
                >
                    <View style={styles.row}>
                        <Calendar size={20} color={themeColors.text} style={{ opacity: 0.5, marginRight: 8 }} />
                        <Text style={[styles.pickerText, { color: month ? themeColors.text : '#9ca3af' }]}>
                            {selectedMonthLabel}
                        </Text>
                    </View>
                    <ChevronDown size={20} color={themeColors.text} style={{ opacity: 0.5 }} />
                </TouchableOpacity>
            </View>

            {/* Month Picker Modal */}
            <Modal
                transparent={true}
                visible={showMonthPicker}
                animationType="fade"
                onRequestClose={() => setShowMonthPicker(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowMonthPicker(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalContent, { backgroundColor: themeColors.card }]}>
                            <Text style={[styles.modalTitle, { color: themeColors.text }]}>Select Month</Text>
                            <FlatList
                                data={monthOptions}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={[
                                            styles.optionItem,
                                            { borderBottomColor: themeColors.border }
                                        ]}
                                        onPress={() => {
                                            setMonth(item.value);
                                            setShowMonthPicker(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            { color: themeColors.text, fontWeight: month === item.value ? 'bold' : 'normal' }
                                        ]}>
                                            {item.label}
                                        </Text>
                                        {month === item.value && <Check size={20} color={themeColors.primary} />}
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Search Button */}
            <TouchableOpacity
                style={[styles.searchButton, { backgroundColor: themeColors.primary }]}
                onPress={handleSearch}
            >
                <Search size={20} color="white" style={{ marginRight: 8 }} />
                <Text style={styles.searchButtonText}>FIND CRUISES</Text>
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
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9ca3af',
        letterSpacing: 1,
        marginBottom: 8,
    },
    inputGroup: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerText: {
        fontSize: 16,
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
        textTransform: 'uppercase',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        borderRadius: 16,
        padding: 16,
        maxHeight: '60%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    optionItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
    }
});

export default CruiseSearchForm;
