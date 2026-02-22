import React from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';
import NewsList from '../../components/NewsList';

const NewsScreen = () => {
    const { themeColors } = useConfig();
    return (
        <ScreenLayout>
            <View style={{ paddingTop: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text, paddingHorizontal: 20, marginBottom: 10 }}>Latest News</Text>
                <NewsList />
            </View>
        </ScreenLayout>
    );
};

export default NewsScreen;
