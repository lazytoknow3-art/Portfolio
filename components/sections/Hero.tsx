"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CheckCircle, Send, MessageSquare, Palette, Globe } from "lucide-react";

const navLinks = [
    { label: "How It Works", href: "#how-we-work" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Customize", href: "#customization" },
    { label: "Contact", href: "#contact" },
];

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (href: string) => {
        setMobileOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg shadow-sm border-b border-border" : "bg-transparent"}`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-white font-display font-bold text-sm">A</span>
                    </div>
                    <span className="font-display font-bold text-xl text-foreground">
                        Artisan<span className="text-primary">Web</span>
                    </span>
                </a>
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button key={link.href} onClick={() => scrollTo(link.href)}
                            className="text-sm font-body text-muted hover:text-primary transition-colors duration-200">
                            {link.label}
                        </button>
                    ))}
                    <button onClick={() => scrollTo("#contact")}
                        className="px-5 py-2 bg-primary text-white rounded-lg font-body text-sm font-medium hover:bg-primary-light transition-colors duration-200">
                        Start a Project
                    </button>
                </div>
                <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
                    {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button key={link.href} onClick={() => scrollTo(link.href)}
                                    className="text-left text-base font-body text-foreground hover:text-primary transition-colors">
                                    {link.label}
                                </button>
                            ))}
                            <button onClick={() => scrollTo("#contact")}
                                className="px-5 py-2 bg-primary text-white rounded-lg font-body text-sm font-medium w-fit">
                                Start a Project
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

/* ── Phone screen ── */
type Step = "form" | "sending" | "confirm";

