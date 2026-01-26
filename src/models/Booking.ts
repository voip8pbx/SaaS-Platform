import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBooking extends Document {
    adminId: string;
    userId: mongoose.Types.ObjectId;
    type: 'flight' | 'hotel' | 'train' | 'cab' | 'car_rental' | 'bike_rental' | 'villa' | 'cruise';
    details: any; // Flexible object to store API response/booking details
    status: 'pending' | 'confirmed' | 'cancelled';
    totalAmount: number;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
    adminId: { type: String, required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['flight', 'hotel', 'train', 'cab', 'car_rental', 'bike_rental', 'villa', 'cruise'],
        required: true
    },
    details: { type: Schema.Types.Mixed }, // Store JSON data for the booking
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    totalAmount: { type: Number },
    currency: { type: String, default: 'INR' },
}, { timestamps: true });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
