export default function RefundPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Refund & Cancellation Policy</h1>
            <div className="prose prose-slate max-w-none">
                <p className="mb-4">Thank you for booking at TravelPanner.</p>
                <p className="mb-4">If, for any reason, You are not completely satisfied with a purchase We invite You to review our policy on refunds and returns.</p>
                <h2 className="text-xl font-bold mt-8 mb-4">Conditions for Returns</h2>
                <p className="mb-4">In order for the Services to be eligible for a refund, please make sure that:</p>
                <ul className="list-disc pl-6 mb-4">
                    <li>The booking was cancelled within the applicable cancellation window.</li>
                    <li>The service was not utilized.</li>
                </ul>
                <p className="mb-4">Cancellation fees may apply based on the airline or hotel policy.</p>
            </div>
        </div>
    );
}
