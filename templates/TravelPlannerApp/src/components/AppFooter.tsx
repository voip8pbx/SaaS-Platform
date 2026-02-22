import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useConfig } from '../context/ConfigContext';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react-native';

const AppFooter = () => {
    const { config } = useConfig();
    const currentYear = new Date().getFullYear();

    const openLink = (url: string) => {
        if (url) Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
    };

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.brandTitle}>{config.name}</Text>
                <Text style={styles.brandDesc}>{config.description}</Text>

                <View style={styles.socialRow}>
                    <TouchableOpacity onPress={() => openLink(config.social.twitter)} style={styles.socialIcon}>
                        <Twitter size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink(config.social.facebook)} style={styles.socialIcon}>
                        <Facebook size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink(config.social.instagram)} style={styles.socialIcon}>
                        <Instagram size={20} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openLink(config.social.linkedin)} style={styles.socialIcon}>
                        <Linkedin size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact</Text>
                <View style={styles.contactItem}>
                    <Phone size={16} color="#3b82f6" />
                    <Text style={styles.contactText}>{config.contact.phone}</Text>
                </View>
                <View style={styles.contactItem}>
                    <Mail size={16} color="#3b82f6" />
                    <Text style={styles.contactText}>{config.contact.email}</Text>
                </View>
                <View style={styles.contactItem}>
                    <MapPin size={16} color="#3b82f6" />
                    <Text style={styles.contactText}>{config.contact.address}</Text>
                </View>
            </View>

            <View style={styles.divider} />
            <Text style={styles.copyright}>© {currentYear} {config.name}. All rights reserved.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0f172a', // slate-900
        padding: 24,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 24,
    },
    brandTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    brandDesc: {
        color: '#94a3b8', // slate-400
        fontSize: 14,
        marginBottom: 16,
        lineHeight: 20,
    },
    socialRow: {
        flexDirection: 'row',
        gap: 12,
    },
    socialIcon: {
        backgroundColor: '#1e293b', // slate-800
        padding: 8,
        borderRadius: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 12,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 12,
    },
    contactText: {
        color: '#94a3b8',
        fontSize: 14,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#1e293b',
        marginVertical: 16,
    },
    copyright: {
        color: '#64748b', // slate-500
        textAlign: 'center',
        fontSize: 12,
    }
});

export default AppFooter;
