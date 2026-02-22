import React from 'react';
import { Text, View } from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import { useConfig } from '../../context/ConfigContext';

const ContactScreen = () => {
    const { themeColors, config } = useConfig();
    return (
        <ScreenLayout>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: themeColors.text }}>Contact Us</Text>

                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: themeColors.text, marginTop: 10 }}>Address</Text>
                    <Text style={{ color: themeColors.text }}>{config.contact.address}</Text>

                    <Text style={{ fontWeight: 'bold', color: themeColors.text, marginTop: 10 }}>Email</Text>
                    <Text style={{ color: themeColors.text }}>{config.contact.email}</Text>

                    <Text style={{ fontWeight: 'bold', color: themeColors.text, marginTop: 10 }}>Phone</Text>
                    <Text style={{ color: themeColors.text }}>{config.contact.phone}</Text>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default ContactScreen;
