import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmin extends Document {
    adminId: string; // Unique identifier for the Admin

    // Whitelabel Configuration (Assigned by Superadmin)
    features: {
        flights: boolean;
        hotels: boolean;
        trains: boolean;
        cabs: boolean;
        carRentals: boolean;
        bikeRentals: boolean;
        villas: boolean;
        cruises: boolean;
    };

    // Theme Configuration
    theme: {
        primaryColor: string;
        secondaryColor: string;
        mode: 'light' | 'dark';
        fontFamily: string;
        layout: string; // Add layout here
    };

    // Company Details (Filled by Admin)
    companyDetails: {
        name: string;
        logoUrl?: string;
        description?: string;
    };

    contact: {
        phone: string;
        email: string;
        address: string;
    };

    social: {
        twitter: string;
        facebook: string;
        instagram: string;
        linkedin: string;
    };

    content: {
        aboutUs: string;
        career: string;
        blog: string;
    };

    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AdminSchema: Schema = new Schema({
    adminId: { type: String, required: true, unique: true },

    features: {
        flights: { type: Boolean, default: false },
        hotels: { type: Boolean, default: false },
        trains: { type: Boolean, default: false },
        cabs: { type: Boolean, default: false },
        carRentals: { type: Boolean, default: false },
        bikeRentals: { type: Boolean, default: false },
        villas: { type: Boolean, default: false },
        cruises: { type: Boolean, default: false },
    },

    theme: {
        primaryColor: { type: String, default: '#000000' },
        secondaryColor: { type: String, default: '#ffffff' },
        mode: { type: String, enum: ['light', 'dark'], default: 'light' },
        fontFamily: { type: String, default: 'Inter' },
        layout: { type: String, default: 'classic' }, // Add layout here
    },

    companyDetails: {
        name: { type: String },
        logoUrl: { type: String },
        description: { type: String },
    },

    contact: {
        phone: { type: String },
        email: { type: String },
        address: { type: String },
    },

    social: {
        twitter: { type: String },
        facebook: { type: String },
        instagram: { type: String },
        linkedin: { type: String },
    },

    content: {
        aboutUs: { type: String },
        career: { type: String },
        blog: { type: String },
    },

    isActive: { type: Boolean, default: true },
}, { timestamps: true });

// Check if model is already compiled to avoid Hot Reload errors
const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;
