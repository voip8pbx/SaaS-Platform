import mongoose, { Schema, Document, Model } from 'mongoose';

export type SubscriptionPlan = 'free' | 'starter' | 'pro' | 'enterprise';
export type SubscriptionStatus = 'active' | 'inactive' | 'trial' | 'expired' | 'cancelled';

export interface ISubscription extends Document {
    adminId: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    trialEndsAt?: Date;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    paymentProvider?: string;
    paymentSubscriptionId?: string;
    seats: number;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}

const SubscriptionSchema: Schema = new Schema(
    {
        adminId: { type: String, required: true, unique: true },
        plan: {
            type: String,
            enum: ['free', 'starter', 'pro', 'enterprise'],
            default: 'free',
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'trial', 'expired', 'cancelled'],
            default: 'trial',
        },
        trialEndsAt: { type: Date },
        currentPeriodStart: { type: Date, default: Date.now },
        currentPeriodEnd: {
            type: Date,
            default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14-day trial
        },
        cancelAtPeriodEnd: { type: Boolean, default: false },
        paymentProvider: { type: String },
        paymentSubscriptionId: { type: String },
        seats: { type: Number, default: 1 },
        features: [{ type: String }],
    },
    { timestamps: true }
);

const Subscription: Model<ISubscription> =
    mongoose.models.Subscription ||
    mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;
