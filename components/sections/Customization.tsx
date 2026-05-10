"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Sparkles } from "lucide-react";

const colorMoods = [
    { name: "Warm", colors: ["#C1440E", "#F5E6D3"], emoji: "🟤", desc: "Terracotta & Cream" },
    { name: "Fresh", colors: ["#3B5249", "#E8F5E9"], emoji: "🟢", desc: "Sage & Mint" },
    { name: "Bold", colors: ["#4A1942", "#FFD700"], emoji: "🟣", desc: "Deep Plum & Gold" },
    { name: "Elegant", colors: ["#1C1C1C", "#FFFFF0"], emoji: "⚪", desc: "Black & Ivory" },
    { name: "Minimal", colors: ["#FFFFFF", "#6478A0"], emoji: "🔵", desc: "White & Slate Blue" },
];

const featureOptions = [
    "Online Menu",
    "Product Gallery",
    "Booking / Appointment Form",
    "WhatsApp Chat Button",
    "Google Maps Embed",
    "Social Media Links",
    "Photo Gallery",
    "Blog / News Section",
];

const placeholders = [
    "A warm and cozy bakery site with menu and online orders...",
    "A sleek product gallery for my boutique with Instagram vibes...",
    "A menu and reservation page for my café with daily specials...",
    "A modern salon site with appointment booking and stylist profiles...",
];

export default function Customization() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dreamWebsite, setDreamWebsite] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Cycle through placeholder text
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const toggleFeature = (feature: string) => {
        setSelectedFeatures((prev) =>
            prev.includes(feature)
                ? prev.filter((f) => f !== feature)
                : [...prev, feature]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) return;

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/customization", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    dream_website: dreamWebsite,
                    color_mood: selectedMood,
                    features: selectedFeatures,
                }),
            });

            if (res.ok) {
                setIsSubmitted(true);
            }
        } catch {
            // Handle error silently
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="customization"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-background relative overflow-hidden"
        >
            <div className="absolute top-40 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-4xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-sm text-primary font-medium tracking-wider uppercase">
                        Your Vision
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
                        What Would Your Website Look Like?
                    </h2>
                    <p className="font-body text-lg text-muted max-w-2xl mx-auto">
                        Tell us your vision — we handle the rest.
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="bg-card rounded-2xl border border-border p-12 text-center shadow-lg"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            >
                                <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
                            </motion.div>
                            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                                Thanks! We&apos;ll review your ideas 🎉
                            </h3>
                            <p className="font-body text-muted">
                                We&apos;ll get back to you within 24 hours with our thoughts and a custom proposal.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-card rounded-2xl border border-border p-8 sm:p-10 shadow-lg space-y-8"
                        >
                            {/* Name + Email row */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                <div>
                                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="Jane Smith"
                                    />
                                </div>
                                <div>
                                    <label className="block font-body text-sm font-medium text-foreground mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </motion.div>

                            {/* Dream website textarea */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 }}
                            >
                                <label className="block font-body text-sm font-medium text-foreground mb-2">
                                    Describe your dream website
                                </label>
                                <textarea
                                    value={dreamWebsite}
                                    onChange={(e) => setDreamWebsite(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                                    placeholder={placeholders[placeholderIndex]}
                                />
                            </motion.div>

                            {/* Color Mood Picker */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.5 }}
                            >
                                <label className="block font-body text-sm font-medium text-foreground mb-4">
                                    Pick a Color Mood
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                    {colorMoods.map((mood) => (
                                        <motion.button
                                            key={mood.name}
                                            type="button"
                                            onClick={() => setSelectedMood(mood.name)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-center ${selectedMood === mood.name
                                                    ? "border-primary shadow-lg shadow-primary/10"
                                                    : "border-border hover:border-muted"
                                                }`}
                                        >
                                            {selectedMood === mood.name && (
                                                <motion.div
                                                    layoutId="moodRing"
                                                    className="absolute inset-0 border-2 border-primary rounded-xl"
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                />
                                            )}
                                            <div className="flex gap-1 justify-center mb-2">
                                                <div
                                                    className="w-5 h-5 rounded-full border border-border/50"
                                                    style={{ backgroundColor: mood.colors[0] }}
                                                />
                                                <div
                                                    className="w-5 h-5 rounded-full border border-border/50"
                                                    style={{ backgroundColor: mood.colors[1] }}
                                                />
                                            </div>
                                            <span className="font-body text-xs font-medium text-foreground block">
                                                {mood.emoji} {mood.name}
                                            </span>
                                            <span className="font-body text-[10px] text-muted block mt-0.5">
                                                {mood.desc}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Features checklist */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.6 }}
                            >
                                <label className="block font-body text-sm font-medium text-foreground mb-4">
                                    What features do you need?
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {featureOptions.map((feature) => {
                                        const isSelected = selectedFeatures.includes(feature);
                                        return (
                                            <motion.button
                                                key={feature}
                                                type="button"
                                                onClick={() => toggleFeature(feature)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`px-4 py-2 rounded-full font-body text-sm font-medium border transition-all duration-200 ${isSelected
                                                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                                        : "bg-background text-muted border-border hover:border-primary/30 hover:text-foreground"
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <Sparkles className="inline-block w-3.5 h-3.5 mr-1.5" />
                                                )}
                                                {feature}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Submit */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.7 }}
                            >
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(193, 68, 14, 0.3)" }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-body font-semibold text-base shadow-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                    ) : (
                                        <>
                                            <Send size={18} /> Submit My Ideas
                                        </>
                                    )}
                                </motion.button>
                            </motion.div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
