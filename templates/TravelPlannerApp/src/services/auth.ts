
import { GoogleSignin, User, statusCodes, SignInResponse } from '@react-native-google-signin/google-signin';

export const configureGoogleSignIn = () => {
    try {
        GoogleSignin.configure({
            // REPLACE with your actual Web Client ID from Google Cloud Console
            webClientId: '1087360020532-ioen42t4mgqd08864gtpge49pasmps5v.apps.googleusercontent.com',
            offlineAccess: true,
        });
    } catch (error) {
        console.error("Google Sign-In configuration error:", error);
    }
};

export const signInWithGoogle = async (): Promise<SignInResponse | null> => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        return userInfo;
    } catch (error: any) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log('User cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log('Sign in is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log('Play services not available or outdated');
        } else {
            console.error('Google Sign-In Error:', error);
        }
        return null;
    }
};

export const signOutGoogle = async () => {
    try {
        await GoogleSignin.signOut();
    } catch (error) {
        console.error('Google Sign-Out Error:', error);
    }
};
