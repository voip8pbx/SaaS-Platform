import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
    adminId: string;
    userId: string;
    type: 'flight' | 'hotel' | 'train' | 'cab' | 'rental' | 'villa' | 'cruise' | 'package';
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    bookingRef: string;
    details: Record<string, unknown>;
    amount: number;
    currency: string;
    paymentStatus: 'unpaid' | 'paid' | 'refunded';
    passengerInfo: {
        name: string;
        email: string;
        phone?: string;
    }[];
    travelDates: {
        from: Date;
        to?: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema: Schema = new Schema(
    {
        adminId: { type: String, required: true, index: true },
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: {
            type: String,
            enum: ['flight', 'hotel', 'train', 'cab', 'rental', 'villa', 'cruise', 'package'],
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'completed'],
            default: 'pending',
        },
        bookingRef: { type: String, required: true, unique: true },
        details: { type: Schema.Types.Mixed, default: {} },
        amount: { type: Number, required: true },
        currency: { type: String, default: 'INR' },
        paymentStatus: {
            type: String,
            enum: ['unpaid', 'paid', 'refunded'],
            default: 'unpaid',
        },
        passengerInfo: [
            {
                name: { type: String, required: true },
                email: { type: String, required: true },
                phone: { type: String },
            },
        ],
        travelDates: {
            from: { type: Date, required: true },
            to: { type: Date },
        },
    },
    { timestamps: true }
);

const Booking: Model<IBooking> =
    mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
