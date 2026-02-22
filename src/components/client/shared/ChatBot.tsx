"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { X, MessageSquare, Compass, Plane, Hotel, Map } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SUGGESTED_QUESTIONS = [
    {
        icon: Compass,
        text: "Plan a 5-day trip to Bali",
        category: "Itinerary",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=200&auto=format&fit=crop"
    },
    {
        icon: Plane,
        text: "Find cheap flights to London next month",
        category: "Flights",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=200&auto=format&fit=crop"
    },
    {
        icon: Hotel,
        text: "Best luxury hotels in Dubai",
        category: "Hotels",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=200&auto=format&fit=crop"
    },
];

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function ChatBot() {
    // Only load the data on client side to avoid fetch issues on server
    const [animationData, setAnimationData] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hello! I'm your personal AI travel concierge. I can help you plan trips, find deals, or suggest amazing destinations. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/Livechatbot.json")
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error("Failed to load Lottie:", err));
    }, []);

    // Handle body shift
    useEffect(() => {
        const body = document.body;
        if (isOpen) {
            body.style.transition = "padding-right 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
            body.style.paddingRight = "450px";
        } else {
            body.style.paddingRight = "0px";
        }
        return () => {
            body.style.paddingRight = "0px";
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async (text: string = inputValue) => {
        if (!text.trim()) return;

        const userMessage: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const res = await fetch('/api/client/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })) })
            });

            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();
            const aiMessage: Message = { role: 'assistant', content: data.result };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting to the server. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!animationData) return null;

    return (
        <>
            {/* Lottie Trigger Button */}
            <div
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-10 z-[40] cursor-pointer hover:scale-110 transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <div className="w-42 h-42 flex items-center justify-center">
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        className="w-full h-full"
                    />
                </div>
            </div>

            {/* Backdrop & Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Transparent Backdrop to detect click outside */}
                        <div
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-transparent z-[40]"
                        />

                        {/* Drawer - Sliding from Right */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-[450px] bg-white/40 dark:bg-slate-950/60 backdrop-blur-3xl shadow-2xl z-[50] flex flex-col border-l border-white/20 dark:border-slate-800/50 overflow-hidden"
                        >
                            {/* Gradient Overlay using Primary Color */}
                            <div
                                className="absolute inset-0 z-0 opacity-40 dark:opacity-50 pointer-events-none"
                                style={{ background: 'linear-gradient(to bottom, transparent 50%, var(--primary) 100%)' }}
                            />

                            {/* Header */}
                            <div className="relative z-10 p-6 border-b border-slate-100/50 dark:border-slate-800/50 flex justify-between items-center bg-white/50 dark:bg-slate-900/50">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        AI Travel Assistant
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Ask me anything about your trip</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                </button>
                            </div>

                            {/* Chat Content */}
                            <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-6">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                        {msg.role === 'assistant' ? null : (
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                                                <div className="text-white text-xs font-bold">YOU</div>
                                            </div>
                                        )}

                                        <div className={`text-sm leading-relaxed max-w-[85%] ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none p-4'
                                            : 'text-slate-800 dark:text-slate-100 font-playfair-extrabold text-base tracking-wide pl-0' // Custom font usage, larger size
                                            }`}
                                            // Fallback style if tailwind class not picked up immediately
                                            style={msg.role === 'assistant' ? { fontFamily: 'var(--font-playfair-extrabold)' } : {}}
                                        >
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                                            <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none p-4 w-24 flex items-center gap-1">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                )}

                                <div ref={messagesEndRef} />

                                {/* Suggested Questions (only show if no user messages yet) */}
                                {messages.length === 1 && (
                                    <div className="space-y-3 pt-4">
                                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider ml-1">Suggested Questions</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {SUGGESTED_QUESTIONS.map((q, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => handleSend(q.text)}
                                                    className="relative flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 overflow-hidden transition-all group h-20"
                                                >
                                                    {/* Background Image with Overlay */}
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-0 group-hover:opacity-100"
                                                        style={{ backgroundImage: `url('${q.image}')` }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/80 to-white/90 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-900/90 group-hover:opacity-90 transition-opacity" />

                                                    {/* Content */}
                                                    <div className="relative z-10 flex items-center gap-4 w-full">
                                                        <div className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors shadow-sm">
                                                            <q.icon className="w-5 h-5 text-slate-500 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" />
                                                        </div>
                                                        <div className="text-left">
                                                            <span className="block font-medium text-slate-700 dark:text-slate-200 text-sm group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{q.text}</span>
                                                            <span className="text-xs text-slate-400 dark:text-slate-500">{q.category}</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Input */}
                            <div className="relative z-10 p-4 border-t border-slate-100/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type your question..."
                                        disabled={isLoading}
                                        className="w-full bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 rounded-xl py-4 pl-4 pr-12 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/50 outline-none disabled:opacity-50 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={isLoading || !inputValue.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
