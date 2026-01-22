"use client";

import { useState } from "react";
import { X, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    if (!isOpen) return null;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            if (isLogin) {
                // Implement Login API call here later
                console.log("Login data:", data);
                // For now just simulate delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                onClose();
            } else {
                // Register flow
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!res.ok) {
                    const result = await res.json();
                    throw new Error(result.error || "Registration failed");
                }

                // Success
                alert("Registration successful! Please login.");
                setIsLogin(true);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                >
                    <X className="w-4 h-4 text-slate-600" />
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        {isLogin
                            ? "Enter your details to access your account"
                            : "Sign up to start your journey with us"}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm mb-4 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : (isLogin ? "Sign In" : "Create Account")}
                    </button>
                </form>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-slate-400 font-medium">Or continue with</span>
                    </div>
                </div>

                <button
                    onClick={() => signIn('google')}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center space-x-2"
                >
                    <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5" />
                    <span>Google</span>
                </button>

                <div className="mt-6 text-center text-sm text-slate-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-primary font-bold hover:underline"
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
}
