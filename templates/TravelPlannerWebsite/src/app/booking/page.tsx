import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function BookingPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-20 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h1>
                <p className="text-slate-600 mb-6">
                    Your flight to Mumbai has been booked successfully. A confirmation email has been sent to you.
                </p>

                <div className="bg-slate-50 p-4 rounded-lg mb-6 text-left">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-1">Booking Reference</p>
                    <p className="text-lg font-mono font-bold text-slate-900">TRV-88592</p>
                </div>

                <Link href="/" className="block w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
