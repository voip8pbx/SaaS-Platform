import mongoose, { Schema, Model } from "mongoose";

// Define the User Interface
export interface IUser {
    name: string;
    email: string;
    phone?: string;
    password?: string; // Optional if using OAuth later
    authProvider?: string; // e.g., 'google', 'email'
    createdAt: Date;
}

// Check if model already exists to prevent overwrite error during hot-reload
const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        password: { type: String, select: false }, // Don't return password by default
        authProvider: { type: String, default: "email" },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
