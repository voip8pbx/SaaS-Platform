
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Alert,
    PermissionsAndroid
} from 'react-native';
import { useConfig } from '../../context/ConfigContext';
import Voice from '@react-native-voice/voice';
import { ArrowLeft, Send, Mic, MicOff, Bot, User } from 'lucide-react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const OPENROUTER_API_KEY = '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';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export default function AIChatScreen() {
    const { themeColors, config } = useConfig();
    const navigation = useNavigation();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        // Add initial greeting
        setMessages([
            {
                id: '1',
                text: `Hello! I'm your personal AI travel assistant for ${config.name}. How can I help you plan your trip today?`,
                sender: 'ai',
                timestamp: new Date(),
            },
        ]);

        // Setup Voice
        Voice.onSpeechStart = () => setIsListening(true);
        Voice.onSpeechEnd = () => setIsListening(false);
        Voice.onSpeechResults = (e: any) => {
            if (e.value && e.value[0]) {
                setInputText(e.value[0]);
            }
        };
        Voice.onSpeechError = (e) => {
            console.error("Speech Error: ", e);
            setIsListening(false);
            Alert.alert("Voice Error", "Could not recognize speech. Please try again.");
        };

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, [config.name]);

    const startListening = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                    {
                        title: "Microphone Permission",
                        message: "Travel Planner needs access to your microphone to accept voice commands.",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("Camera permission denied");
                    return;
                }
            }
            await Voice.start('en-US');
        } catch (e) {
            console.error(e);
            Alert.alert("Voice Error", "Could not start voice recognition. Please restart the app or check permissions.");
        }
    };

    const stopListening = async () => {
        try {
            await Voice.stop();
        } catch (e) {
            console.error(e);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const sendMessage = async () => {
        if (!inputText.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            // Call OpenRouter API
            const response = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: 'openai/gpt-3.5-turbo', // or another available model
                    messages: [
                        {
                            role: 'system',
                            content: `You are a helpful travel assistant for a travel agency named ${config.name}. Help users plan trips, find flights, hotels, and provide travel advice. Be concise and professional.`,
                        },
                        ...messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
                        { role: 'user', content: userMsg.text }
                    ],
                },
                {
                    headers: {
                        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'https://travelplanner.app', // Required by OpenRouter
                        'X-Title': 'TravelPlannerApp', // Required by OpenRouter
                    },
                }
            );

            const aiText = response.data.choices[0]?.message?.content || "I'm sorry, I couldn't understand that.";

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: aiText,
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error("AI API Error:", error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm having trouble connecting to the server. Please check your internet connection.",
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessage = ({ item }: { item: Message }) => {
        const isUser = item.sender === 'user';
        return (
            <View
                style={[
                    styles.messageContainer,
                    isUser ? styles.userMessageContainer : styles.aiMessageContainer,
                ]}
            >
                {!isUser && (
                    <View style={[styles.avatar, { backgroundColor: themeColors.primary }]}>
                        <Bot size={16} color="white" />
                    </View>
                )}
                <View
                    style={[
                        styles.bubble,
                        isUser
                            ? [styles.userBubble, { backgroundColor: themeColors.primary }]
                            : [styles.aiBubble, { backgroundColor: themeColors.card, borderColor: themeColors.border, borderWidth: 1 }],
                    ]}
                >
                    <Text
                        style={[
                            styles.messageText,
                            isUser ? { color: '#fff' } : { color: themeColors.text },
                        ]}
                    >
                        {item.text}
                    </Text>
                </View>
                {isUser && (
                    <View style={[styles.avatar, { backgroundColor: '#ccc', marginLeft: 8 }]}>
                        <User size={16} color="#555" />
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background }]}>
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: themeColors.border }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft size={24} color={themeColors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: themeColors.text }]}>AI Assistant</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Chat Area */}
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContent}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            {/* Loading Indicator */}
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color={themeColors.primary} />
                    <Text style={[styles.loadingText, { color: themeColors.text }]}>AI is typing...</Text>
                </View>
            )}

            {/* Input Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={[styles.inputContainer, { backgroundColor: themeColors.card, borderTopColor: themeColors.border }]}>
                    <TouchableOpacity
                        onPress={toggleListening}
                        style={[
                            styles.iconButton,
                            isListening && { backgroundColor: '#ffebee' } // Light red properly
                        ]}
                    >
                        {isListening ? (
                            <MicOff size={24} color="#ef4444" />
                        ) : (
                            <Mic size={24} color={themeColors.text} />
                        )}
                    </TouchableOpacity>

                    <TextInput
                        style={[styles.input, { backgroundColor: themeColors.background, color: themeColors.text }]}
                        placeholder="Type a message..."
                        placeholderTextColor="#999"
                        value={inputText}
                        onChangeText={setInputText}
                        multiline
                    />

                    <TouchableOpacity
                        onPress={sendMessage}
                        style={[styles.sendButton, { backgroundColor: themeColors.primary }]}
                        disabled={!inputText.trim() && !isLoading}
                    >
                        <Send size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    chatContent: {
        padding: 16,
        paddingBottom: 24,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        maxWidth: '85%',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
    },
    aiMessageContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    bubble: {
        padding: 12,
        borderRadius: 16,
        maxWidth: '100%',
    },
    userBubble: {
        borderBottomRightRadius: 4,
    },
    aiBubble: {
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 15,
        lineHeight: 22,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 56,
        marginBottom: 10
    },
    loadingText: {
        marginLeft: 8,
        fontSize: 12,
        fontStyle: 'italic'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderTopWidth: 1,
    },
    iconButton: {
        padding: 10,
        borderRadius: 20,
        marginRight: 8,
    },
    input: {
        flex: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        maxHeight: 100,
        minHeight: 44,
    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
});
