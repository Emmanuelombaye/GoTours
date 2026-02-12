import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PhotoModal({ isOpen, onClose, gallery = {} }) {
    const categories = Object.keys(gallery);
    const [activeCategory, setActiveCategory] = useState(categories[0] || '');
    const observer = useRef(null);

    // Intersection Observer to highlight active category on scroll
    useEffect(() => {
        if (!isOpen) return;

        const options = {
            root: document.getElementById('photo-feed'),
            rootMargin: '0px 0px -80% 0px',
            threshold: 0
        };

        const callback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const catId = entry.target.id.replace('cat-', '');
                    setActiveCategory(catId);
                }
            });
        };

        observer.current = new IntersectionObserver(callback, options);
        categories.forEach(cat => {
            const el = document.getElementById(`cat-${cat}`);
            if (el) observer.current.observe(el);
        });

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [isOpen, gallery]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="fixed inset-0 z-[100] bg-white flex flex-col"
                >
                    {/* Top Header */}
                    <div className="p-4 flex items-center justify-between sticky top-0 bg-white z-20 border-b border-white">
                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 2L6 16l14 14" /></svg>
                        </button>

                        <div className="flex items-center gap-6">
                            <button className="text-sm font-bold underline hover:text-ocean-600 transition-colors">Share</button>
                            <button className="text-sm font-bold underline hover:text-ocean-600 transition-colors">Save</button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden flex h-full">

                        {/* Main Photo Feed (Right) */}
                        <div className="flex-1 overflow-y-auto px-4 md:px-20 pb-40 scroll-smooth custom-scrollbar" id="photo-feed">
                            <div className="max-w-3xl mx-auto space-y-24 py-16">
                                {categories.map((cat) => (
                                    <section key={cat} id={`cat-${cat}`} className="scroll-mt-20">
                                        <h3 className="text-2xl font-bold mb-8 text-slate-900">{cat}</h3>
                                        <div className="space-y-6">
                                            {gallery[cat].map((img, idx) => (
                                                <div key={idx} className="w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                                    <img
                                                        src={img}
                                                        alt={`${cat} view ${idx + 1}`}
                                                        className="w-full h-auto object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar Navigation (Left - Desktop only) */}
                        <div className="hidden lg:block w-[320px] border-r border-slate-100 p-12 h-full overflow-y-auto">
                            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[2px] mb-12">Property Navigation</h2>
                            <nav className="space-y-6">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            document.getElementById(`cat-${cat}`)?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className={`group relative block w-full text-left text-lg py-1.5 transition-all duration-300 ${activeCategory === cat ? 'font-bold text-slate-900' : 'text-slate-400 hover:text-slate-600 font-medium'
                                            }`}
                                    >
                                        <div className={`absolute -left-6 top-1.5 w-1 h-6 bg-slate-900 rounded-full transition-transform duration-300 ${activeCategory === cat ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} />
                                        {cat}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
