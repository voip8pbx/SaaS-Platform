import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    // Sync user with SuperAdmin backend
                    const { siteConfig } = await import('@/config/siteConfig');

                    // Note: In production, use env variable for API URL or improved service discovery
                    // Using localhost mapping: 
                    // From inside docker/server to host might differ, but for local npm run dev they share network usually.
                    // If this runs on server side (Next.js), it can access localhost:3001 if on same machine.
                    const API_URL = 'http://localhost:3001/api/mobile/auth';

                    await fetch(API_URL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                            photoUrl: user.image,
                            adminId: siteConfig.adminUserId,
                            googleId: user.id
                        })
                    });

                    console.log("User synced with SuperAdmin backend:", user.email);
                } catch (error) {
                    console.error("Failed to sync user with backend:", error);
                    // We typically still allow sign in even if sync fails, or return false if strict
                }
                return true;
            }
            return true;
        },
        async session({ session, token }) {
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET || "development-secret-key",
});

export { handler as GET, handler as POST };
