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
                // Modified to skip DB operations
                console.log("User signed in (DB disabled):", user.email);
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
