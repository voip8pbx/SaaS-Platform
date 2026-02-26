import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not defined. Database features will be limited.');
}

async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    if (!MONGODB_URI) return null;

    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected to:", conn.connection.host);
        return conn;
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        return null;
    }
}

export default connectDB;
