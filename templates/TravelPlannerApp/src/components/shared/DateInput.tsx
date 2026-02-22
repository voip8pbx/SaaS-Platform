import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Calendar as CalendarIcon, X } from 'lucide-react-native';
import { useConfig } from '../../context/ConfigContext';

interface DateInputProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
    placeholder?: string;
    minDate?: string;
}

const DateInput = ({ label, value, onChange, placeholder = "Select Date", minDate }: DateInputProps) => {
    const { themeColors } = useConfig();
    const [showModal, setShowModal] = useState(false);

    // Format date for display if needed, but assuming ISO string YYYY-MM-DD for value
    const displayDate = value || placeholder;

    return (
        <View>
            <TouchableOpacity
                style={[styles.inputContainer, { borderColor: themeColors.border, backgroundColor: themeColors.card }]}
                onPress={() => setShowModal(true)}
            >
                <Text style={styles.label}>{label}</Text>
                <View style={styles.row}>
                    <CalendarIcon size={20} color={themeColors.text} style={{ opacity: 0.5, marginRight: 8 }} />
                    <Text style={[styles.valueText, { color: value ? themeColors.text : '#9ca3af' }]}>
                        {displayDate}
                    </Text>
                </View>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={showModal}
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.modalContent, { backgroundColor: themeColors.card }]}>
                                <View style={styles.modalHeader}>
                                    <Text style={[styles.modalTitle, { color: themeColors.text }]}>Select Date</Text>
                                    <TouchableOpacity onPress={() => setShowModal(false)}>
                                        <X size={24} color={themeColors.text} />
                                    </TouchableOpacity>
                                </View>

                                <Calendar
                                    current={value || new Date().toISOString().split('T')[0]}
                                    minDate={minDate || new Date().toISOString().split('T')[0]}
                                    onDayPress={(day: any) => {
                                        onChange(day.dateString);
                                        setShowModal(false);
                                    }}
                                    theme={{
                                        backgroundColor: themeColors.card,
                                        calendarBackground: themeColors.card,
                                        textSectionTitleColor: themeColors.text,
                                        selectedDayBackgroundColor: themeColors.primary,
                                        selectedDayTextColor: '#ffffff',
                                        todayTextColor: themeColors.primary,
                                        dayTextColor: themeColors.text,
                                        textDisabledColor: '#d9e1e8',
                                        dotColor: themeColors.primary,
                                        selectedDotColor: '#ffffff',
                                        arrowColor: themeColors.primary,
                                        monthTextColor: themeColors.text,
                                        indicatorColor: themeColors.primary,
                                        textDayFontWeight: '300',
                                        textMonthFontWeight: 'bold',
                                        textDayHeaderFontWeight: '300',
                                        textDayFontSize: 16,
                                        textMonthFontSize: 16,
                                        textDayHeaderFontSize: 16
                                    }}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#9ca3af',
        letterSpacing: 1,
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valueText: {
        fontSize: 16,
        fontWeight: 'bold',
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default DateInput;
