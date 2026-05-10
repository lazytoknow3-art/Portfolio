"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project {
    id: number;
    name: string;
    category: string;
    description: string;
    image_url: string;
    live_url: string;
}

const fallbackProjects: Project[] = [
    {
        id: 1,
        name: "La Petite Bakery",
        category: "Bakery",
        description:
            "A warm, inviting website for an artisan French bakery featuring an elegant menu display, online ordering system, and a gallery showcasing their handcrafted pastries and sourdough breads.",
        image_url: "/images/projects/bakery.jpg",
        live_url: "#",
    },
    {
        id: 2,
        name: "Bloom Boutique",
        category: "Boutique",
        description:
            "A chic, minimalist e-commerce site for a curated women's fashion boutique. Features a lookbook gallery, size guide, and seamless shopping experience with Instagram integration.",
        image_url: "/images/projects/boutique.jpg",
        live_url: "#",
    },
    {
        id: 3,
        name: "Corner Café",
        category: "Café",
        description:
            "A cozy digital home for a neighborhood café with daily specials, an interactive menu, online table reservations, and a blog featuring their coffee sourcing stories.",
        image_url: "/images/projects/cafe.jpg",
        live_url: "#",
    },
    {
        id: 4,
        name: "The Linen Room",
        category: "Boutique",
        description:
            "An elegant website for a luxury home textiles boutique showcasing their handwoven linen collections, care guides, and a sophisticated product catalog with zoom details.",
        image_url: "/images/projects/linen.jpg",
        live_url: "#",
    },
    {
        id: 5,
        name: "Saffron Kitchen",
        category: "Café",
        description:
            "A vibrant, appetite-inspiring website for an Indian fusion restaurant featuring an interactive menu, chef's specials, catering services, and integrated online ordering.",
        image_url: "/images/projects/kitchen.jpg",
        live_url: "#",
    },
    {
        id: 6,
        name: "Urban Cuts Salon",
        category: "Salon",
        description:
            "A sleek, modern website for a trendy hair salon with online appointment booking, stylist profiles, a before-and-after gallery, and loyalty program integration.",
        image_url: "/images/projects/salon.jpg",
        live_url: "#",
    },
];

const categories = ["All", "Bakery", "Café", "Boutique", "Salon"];

// Generate gradient placeholders for project cards
const gradients = [
    "from-orange-200 via-amber-100 to-yellow-200",
    "from-pink-200 via-rose-100 to-fuchsia-200",
    "from-emerald-200 via-teal-100 to-cyan-200",
    "from-violet-200 via-purple-100 to-indigo-200",
    "from-amber-200 via-orange-100 to-red-200",
    "from-sky-200 via-blue-100 to-indigo-200",
];

export default function Portfolio() {
    const [projects, setProjects] = useState<Project[]>(fallbackProjects);
    const [activeCategory, setActiveCategory] = useState("All");
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.length > 0) setProjects(data);
            })
            .catch(() => {
                // fallback already set
            });
    }, []);

    const filtered =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <section
            id="portfolio"
            ref={sectionRef}
            className="py-24 lg:py-32 bg-[#F5F0E8] relative overflow-hidden"
        >
            <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="font-mono text-sm text-primary font-medium tracking-wider uppercase">
                        Our Work
                    </span>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mt-3 mb-4">
                        Websites We&apos;ve Built
                    </h2>
                    <p className="font-body text-lg text-muted max-w-2xl mx-auto">
                        Real websites for real businesses. Each project is crafted with care to
                        help local shops thrive online.
                    </p>
                </motion.div>

                {/* Filter tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center gap-2 mb-12 flex-wrap"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className="relative px-5 py-2 font-body text-sm font-medium transition-colors duration-200"
                        >
                            <span
                                className={
                                    activeCategory === cat ? "text-primary" : "text-muted hover:text-foreground"
                                }
                            >
                                {cat}
                            </span>
                            {activeCategory === cat && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Projects grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <motion.div
                                    whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.12)" }}
                                    className="bg-card rounded-2xl overflow-hidden border border-border group cursor-pointer"
                                >
                                    {/* Browser frame */}
                                    <div className="bg-[#F0EBE3] px-4 pt-3 pb-0">
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                                            <div className="flex-1 mx-3 bg-white/60 rounded-md h-5 flex items-center px-2">
                                                <span className="text-[10px] text-muted font-mono truncate">
                                                    {project.name.toLowerCase().replace(/\s+/g, "")}.com
                                                </span>
                                            </div>
                                        </div>

                                        {/* Project image placeholder */}
                                        <div className={`w-full h-48 bg-gradient-to-br ${gradients[i % gradients.length]} rounded-t-md overflow-hidden relative`}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="font-display text-2xl font-bold text-foreground/20">
                                                    {project.name}
                                                </span>
                                            </div>
                                            <motion.div
                                                className="absolute inset-0"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </div>

                                    {/* Card content */}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-display text-lg font-semibold text-foreground">
                                                {project.name}
                                            </h3>
                                            <span className="font-mono text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                                                {project.category}
                                            </span>
                                        </div>
                                        <p className="font-body text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                                            {project.description}
                                        </p>
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary-light transition-colors"
                                        >
                                            View Live <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