function PhoneScreen() {
    const [step, setStep] = useState<Step>("form");
    const [typedName, setTypedName] = useState("");
    const [typedMsg, setTypedMsg] = useState("");
    const [selectedMood, setSelectedMood] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const fullName = "Sarah — Sweet Crumbs Bakery";
    const fullMsg = "I need a warm, cozy website with an online menu and contact form.";
    const moods = ["Warm", "Bold", "Minimal"];
    const features = useMemo(() => ["Menu", "Gallery", "Contact", "Booking"], []);

    useEffect(() => {
        let t: ReturnType<typeof setTimeout>;

        if (step === "form") {
            setTypedName(""); setTypedMsg(""); setSelectedMood(""); setSelectedFeatures([]);
            let i = 0;
            const typeName = () => {
                if (i <= fullName.length) { setTypedName(fullName.slice(0, i)); i++; t = setTimeout(typeName, 40); }
                else t = setTimeout(typeMsg, 400);
            };
            let j = 0;
            const typeMsg = () => {
                if (j <= fullMsg.length) { setTypedMsg(fullMsg.slice(0, j)); j++; t = setTimeout(typeMsg, 30); }
                else t = setTimeout(pickMood, 500);
            };
            const pickMood = () => { setSelectedMood("Warm"); t = setTimeout(pickFeatures, 400); };
            const pickFeatures = () => {
                let k = 0;
                const pick = () => {
                    if (k < features.length) {
                        const f = features[k];
                        setSelectedFeatures((prev) => [...prev, f]);
                        k++; t = setTimeout(pick, 300);
                    } else { t = setTimeout(() => setStep("sending"), 600); }
                };
                pick();
            };
            t = setTimeout(typeName, 600);
        }

        if (step === "sending") t = setTimeout(() => setStep("confirm"), 1800);
        if (step === "confirm") t = setTimeout(() => setStep("form"), 3500);

        return () => clearTimeout(t);
    }, [step, features, fullName, fullMsg]);

    return (
        <div className="w-full h-full bg-[#FAF7F2] rounded-[28px] overflow-hidden flex flex-col">
            {/* Status bar */}
            <div className="flex items-center justify-between px-5 pt-3 pb-1">
                <span className="text-[10px] font-mono text-foreground/50">9:41</span>
                <div className="flex gap-1 items-center">
                    <div className="w-3 h-1.5 rounded-sm bg-foreground/30" />
                    <div className="w-1 h-1 rounded-full bg-foreground/30" />
                </div>
            </div>

            {/* App header */}
            <div className="px-4 pb-2 flex items-center gap-2 border-b border-border/40">
                <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-[9px]">A</span>
                </div>
                <span className="font-display font-bold text-xs text-foreground">ArtisanWeb Co.</span>
            </div>

            <div className="flex-1 px-4 py-3 flex flex-col gap-2.5 overflow-hidden">
                <AnimatePresence mode="wait">

                    {/* Step 1 — Customer fills enquiry form */}
                    {step === "form" && (
                        <motion.div key="form"
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                            className="flex flex-col gap-2.5 h-full">

                            <p className="text-[10px] font-body font-semibold text-foreground">Start your project</p>

                            <div className="bg-white rounded-lg border border-border px-2.5 py-1.5 shadow-sm">
                                <p className="text-[8px] font-mono text-muted mb-0.5">Your name & business</p>
                                <p className="text-[10px] font-body text-foreground min-h-[14px]">
                                    {typedName}
                                    {typedName.length < fullName.length && (
                                        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}
                                            className="inline-block w-0.5 h-2.5 bg-primary ml-0.5 align-middle" />
                                    )}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg border border-border px-2.5 py-1.5 shadow-sm flex-1">
                                <p className="text-[8px] font-mono text-muted mb-0.5">Tell us what you need</p>
                                <p className="text-[10px] font-body text-foreground leading-relaxed">
                                    {typedMsg}
                                    {typedName.length === fullName.length && typedMsg.length < fullMsg.length && (
                                        <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}
                                            className="inline-block w-0.5 h-2.5 bg-primary ml-0.5 align-middle" />
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-[8px] font-mono text-muted mb-1">Color mood</p>
                                <div className="flex gap-1.5">
                                    {moods.map((m) => (
                                        <motion.span key={m}
                                            animate={{ backgroundColor: selectedMood === m ? "#C1440E" : "#f0ebe4", color: selectedMood === m ? "#fff" : "#8A8078" }}
                                            className="text-[9px] font-mono px-2 py-0.5 rounded-full">
                                            {m}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-[8px] font-mono text-muted mb-1">Features needed</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {features.map((f) => (
                                        <motion.span key={f}
                                            animate={{ backgroundColor: selectedFeatures.includes(f) ? "#3B5249" : "#f0ebe4", color: selectedFeatures.includes(f) ? "#fff" : "#8A8078" }}
                                            className="text-[9px] font-mono px-2 py-0.5 rounded-full">
                                            {f}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            <motion.div
                                animate={{ opacity: selectedFeatures.length === features.length ? 1 : 0.4 }}
                                className="w-full py-2 bg-primary rounded-xl flex items-center justify-center gap-1.5">
                                <Send size={10} className="text-white" />
                                <span className="text-[10px] font-body font-semibold text-white">Send Enquiry</span>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Step 2 — Sending */}
                    {step === "sending" && (
                        <motion.div key="sending"
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center gap-3 h-full">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-10 h-10 rounded-full border-2 border-primary/20 border-t-primary" />
                            <p className="text-[11px] font-display font-bold text-foreground">Sending your enquiry...</p>
                            <p className="text-[9px] font-body text-muted text-center">Our team will review your requirements</p>
                        </motion.div>
                    )}

                    {/* Step 3 — Confirmation */}
                    {step === "confirm" && (
                        <motion.div key="confirm"
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }} transition={{ duration: 0.4, type: "spring" }}
                            className="flex flex-col items-center justify-center gap-3 h-full text-center">
                            <motion.div
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                                <CheckCircle size={28} className="text-primary" />
                            </motion.div>
                            <div>
                                <p className="text-[12px] font-display font-bold text-foreground mb-1">Enquiry Received!</p>
                                <p className="text-[9px] font-body text-muted leading-relaxed">
                                    Thanks Sarah! We&apos;ll review your requirements and get back to you within 24 hours.
                                </p>
                            </div>
                            <div className="w-full flex flex-col gap-1.5 mt-1">
                                {[
                                    { icon: MessageSquare, label: "Requirements noted" },
                                    { icon: Palette, label: "Warm mood & features saved" },
                                    { icon: Globe, label: "Proposal coming soon" },
                                ].map(({ icon: Icon, label }, i) => (
                                    <motion.div key={label}
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + i * 0.15 }}
                                        className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-1.5 border border-border">
                                        <Icon size={10} className="text-primary shrink-0" />
                                        <span className="text-[9px] font-body text-foreground">{label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* ── Floating badge ── */
function FloatingBadge({ children, className, delay = 0 }: {
    children: React.ReactNode; className: string; delay?: number;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.5, type: "spring", stiffness: 200 }}
            className={`absolute bg-white rounded-2xl shadow-xl border border-border/60 px-3 py-2 ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function Hero() {
    const headline = "We build websites that grow your business";
    const words = headline.split(" ");
    const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

    return (
        <>
            <Navbar />
            <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-background">

                {/* Soft background blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    {/* ── Left: Text ── */}
                    <div className="flex flex-col items-start">
                        <motion.h1 className="font-display text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
                            {words.map((word, i) => (
                                <motion.span key={i}
                                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07, ease: "easeOut" }}
                                    className="inline-block mr-[0.25em]">
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.0 }}
                            className="font-body text-lg text-muted max-w-lg mb-8 leading-relaxed"
                        >
                            Affordable, beautiful websites for bakeries, boutiques, cafés & local shops — no tech skills needed
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 1.2 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(193,68,14,0.3)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => scrollTo("#portfolio")}
                                className="px-8 py-4 bg-primary text-white rounded-xl font-body font-semibold text-base shadow-lg hover:bg-primary-light transition-colors"
                            >
                                See Our Work
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
                                onClick={() => scrollTo("#contact")}
                                className="px-8 py-4 border-2 border-foreground/20 text-foreground rounded-xl font-body font-semibold text-base hover:border-primary hover:text-primary transition-colors"
                            >
                                Start Your Project
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* ── Right: Phone mockup ── */}
                    <div className="relative flex items-center justify-center lg:justify-end h-[580px]">

                        <motion.div
                            initial={{ opacity: 0, y: 80, rotateX: 20 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ duration: 0.9, delay: 0.4, type: "spring", stiffness: 100, damping: 18 }}
                            style={{ perspective: 1000 }}
                            className="relative z-10"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="relative"
                            >
                                <div className="w-[260px] h-[520px] bg-[#1C1C1C] rounded-[44px] p-[3px] shadow-2xl"
                                    style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.08) inset" }}>
                                    <div className="w-full h-full bg-[#111] rounded-[42px] p-[10px] relative overflow-hidden">
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20" />
                                        <div className="w-full h-full rounded-[34px] overflow-hidden">
                                            <PhoneScreen />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-[-3px] top-28 w-[3px] h-12 bg-[#2a2a2a] rounded-r-sm" />
                                <div className="absolute left-[-3px] top-20 w-[3px] h-8 bg-[#2a2a2a] rounded-l-sm" />
                                <div className="absolute left-[-3px] top-32 w-[3px] h-8 bg-[#2a2a2a] rounded-l-sm" />
                                <div className="absolute left-[-3px] top-44 w-[3px] h-8 bg-[#2a2a2a] rounded-l-sm" />
                            </motion.div>
                        </motion.div>

                        {/* Floating badges */}
                        <FloatingBadge className="top-12 -left-4 lg:-left-16" delay={1.4}>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Send size={13} className="text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-body font-semibold text-foreground">Built in 48hrs</p>
                                    <p className="text-[9px] font-body text-muted">Fast delivery</p>
                                </div>
                            </div>
                        </FloatingBadge>

                        <FloatingBadge className="top-1/3 -right-4 lg:-right-8" delay={1.6}>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <CheckCircle size={13} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-body font-semibold text-foreground">5.0 Rating</p>
                                    <p className="text-[9px] font-body text-muted">120+ reviews</p>
                                </div>
                            </div>
                        </FloatingBadge>

                        <FloatingBadge className="bottom-20 -left-4 lg:-left-12" delay={1.8}>
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                                    <Globe size={13} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-body font-semibold text-foreground">Live in minutes</p>
                                    <p className="text-[9px] font-body text-muted">No code needed</p>
                                </div>
                            </div>
                        </FloatingBadge>

                        {/* Glow behind phone */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                        className="w-6 h-10 border-2 border-muted/40 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </motion.div>
                </motion.div>
            </section>
        </>
    );
}
