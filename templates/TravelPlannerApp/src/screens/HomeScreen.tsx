import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useConfig } from '../context/ConfigContext';
import ClassicLayout from '../components/Layouts/ClassicLayout';
import ModernLayout from '../components/Layouts/ModernLayout';

const HomeScreen = () => {
    const { config, loading, themeColors } = useConfig();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: themeColors.background }}>
                <ActivityIndicator size="large" color={themeColors.primary} />
            </View>
        );
    }

    if (config.layout === 'modern') return <ModernLayout key="modern" />;

    // Add other layouts here...

    return <ClassicLayout key="classic" />;
};

export default HomeScreen;
