"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lock,
    Mail,
    Palette,
    FolderOpen,
    Plus,
    ArrowLeft,
    Calendar,
    User,
    Building2,
    MessageSquare,
    Tag,
    Sparkles,
    ExternalLink,
    Trash2,
} from "lucide-react";

interface ContactMessage {
    id: number;
    name: string;
    business_name: string;
    business_type: string;
    email: string;
    message: string;
    created_at: string;
}

interface CustomizationRequest {
    id: number;
    name: string;
    email: string;
    dream_website: string;
    color_mood: string;
    features: string[] | string;
    created_at: string;
}

interface Project {
    id: number;
    name: string;
    category: string;
    description: string;
    image_url: string;
    live_url: string;
    created_at: string;
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [storedPassword, setStoredPassword] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"messages" | "customizations" | "projects">("messages");
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [customizations, setCustomizations] = useState<CustomizationRequest[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [showAddProject, setShowAddProject] = useState(false);
    const [newProject, setNewProject] = useState({
        name: "",
        category: "",
        description: "",
        image_url: "",
        live_url: "",
    });

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsAuthenticated(true);
        setStoredPassword(password);
        fetchData("messages", password);
    };

    const fetchData = async (tab: string, pwd?: string) => {
        setLoading(true);
        const adminPwd = pwd || storedPassword;
        try {
            if (tab === "messages") {
                const res = await fetch("/api/admin/messages", {
                    headers: { "x-admin-password": adminPwd },
                });
                if (res.status === 401) {
                    setIsAuthenticated(false);
                    setError("Invalid password");
                    return;
                }
                const data = await res.json();
                setMessages(data);
            } else if (tab === "customizations") {
                const res = await fetch("/api/admin/customizations", {
                    headers: { "x-admin-password": adminPwd },
                });
                if (res.status === 401) {
                    setIsAuthenticated(false);
                    setError("Invalid password");
                    return;
                }
                const data = await res.json();
                setCustomizations(data);
            } else if (tab === "projects") {
                const res = await fetch("/api/projects");
                const data = await res.json();
                setProjects(data);
            }
        } catch {
            setError("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (tab: "messages" | "customizations" | "projects") => {
        setActiveTab(tab);
        fetchData(tab);
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm("Delete this project?")) return;
        await fetch(`/api/projects?id=${id}`, {
            method: "DELETE",
            headers: { "x-admin-password": storedPassword },
        });
        setProjects((prev) => prev.filter((p) => p.id !== id));
    };

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        // This would need an API route to add projects - for now we just show the form
        setShowAddProject(false);
        setNewProject({ name: "", category: "", description: "", image_url: "", live_url: "" });
        fetchData("projects");
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const parseFeatures = (features: string[] | string): string[] => {
        if (Array.isArray(features)) return features;
        try {
            return JSON.parse(features);
        } catch {
            return [];
        }
    };

    // Login gate
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl border border-border p-8 shadow-lg max-w-md w-full"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
                        <p className="font-body text-sm text-muted mt-2">
                            Enter your admin password to continue
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Admin password"
                            required
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                        />
                        {error && (
                            <p className="text-sm text-red-500 font-body">{error}</p>
                        )}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-body font-semibold text-sm hover:bg-primary-light transition-colors"
                        >
                            Sign In
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <a
                            href="/"
                            className="font-body text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                            <ArrowLeft size={14} /> Back to website
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    }

