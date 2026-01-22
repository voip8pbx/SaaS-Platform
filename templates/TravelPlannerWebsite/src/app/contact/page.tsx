import { siteConfig } from "@/config/siteConfig";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen py-12 md:py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">
                    <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">
                        <h2 className="text-2xl font-bold mb-6 text-slate-900">Get in Touch</h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="John Doe" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                                <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" placeholder="john@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                <textarea rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-lg hover:bg-primary/90 hover:scale-[1.02] transform transition-all shadow-lg shadow-primary/20 text-lg">Send Message</button>
                        </form>
                    </div>

                    <div className="space-y-8 lg:pt-8">
                        <div className="flex items-start space-x-6">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                <Phone className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-xl mb-1">Phone</h3>
                                <p className="text-slate-600 font-medium mb-1">{siteConfig.contact.phone}</p>
                                <p className="text-sm text-slate-400">Mon-Fri 9am to 6pm</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                <Mail className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-xl mb-1">Email</h3>
                                <p className="text-slate-600 font-medium mb-1">{siteConfig.contact.email}</p>
                                <p className="text-sm text-slate-400">Online support 24/7</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-6">
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-xl mb-1">Address</h3>
                                <p className="text-slate-600 font-medium max-w-xs">{siteConfig.contact.address}</p>
                            </div>
                        </div>

                        {/* Map Placeholder or additional info could go here */}
                        <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Our support team is available around the clock to assist you with any inquiries or booking issues you may encounter.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
