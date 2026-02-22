import { siteConfig } from "@/config/client/siteConfig";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200 py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">{siteConfig.name}</h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        {siteConfig.description}
                    </p>
                    <div className="flex space-x-4 pt-2">
                        <Link href={siteConfig.social.twitter} className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all"><Twitter className="h-5 w-5" /></Link>
                        <Link href={siteConfig.social.facebook} className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all"><Facebook className="h-5 w-5" /></Link>
                        <Link href={siteConfig.social.instagram} className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all"><Instagram className="h-5 w-5" /></Link>
                        <Link href={siteConfig.social.linkedin} className="bg-slate-800 p-2 rounded-full hover:bg-primary hover:text-white transition-all"><Linkedin className="h-5 w-5" /></Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold text-white mb-6 text-lg">Company</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/about" className="text-slate-400 hover:text-primary transition-colors flex items-center hover:translate-x-1 duration-300">About Us</Link></li>
                        <li><Link href="/contact" className="text-slate-400 hover:text-primary transition-colors flex items-center hover:translate-x-1 duration-300">Contact Us</Link></li>
                        <li><Link href="/careers" className="text-slate-400 hover:text-primary transition-colors flex items-center hover:translate-x-1 duration-300">Careers</Link></li>
                        <li><Link href="/blog" className="text-slate-400 hover:text-primary transition-colors flex items-center hover:translate-x-1 duration-300">Blog</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="font-bold text-white mb-6 text-lg">Support</h3>
                    <ul className="space-y-3 text-sm">
                        <li><Link href="/faq" className="text-slate-400 hover:text-primary transition-colors flex items-center hover:translate-x-1 duration-300">FAQs</Link></li>
                        <li><Link href="/legal/privacy" className="text-slate-400 hover:text-primary transition-colors flex items-center hover:translate-x-1 duration-300">Privacy Policy</Link></li>
                        <li><Link href="/legal/terms" className="text-slate-400 hover:text-primary transition-colors flex items-center hover:translate-x-1 duration-300">Terms & Conditions</Link></li>
                        <li><Link href="/legal/refund" className="text-slate-400 hover:text-primary transition-colors flex items-center hover:translate-x-1 duration-300">Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-bold text-white mb-6 text-lg">Contact</h3>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start space-x-3">
                            <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-slate-400">{siteConfig.contact.phone}</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-slate-400 text-break-all">{siteConfig.contact.email}</span>
                        </li>
                        <li className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-slate-400">{siteConfig.contact.address}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </div>
        </footer>
    );
}
