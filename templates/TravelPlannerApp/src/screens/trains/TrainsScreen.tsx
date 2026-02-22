import React from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';

import TrainSearchForm from '../../components/train/TrainSearchForm';

const TrainsScreen = () => {
    const { themeColors } = useConfig();
    return (
        <ScreenLayout>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, marginBottom: 20 }}>Trains</Text>
                <TrainSearchForm />
            </View>
        </ScreenLayout>
    );
};

export default TrainsScreen;
