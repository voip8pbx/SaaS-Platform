export function StandardWhyChooseUs() {
    return (
        <section className="py-16 bg-card text-card-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-12">Why Book With Us?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">Best Price Guarantee</h3>
                        <p className="text-muted-foreground">Find a lower price? We'll match it.</p>
                    </div>
                    <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">24/7 Support</h3>
                        <p className="text-muted-foreground">We are here to help you anytime, anywhere.</p>
                    </div>
                    <div className="p-6 bg-background rounded-2xl shadow-sm border border-border/50 hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">Easy Booking</h3>
                        <p className="text-muted-foreground">Seamless booking experience with instant confirmation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
