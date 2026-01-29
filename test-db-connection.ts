
import mongoose from 'mongoose';
import dbConnect from './src/lib/db';
import Admin from './src/models/Admin';
// Need to load environment variables from .env.local
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach((line) => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim();
                if (key && !process.env[key]) {
                    process.env[key] = value;
                }
            }
        });
    }
}

async function testConnection() {
    loadEnv();
    console.log("Checking DB Connection...");
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI not found in process.env");
        process.exit(1);
    }

    try {
        await dbConnect();
        console.log("DB Connected successfully.");

        console.log("Checking Admin Model...");
        const admins = await Admin.find({});
        console.log(`Found ${admins.length} admins.`);

        console.log("Test Passed.");
        process.exit(0);
    } catch (error) {
        console.error("Test Failed:", error);
        process.exit(1);
    }
}

testConnection();
