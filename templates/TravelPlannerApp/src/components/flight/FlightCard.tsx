import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Plane } from 'lucide-react-native';
import { Flight, FlightLeg } from '../../types';
import { useConfig } from '../../context/ConfigContext';

interface FlightCardProps {
    flight: Flight;
    onPress: () => void;
}

const FlightCard = ({ flight, onPress }: FlightCardProps) => {
    const { themeColors } = useConfig();

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}
            onPress={onPress}
        >
            <View style={styles.content}>
                {/* Outbound */}
                <FlightLegRow data={flight} themeColors={themeColors} label="Outbound" />

                {/* Return */}
                {flight.returnLeg && (
                    <>
                        <View style={[styles.divider, { backgroundColor: themeColors.border }]} />
                        <FlightLegRow data={flight.returnLeg} themeColors={themeColors} label="Return" />
                    </>
                )}
            </View>

            {/* Price & Action */}
            <View style={[styles.footer, { borderTopColor: themeColors.border }]}>
                <View>
                    <Text style={[styles.price, { color: themeColors.text }]}>
                        {flight.currency === 'INR' ? '₹' : '$'} {flight.price.toLocaleString('en-IN')}
                    </Text>
                    <Text style={styles.perPerson}>per traveller</Text>
                </View>
                <TouchableOpacity style={[styles.bookBtn, { backgroundColor: themeColors.primary }]}>
                    <Text style={styles.bookBtnText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const FlightLegRow = ({ data, themeColors, label }: { data: Flight | FlightLeg, themeColors: any, label?: string }) => {
    // Helper to format time "HH:mm" from ISO string
    const formatTime = (isoString: string) => {
        try {
            const date = new Date(isoString);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        } catch (e) {
            return "00:00";
        }
    };

    return (
        <View style={styles.legContainer}>
            {/* Airline Info */}
            <View style={styles.airlineInfo}>
                <View style={[styles.logoContainer, { borderColor: themeColors.border }]}>
                    {/* Placeholder for Airline Logo */}
                    <Text style={[styles.airlineCode, { color: themeColors.text }]}>{data.airlineCode}</Text>
                </View>
                <View>
                    <Text style={[styles.airlineName, { color: themeColors.text }]}>{data.airline}</Text>
                    <View style={styles.codeRow}>
                        <Text style={styles.subText}>{data.airlineCode}-{data.flightNumber}</Text>
                        {label && <View style={styles.labelBadge}><Text style={styles.labelText}>{label}</Text></View>}
                    </View>
                </View>
            </View>

            {/* Flight Timing */}
            <View style={styles.timingContainer}>
                <View>
                    <Text style={[styles.timeText, { color: themeColors.text }]}>{formatTime(data.departureTime)}</Text>
                    <Text style={styles.cityText}>{data.from}</Text>
                </View>

                <View style={styles.durationCol}>
                    <Text style={styles.subText}>{data.duration}</Text>
                    <View style={styles.planeLine}>
                        <View style={[styles.line, { backgroundColor: themeColors.border }]} />
                        <Plane size={14} color={themeColors.border} style={{ marginHorizontal: 4 }} />
                        <View style={[styles.line, { backgroundColor: themeColors.border }]} />
                    </View>
                    <Text style={styles.subText}>{data.stops === 0 ? "Non-stop" : `${data.stops} Stop(s)`}</Text>
                </View>

                <View>
                    <Text style={[styles.timeText, { color: themeColors.text, textAlign: 'right' }]}>{formatTime(data.arrivalTime)}</Text>
                    <Text style={[styles.cityText, { textAlign: 'right' }]}>{data.to}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 16,
        overflow: 'hidden',
    },
    content: {
        padding: 16,
        gap: 16,
    },
    divider: {
        height: 1,
    },
    legContainer: {
        gap: 12,
    },
    airlineInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
    },
    airlineCode: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    airlineName: {
        fontWeight: 'bold',
    },
    codeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    subText: {
        fontSize: 12,
        color: '#6b7280',
    },
    labelBadge: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    labelText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#6b7280',
        textTransform: 'uppercase',
    },
    timingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cityText: {
        fontSize: 12,
        color: '#6b7280',
        fontWeight: '600',
    },
    durationCol: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 16,
    },
    planeLine: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginVertical: 4,
    },
    line: {
        height: 1,
        flex: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderTopWidth: 1,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    perPerson: {
        fontSize: 12,
        color: '#6b7280',
    },
    bookBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    bookBtnText: {
        color: 'white',
        fontWeight: 'bold',
    }
});

export default FlightCard;
