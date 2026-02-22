import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useConfig } from '../context/ConfigContext';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

interface ScreenLayoutProps {
    children: ReactNode;
    scrollable?: boolean;
}

const ScreenLayout = ({ children, scrollable = true }: ScreenLayoutProps) => {
    const { themeColors } = useConfig();

    return (
        <View style={[styles.container, { backgroundColor: themeColors.background }]}>
            <AppHeader />
            {scrollable ? (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                    {children}
                    <AppFooter />
                </ScrollView>
            ) : (
                <View style={[styles.container, styles.content]}>
                    {children}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
    }
});

export default ScreenLayout;
