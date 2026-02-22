import React from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';
import CruiseSearchForm from '../../components/cruise/CruiseSearchForm';

const CruisesScreen = () => {
    const { themeColors } = useConfig();
    return (
        <ScreenLayout>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, marginBottom: 20 }}>Cruises</Text>
                <Text style={{ color: themeColors.text, marginBottom: 20 }}>Experience the voyage of a lifetime.</Text>
                <CruiseSearchForm />
            </View>
        </ScreenLayout>
    );
};

export default CruisesScreen;
