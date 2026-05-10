"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, MessageCircle, Heart } from "lucide-react";

const footerLinks = [
    { label: "How It Works", href: "#how-we-work" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Customize", href: "#customization" },
    { label: "Contact", href: "#contact" },
];

const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: MessageCircle, label: "WhatsApp", href: "#" },
];

export default function Footer() {
    const scrollTo = (href: string) => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="relative bg-foreground text-white/80">
            {/* Gradient top border */}
            <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-accent" />

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Logo & tagline */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-white font-display font-bold text-sm">A</span>
                            </div>
                            <span className="font-display font-bold text-xl text-white">
                                Artisan<span className="text-primary-light">Web</span>
                            </span>
                        </div>
                        <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
                            We craft beautiful, affordable websites that help local businesses
                            thrive online. From bakeries to boutiques — we&apos;ve got you covered.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <button
                                        onClick={() => scrollTo(link.href)}
                                        className="font-body text-sm text-white/60 hover:text-primary-light transition-colors duration-200"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social & Contact */}
                    <div>
                        <h4 className="font-display text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Connect With Us
                        </h4>
                        <div className="flex gap-3 mb-6">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                        <p className="font-body text-sm text-white/60">
                            hello@artisanweb.co
                        </p>
                        <p className="font-body text-sm text-white/60">
                            Chennai, India
                        </p>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="font-body text-xs text-white/40">
                        © 2025 Artisan Web Co. All rights reserved.
                    </p>
                    <p className="font-body text-xs text-white/40 flex items-center gap-1">
                        Made with <Heart className="w-3 h-3 text-primary-light fill-primary-light" /> for small businesses
                    </p>
                </div>
            </div>
        </footer>
    );
}
