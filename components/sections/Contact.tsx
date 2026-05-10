"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, MessageCircle } from "lucide-react";

const businessTypes = [
    "Bakery",
    "Café",
    "Boutique",
    "Salon",
    "Restaurant",
    "Other",
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        business_name: "",
        business_type: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setShowToast(true);
                setFormData({ name: "", business_name: "", business_type: "", email: "", message: "" });
                setTimeout(() => setShowToast(false), 5000);
            }
        } catch {
            // Handle error
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-[#F5F0E8] relative overflow-hidden"
        >
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-sm text-primary font-medium tracking-wider uppercase">
                        Get in Touch
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
                        Let&apos;s Build Something Together
                    </h2>
                    <p className="font-body text-lg text-muted max-w-2xl mx-auto">
                        Ready to take your business online? Drop us a message and we&apos;ll get back to you
                        within 24 hours.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div>
                            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                                Contact Information
                            </h3>
                            <div className="space-y-5">
                                <a
                                    href="mailto:hello@artisanweb.co"
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-muted">Email</p>
                                        <p className="font-body font-medium text-foreground">
                                            contactus26@gmail.com
                                        </p>
                                    </div>
                                </a>

                                <a href="tel:+919XXXXXXXXX" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-muted">Phone</p>
                                        <p className="font-body font-medium text-foreground">
                                            +91 9360419893
                                        </p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-body text-sm text-muted">Location</p>
                                        <p className="font-body font-medium text-foreground">
                                            Chennai, India
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social links */}
                        <div>
                            <h4 className="font-body text-sm font-medium text-muted mb-4">
                                Follow Us
                            </h4>
                            <div className="flex gap-3">
                                {[
                                    { icon: Instagram, label: "Instagram", href: "#" },
                                    { icon: Linkedin, label: "LinkedIn", href: "#" },
                                    { icon: MessageCircle, label: "WhatsApp", href: "#" },
                                ].map((social) => (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/30 hover:shadow-md transition-all"
                                        aria-label={social.label}
                                    >
                                        <social.icon className="w-5 h-5 text-muted hover:text-primary transition-colors" />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-3 bg-card rounded-2xl border border-border p-8 shadow-lg space-y-5"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-body text-sm font-medium text-foreground mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    placeholder="Jane Smith"
                                />
                            </div>
                            <div>
                                <label className="block font-body text-sm font-medium text-foreground mb-2">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    name="business_name"
                                    value={formData.business_name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    placeholder="My Little Shop"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-body text-sm font-medium text-foreground mb-2">
                                    Business Type
                                </label>
                                <select
                                    name="business_type"
                                    value={formData.business_type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                >
                                    <option value="">Select type...</option>
                                    {businessTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block font-body text-sm font-medium text-foreground mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                    placeholder="jane@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-body text-sm font-medium text-foreground mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                                placeholder="Tell us about your project..."
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(193, 68, 14, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="px-8 py-4 bg-primary text-white rounded-xl font-body font-semibold text-base shadow-lg hover:bg-primary-light transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                <>
                                    <Send size={18} /> Send Message
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </div>

            {/* Toast notification */}
            {showToast && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 left-1/2 z-50 bg-accent text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 font-body"
                >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Send size={16} />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Message sent!</p>
                        <p className="text-xs text-white/80">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                </motion.div>
            )}
        </section>
    );
}
