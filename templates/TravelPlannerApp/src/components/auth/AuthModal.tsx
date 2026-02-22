import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image, Platform } from 'react-native';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react-native';
import { useConfig } from '../../context/ConfigContext';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
    visible: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose }) => {
    const { themeColors } = useConfig();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            Alert.alert(isLogin ? "Welcome Back!" : "Account Created", `You are now ${isLogin ? 'logged in' : 'registered'}.`);
            onClose();
        }, 1500);
    };

    const { loginWithGoogle } = useAuth();

    const handleGoogleSignIn = async () => {
        try {
            const success = await loginWithGoogle();
            if (success) {
                onClose();
            } else {
                Alert.alert("Sign In Failed", "Google Sign In was cancelled or failed.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "An unexpected error occurred.");
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.container, { backgroundColor: themeColors.card }]}>
                    <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                        <X size={20} color={themeColors.text} />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={[styles.title, { color: themeColors.text }]}>
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </Text>
                        <Text style={[styles.subtitle, { color: themeColors.text }]}>
                            {isLogin ? "Enter your details to access your account" : "Sign up to start your journey with us"}
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {!isLogin && (
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: themeColors.text }]}>Full Name</Text>
                                <View style={[styles.inputContainer, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
                                    <UserIcon size={20} color="#9ca3af" />
                                    <TextInput
                                        style={[styles.input, { color: themeColors.text }]}
                                        placeholder="John Doe"
                                        placeholderTextColor="#9ca3af"
                                        value={formData.name}
                                        onChangeText={t => setFormData({ ...formData, name: t })}
                                    />
                                </View>
                            </View>
                        )}

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: themeColors.text }]}>Email Address</Text>
                            <View style={[styles.inputContainer, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
                                <Mail size={20} color="#9ca3af" />
                                <TextInput
                                    style={[styles.input, { color: themeColors.text }]}
                                    placeholder="john@example.com"
                                    placeholderTextColor="#9ca3af"
                                    value={formData.email}
                                    onChangeText={t => setFormData({ ...formData, email: t })}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: themeColors.text }]}>Password</Text>
                            <View style={[styles.inputContainer, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}>
                                <Lock size={20} color="#9ca3af" />
                                <TextInput
                                    style={[styles.input, { color: themeColors.text }]}
                                    placeholder="••••••••"
                                    placeholderTextColor="#9ca3af"
                                    value={formData.password}
                                    onChangeText={t => setFormData({ ...formData, password: t })}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={loading}
                            style={[styles.submitBtn, { backgroundColor: themeColors.primary }]}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.submitBtnText}>
                                    {isLogin ? "Sign In" : "Create Account"}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={[styles.line, { backgroundColor: themeColors.border }]} />
                        <Text style={styles.orText}>Or continue with</Text>
                        <View style={[styles.line, { backgroundColor: themeColors.border }]} />
                    </View>

                    {/* Google Button */}
                    <TouchableOpacity
                        onPress={handleGoogleSignIn}
                        style={[styles.googleBtn, { backgroundColor: themeColors.background, borderColor: themeColors.border }]}
                    >
                        {/* Using a text fallback or simple View if image fails, but mimicking logic */}
                        <Image
                            source={{ uri: "https://authjs.dev/img/providers/google.svg" }}
                            style={styles.googleIcon}
                        />
                        <Text style={[styles.googleBtnText, { color: themeColors.text }]}>Google</Text>
                    </TouchableOpacity>

                    {/* Toggle */}
                    <View style={styles.footer}>
                        <Text style={{ color: themeColors.text }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                        </Text>
                        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                            <Text style={[styles.toggleText, { color: themeColors.primary }]}>
                                {isLogin ? "Sign Up" : "Sign In"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    container: {
        width: '100%',
        maxWidth: 400,
        borderRadius: 24,
        padding: 24,
        elevation: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    closeBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        zIndex: 10
    },
    header: {
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        opacity: 0.7
    },
    form: {
        gap: 16
    },
    inputGroup: {
        gap: 6
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        gap: 12
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    submitBtn: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        elevation: 2
    },
    submitBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
        gap: 12
    },
    line: {
        flex: 1,
        height: 1,
    },
    orText: {
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: '500'
    },
    googleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 12,
        gap: 12
    },
    googleIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    googleBtnText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24
    },
    toggleText: {
        fontWeight: 'bold'
    }
});
