import React from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';

import VillaSearchForm from '../../components/villa/VillaSearchForm';

const VillasScreen = () => {
    const { themeColors } = useConfig();
    return (
        <ScreenLayout>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, marginBottom: 20 }}>Villas</Text>
                <VillaSearchForm />
            </View>
        </ScreenLayout>
    );
};

export default VillasScreen;
