import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList, Animated, Dimensions, TouchableWithoutFeedback, Easing, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useConfig } from '../context/ConfigContext';
import { Plane, Hotel, Car, Train, Home, Briefcase, Newspaper, Bike, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

interface CustomDrawerProps {
    visible: boolean;
    onClose: () => void;
}

const MENU_ITEMS = [
    { id: '1', title: 'Flights', route: 'Flights', icon: Plane },
    { id: '2', title: 'Hotels', route: 'Hotels', icon: Hotel },
    { id: '3', title: 'Cabs', route: 'Cabs', icon: Car },
    { id: '4', title: 'Rentals', route: 'Rentals', icon: Bike },
    { id: '5', title: 'Trains', route: 'Trains', icon: Train },
    { id: '6', title: 'Villas', route: 'Villas', icon: Home },
    { id: '7', title: 'Packages', route: 'Packages', icon: Briefcase },
    { id: '8', title: 'News', route: 'News', icon: Newspaper },
];

const DrawerItem = ({ item, index, visible, onClose }: { item: typeof MENU_ITEMS[0], index: number, visible: boolean, onClose: () => void }) => {
    const navigation = useNavigation<any>();
    const { themeColors } = useConfig();
    const Icon = item.icon;

    // Animated values must be created uniquely for each component instance
    const translateX = useRef(new Animated.Value(-50)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 400,
                    delay: index * 50 + 100,
                    useNativeDriver: true
                }),
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    delay: index * 50 + 100,
                    useNativeDriver: true
                })
            ]).start();
        } else {
            // Reset for next time
            translateX.setValue(-50);
            opacity.setValue(0);
        }
    }, [visible, index, translateX, opacity]);

    const handleNavigate = () => {
        onClose();
        navigation.navigate(item.route);
    };

    return (
        <Animated.View style={{ transform: [{ translateX }], opacity }}>
            <TouchableOpacity
                style={[styles.menuItem, { borderBottomColor: themeColors.border }]}
                onPress={handleNavigate}
            >
                <View style={[
                    styles.iconContainer,
                    { backgroundColor: themeColors.primary + '15' }
                ]}>
                    <Icon size={22} color={themeColors.primary} />
                </View>
                <Text style={[styles.menuText, { color: themeColors.text }]}>{item.title}</Text>

                {/* Arrow for indication */}
                <View style={{ flex: 1 }} />
            </TouchableOpacity>
        </Animated.View>
    );
};

const CustomDrawer = ({ visible, onClose }: CustomDrawerProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const { themeColors } = useConfig();

    useEffect(() => {
        if (visible) {
            setModalVisible(true);
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    easing: Easing.out(Easing.poly(4)),
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -DRAWER_WIDTH,
                    duration: 250,
                    easing: Easing.in(Easing.poly(4)),
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }),
            ]).start((finished) => {
                if (finished.finished) {
                    setModalVisible(false);
                }
            });
        }
    }, [visible]);

    const renderItem = ({ item, index }: { item: typeof MENU_ITEMS[0], index: number }) => {
        return <DrawerItem item={item} index={index} visible={visible} onClose={onClose} />;
    };

    return (
        <Modal
            transparent
            visible={modalVisible}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onClose}>
                    <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
                </TouchableWithoutFeedback>

                <Animated.View style={[
                    styles.drawer,
                    {
                        transform: [{ translateX: slideAnim }],
                        backgroundColor: themeColors.card
                    }
                ]}>
                    <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
                        <View>
                            <Text style={[styles.headerTitle, { color: themeColors.text }]}>Menu</Text>
                            <Text style={{ color: themeColors.text, opacity: 0.6, fontSize: 12 }}>Travel Planner</Text>
                        </View>
                        <TouchableOpacity onPress={onClose} style={[styles.closeBtn, { backgroundColor: themeColors.background }]}>
                            <X size={20} color={themeColors.text} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={MENU_ITEMS}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: themeColors.border }}>
                        <Text style={{ color: themeColors.text, opacity: 0.5, fontSize: 12, textAlign: 'center' }}>
                            Version 1.0.0
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    drawer: {
        width: DRAWER_WIDTH,
        height: '100%',
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        paddingTop: Platform.OS === 'ios' ? 60 : 24,
        borderBottomWidth: 1,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    closeBtn: {
        padding: 8,
        borderRadius: 20,
    },
    listContent: {
        paddingVertical: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 0.5,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    menuText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    }
});

export default CustomDrawer;
