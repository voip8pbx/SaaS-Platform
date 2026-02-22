import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, GoogleSignin } from '@react-native-google-signin/google-signin';
import { configureGoogleSignIn, signInWithGoogle, signOutGoogle } from '../services/auth';
import axios from 'axios';
import { useConfig } from './ConfigContext';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginWithGoogle: () => Promise<boolean>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    loginWithGoogle: async () => false,
    logout: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { config } = useConfig();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        configureGoogleSignIn();
        checkCurrentUser();
    }, []);

    const checkCurrentUser = async () => {
        try {
            const currentUser = await GoogleSignin.getCurrentUser();
            if (currentUser) {
                setUser(currentUser);
            }
        } catch (error) {
            console.log("No current user", error);
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const response = await signInWithGoogle();
            if (response && response.data) {
                setUser(response.data);

                // Sync with backend
                try {
                    const API_URL = 'http://10.59.243.154:3001/api/mobile/auth';
                    await axios.post(API_URL, {
                        name: response.data.user.name,
                        email: response.data.user.email,
                        photoUrl: response.data.user.photo,
                        adminId: config.adminUserId,
                        googleId: response.data.user.id
                    });
                } catch (apiError) {
                    console.error("Backend sync failed", apiError);
                }

                return true;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
        return false;
    };

    const logout = async () => {
        setLoading(true);
        try {
            await signOutGoogle();
            setUser(null);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