    const tabs = [
        { id: "messages" as const, label: "Messages", icon: Mail, count: messages.length },
        { id: "customizations" as const, label: "Customizations", icon: Palette, count: customizations.length },
        { id: "projects" as const, label: "Projects", icon: FolderOpen, count: projects.length },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-card border-b border-border sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-display font-bold text-sm">A</span>
                        </div>
                        <span className="font-display font-bold text-lg text-foreground">
                            Admin Dashboard
                        </span>
                    </div>
                    <a
                        href="/"
                        className="font-body text-sm text-muted hover:text-primary transition-colors inline-flex items-center gap-1"
                    >
                        <ArrowLeft size={14} /> Back to site
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-all ${activeTab === tab.id
                                    ? "bg-primary text-white shadow-md"
                                    : "bg-card border border-border text-muted hover:text-foreground hover:border-primary/30"
                                }`}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                            {tab.count > 0 && (
                                <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === tab.id ? "bg-white/20" : "bg-primary/10 text-primary"
                                    }`}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Loading state */}
                {loading && (
                    <div className="text-center py-16">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full mx-auto"
                        />
                        <p className="font-body text-sm text-muted mt-4">Loading...</p>
                    </div>
                )}

                {/* Messages tab */}
                {!loading && activeTab === "messages" && (
                    <div className="space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center py-16 bg-card rounded-2xl border border-border">
                                <Mail className="w-12 h-12 text-muted/30 mx-auto mb-4" />
                                <p className="font-body text-muted">No messages yet</p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User size={18} className="text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-body font-semibold text-foreground">{msg.name}</h3>
                                                <p className="font-body text-xs text-muted">{msg.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted font-body">
                                            <Calendar size={12} />
                                            {formatDate(msg.created_at)}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mb-3 flex-wrap">
                                        {msg.business_name && (
                                            <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 bg-accent/10 text-accent rounded-full">
                                                <Building2 size={10} /> {msg.business_name}
                                            </span>
                                        )}
                                        {msg.business_type && (
                                            <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                <Tag size={10} /> {msg.business_type}
                                            </span>
                                        )}
                                    </div>
                                    {msg.message && (
                                        <div className="flex gap-2 items-start">
                                            <MessageSquare size={14} className="text-muted mt-0.5 shrink-0" />
                                            <p className="font-body text-sm text-muted leading-relaxed">{msg.message}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                )}

                {/* Customizations tab */}
                {!loading && activeTab === "customizations" && (
                    <div className="space-y-4">
                        {customizations.length === 0 ? (
                            <div className="text-center py-16 bg-card rounded-2xl border border-border">
                                <Palette className="w-12 h-12 text-muted/30 mx-auto mb-4" />
                                <p className="font-body text-muted">No customization requests yet</p>
                            </div>
                        ) : (
                            customizations.map((req) => (
                                <motion.div
                                    key={req.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                                <User size={18} className="text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-body font-semibold text-foreground">{req.name}</h3>
                                                <p className="font-body text-xs text-muted">{req.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted font-body">
                                            <Calendar size={12} />
                                            {formatDate(req.created_at)}
                                        </div>
                                    </div>
                                    {req.color_mood && (
                                        <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 bg-primary/10 text-primary rounded-full mb-3">
                                            <Palette size={10} /> {req.color_mood}
                                        </span>
                                    )}
                                    {req.dream_website && (
                                        <div className="flex gap-2 items-start mb-3">
                                            <Sparkles size={14} className="text-muted mt-0.5 shrink-0" />
                                            <p className="font-body text-sm text-muted leading-relaxed">{req.dream_website}</p>
                                        </div>
                                    )}
                                    {parseFeatures(req.features).length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {parseFeatures(req.features).map((feature) => (
                                                <span
                                                    key={feature}
                                                    className="text-xs font-body px-2.5 py-1 bg-accent/10 text-accent rounded-full"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                )}

                {/* Projects tab */}
                {!loading && activeTab === "projects" && (
                    <div>
                        <div className="flex justify-end mb-6">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowAddProject(true)}
                                className="px-5 py-2.5 bg-primary text-white rounded-xl font-body text-sm font-medium inline-flex items-center gap-2 hover:bg-primary-light transition-colors"
                            >
                                <Plus size={16} /> Add Project
                            </motion.button>
                        </div>

                        {/* Add project form */}
                        <AnimatePresence>
                            {showAddProject && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-card rounded-xl border border-border p-6 mb-6 overflow-hidden"
                                >
                                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                                        Add New Project
                                    </h3>
                                    <form onSubmit={handleAddProject} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={newProject.name}
                                                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                                placeholder="Project name"
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm"
                                            />
                                            <input
                                                type="text"
                                                value={newProject.category}
                                                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                                placeholder="Category (Bakery, Café, etc.)"
                                                required
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm"
                                            />
                                        </div>
                                        <textarea
                                            value={newProject.description}
                                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                            placeholder="Description"
                                            rows={3}
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm resize-none"
                                        />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={newProject.image_url}
                                                onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })}
                                                placeholder="Image URL"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm"
                                            />
                                            <input
                                                type="text"
                                                value={newProject.live_url}
                                                onChange={(e) => setNewProject({ ...newProject, live_url: e.target.value })}
                                                placeholder="Live site URL"
                                                className="w-full px-4 py-3 bg-background border border-border rounded-xl font-body text-sm"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <motion.button
                                                type="submit"
                                                whileHover={{ scale: 1.02 }}
                                                className="px-6 py-2.5 bg-primary text-white rounded-xl font-body text-sm font-medium"
                                            >
                                                Save Project
                                            </motion.button>
                                            <button
                                                type="button"
                                                onClick={() => setShowAddProject(false)}
                                                className="px-6 py-2.5 border border-border rounded-xl font-body text-sm text-muted hover:text-foreground"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Projects list */}
                        <div className="space-y-4">
                            {projects.length === 0 ? (
                                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                                    <FolderOpen className="w-12 h-12 text-muted/30 mx-auto mb-4" />
                                    <p className="font-body text-muted">No projects yet</p>
                                </div>
                            ) : (
                                projects.map((project) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-body font-semibold text-foreground">{project.name}</h3>
                                                    <span className="text-xs font-mono px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                                        {project.category}
                                                    </span>
                                                </div>
                                                <p className="font-body text-sm text-muted leading-relaxed mb-2">
                                                    {project.description}
                                                </p>
                                                {project.live_url && project.live_url !== "#" && (
                                                    <a
                                                        href={project.live_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary-light font-body"
                                                    >
                                                        <ExternalLink size={12} /> View live
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 text-xs text-muted font-body">
                                                    <Calendar size={12} />
                                                    {formatDate(project.created_at)}
                                                </div>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleDeleteProject(project.id)}
                                                    className="p-2 rounded-lg text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 size={15} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
