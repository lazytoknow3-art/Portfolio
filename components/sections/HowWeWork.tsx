"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Palette, CheckCircle, Rocket, DollarSign, Wrench, Store } from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Tell Us About Your Business",
        description:
            "You share what your business does, who your customers are, and what you need. No tech knowledge required.",
        icon: MessageSquare,
        color: "bg-primary/10 text-primary",
    },
    {
        number: "02",
        title: "We Design It For You",
        description:
            "Our team creates a custom design tailored to your brand and audience. You get a preview before anything goes live.",
        icon: Palette,
        color: "bg-accent/10 text-accent",
    },
    {
        number: "03",
        title: "You Review & Approve",
        description:
            "You give feedback, request changes, and approve the final design. We keep revising until you love it.",
        icon: CheckCircle,
        color: "bg-primary-light/20 text-primary",
    },
    {
        number: "04",
        title: "We Launch & Maintain It",
        description:
            "We publish your website and keep it updated, fast, and secure — so you can focus on running your business.",
        icon: Rocket,
        color: "bg-accent/10 text-accent",
    },
];

const highlights = [
    {
        icon: DollarSign,
        title: "Affordable Pricing",
        description: "Quality websites that won't break the bank. Packages designed for small business budgets.",
        emoji: "💰",
    },
    {
        icon: Wrench,
        title: "Ongoing Support",
        description: "We don't disappear after launch. Updates, fixes, and improvements — we've got you covered.",
        emoji: "🛠️",
    },
    {
        icon: Store,
        title: "Built for Local Businesses",
        description: "We understand local. Every design is crafted to attract and convert your neighborhood customers.",
        emoji: "🏪",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

export default function HowWeWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="how-we-work"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-background relative overflow-hidden"
        >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="font-mono text-sm text-primary font-medium tracking-wider uppercase">
                        Our Process
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
                        How It Works — Simple as 1, 2, 3, 4
                    </h2>
                    <p className="font-body text-lg text-muted max-w-2xl mx-auto">
                        We handle the tech so you can focus on what you do best — running your business.
                        Here&apos;s how we bring your website to life.
                    </p>
                </motion.div>

                {/* Step cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.number}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="group relative"
                        >
                            <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 h-full">
                                {/* Step number */}
                                <div className="font-mono text-5xl font-bold text-border group-hover:text-primary/20 transition-colors duration-300 mb-4">
                                    {step.number}
                                </div>

                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                                    <step.icon size={24} />
                                </div>

                                {/* Content */}
                                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                                    {step.title}
                                </h3>
                                <p className="font-body text-muted text-sm leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Connector line */}
                                {i < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 border-t-2 border-dashed border-border" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Why Choose Us */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <h3 className="font-display text-3xl font-bold text-foreground text-center mb-12">
                        Why Choose Us?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {highlights.map((item, i) => (
                            <motion.div
                                key={item.title}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-card rounded-2xl p-8 border border-border text-center hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-300"
                            >
                                <span className="text-4xl mb-4 block">{item.emoji}</span>
                                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                                    {item.title}
                                </h4>
                                <p className="font-body text-sm text-muted leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
