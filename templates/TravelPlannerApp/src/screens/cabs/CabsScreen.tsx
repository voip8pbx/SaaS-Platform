import React from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';

import CabSearchForm from '../../components/cab/CabSearchForm';

const CabsScreen = () => {
    const { themeColors } = useConfig();
    return (
        <ScreenLayout>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, marginBottom: 20 }}>Cabs</Text>
                <CabSearchForm />
            </View>
        </ScreenLayout>
    );
};

export default CabsScreen;
