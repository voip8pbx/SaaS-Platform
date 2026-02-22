import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useConfig } from '../context/ConfigContext';
import { Menu, User, ShoppingBag } from 'lucide-react-native';

import CustomDrawer from './CustomDrawer';
import { AuthModal } from './auth/AuthModal';

const AppHeader = () => {
    const { config, themeColors } = useConfig();
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    const [authModalVisible, setAuthModalVisible] = React.useState(false);

    return (
        <SafeAreaView style={{ backgroundColor: themeColors.card }}>
            <CustomDrawer visible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <AuthModal visible={authModalVisible} onClose={() => setAuthModalVisible(false)} />

            <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
                <TouchableOpacity onPress={() => setIsDrawerOpen(true)}>
                    <Menu size={24} color={themeColors.text} />
                </TouchableOpacity>

                <Text style={[styles.logo, { color: themeColors.text }]}>{config.name}</Text>

                <View style={styles.rightActions}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setAuthModalVisible(true)}>
                        <User size={24} color={themeColors.text} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        ...Platform.select({
            android: {
                marginTop: StatusBar.currentHeight,
            },
        }),
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // Trying to match "font-serif"
    },
    rightActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 16,
    }
});

export default AppHeader;
