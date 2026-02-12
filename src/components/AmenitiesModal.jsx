import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AmenitiesModal({ isOpen, onClose, amenities = [] }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center sticky top-0 bg-white z-10">
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-4"
                            >
                                <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M2 2l28 28M2 30L30 2" /></svg>
                            </button>
                            <h2 className="text-xl font-bold">What this place offers</h2>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
                            <div className="space-y-12 max-w-2xl mx-auto">
                                {amenities.length > 0 ? (
                                    amenities.map((group, idx) => (
                                        <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: `${idx * 50}ms` }}>
                                            <h3 className="text-xl font-bold mb-6 text-slate-900 border-b border-slate-50 pb-2">{group.category}</h3>
                                            <div className="space-y-6">
                                                {group.items.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-5 text-slate-700 group hover:text-slate-900 transition-colors">
                                                        <div className="w-6 h-6 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                                                            <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 16h24M16 4v24" /></svg>
                                                        </div>
                                                        <span className="text-lg font-medium">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    /* Fallback if no amenities provided */
                                    <div className="py-12">
                                        <h3 className="text-xl font-bold mb-8 text-slate-900">Premium Amenities</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-700">
                                            {["Full Kitchen", "Private Infinity Pool", "Beach Access", "High-speed Wifi", "Air Conditioning", "Daily Housekeeping", "Private Chef Services", "24/7 Security", "Airport Transfers", "Solar Backup"].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div className="w-5 h-5 flex-shrink-0 text-ocean-600">
                                                        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4 16l8 8 16-16" /></svg>
                                                    </div>
                                                    <span className="text-lg font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
