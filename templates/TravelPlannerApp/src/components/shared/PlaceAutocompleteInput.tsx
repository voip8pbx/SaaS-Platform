import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { useConfig } from '../../context/ConfigContext';

// Hardcoded for now as per user request context
const GOOGLE_MAPS_API_KEY = "AIzaSyAaJ7VzIGk_y8dvrx2b4yya119jQVZJnNs";

interface PlaceAutocompleteInputProps {
    label: string;
    placeholder: string;
    value: string;
    onValueChange: (text: string) => void;
    containerStyle?: any;
    mode?: 'google' | 'static';
    staticData?: { [key: string]: string }; // e.g. { "Mumbai": "BOM" }
}

const PlaceAutocompleteInput = ({ label, placeholder, value, onValueChange, containerStyle, mode = 'google', staticData }: PlaceAutocompleteInputProps) => {
    const { themeColors } = useConfig();
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (value.length > 1 && showSuggestions) {
                setLoading(true);
                try {
                    if (mode === 'static' && staticData) {
                        // Filter static data
                        const query = value.toLowerCase();
                        const matches = Object.keys(staticData)
                            .filter(city => city.toLowerCase().includes(query) || staticData[city].toLowerCase().includes(query))
                            .map(city => ({
                                place_id: staticData[city],
                                description: `${city} (${staticData[city]})`,
                                value: staticData[city] // The actual value we want (e.g. IATA code)
                            }))
                            .slice(0, 10);
                        setSuggestions(matches);
                    } else {
                        // Google Places Autocomplete
                        const API_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAPS_API_KEY}&input=${encodeURIComponent(value)}`;
                        // Note: Browsers/RN might block direct calls due to CORS if not configured. 
                        // But typically RN doesn't enforce CORS like browsers.
                        const res = await fetch(API_URL);
                        const data = await res.json();
                        if (data.predictions) {
                            setSuggestions(data.predictions.map((p: any) => ({
                                place_id: p.place_id,
                                description: p.description,
                                value: p.description
                            })));
                        }
                    }
                } catch (e) {
                    console.log("Failed to fetch suggestions", e);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [value, mode, staticData]);

    const handleSelect = (item: any) => {
        // If static, we might want the code (value), if google, the description
        // But for UI consistency, let's set the text input to the "value" or "description"
        // For airports, we typically want the IATA code in the input? Or City?
        // Let's assume the user wants the Value (IATA) for static, and Description for Google.
        onValueChange(item.value || item.description);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.inputContainer, { borderColor: themeColors.border, backgroundColor: themeColors.card }]}>
                <View style={styles.labelRow}>
                    <MapPin size={12} color="#9ca3af" />
                    <Text style={styles.label}>{label}</Text>
                </View>
                <TextInput
                    style={[styles.input, { color: themeColors.text }]}
                    value={value}
                    onChangeText={(text) => {
                        onValueChange(text);
                        setShowSuggestions(true);
                    }}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    onFocus={() => setShowSuggestions(true)}
                />
                {loading && <ActivityIndicator size="small" color={themeColors.primary} style={styles.loader} />}
            </View>

            {showSuggestions && suggestions.length > 0 && (
                <View style={[styles.suggestionsList, { backgroundColor: themeColors.card, borderColor: themeColors.border }]}>
                    {suggestions.map((item) => (
                        <TouchableOpacity
                            key={item.place_id}
                            style={styles.suggestionItem}
                            onPress={() => handleSelect(item)}
                        >
                            <MapPin size={14} color="#9ca3af" style={{ marginRight: 8 }} />
                            <Text style={[styles.suggestionText, { color: themeColors.text }]}>{item.description}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
    },
    inputContainer: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 12,
        position: 'relative',
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
    loader: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    suggestionsList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 4,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 20,
    },
    suggestionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    suggestionText: {
        fontSize: 14,
    }
});

export default PlaceAutocompleteInput;
