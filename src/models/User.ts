import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    adminId: string; // The Admin ID this user belongs to
    name: string;
    email: string;
    contactNumber: string;
    role: 'customer' | 'agent';
    password?: string; // If handling auth
    bookings: mongoose.Types.ObjectId[]; // References to Booking model
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    adminId: { type: String, required: true, index: true }, // Index for fast lookup by tenant
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: false },
    role: { type: String, enum: ['customer', 'agent'], default: 'customer' },
    password: { type: String }, // Store hashed pw
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
}, { timestamps: true });

// Composite unique index ensures email is unique PER ADMIN (tenant isolation)
// Or global unique if that's the requirement. Usually SaaS is tenant isolated.
// For now, let's keep email unique globally to keep it simple unless specified.
UserSchema.index({ email: 1 }, { unique: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
