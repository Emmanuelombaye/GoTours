import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SearchExpanded({ active, onClose }) {
    const [tab, setTab] = useState('stays')
    const [location, setLocation] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: -20, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } }
    }

    return (
        <AnimatePresence>
            {active && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/25 z-40"
                    />

                    {/* Expanded Search Bar */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-[32px] shadow-xl border border-gray-200 z-50 w-full max-w-4xl overflow-hidden"
                    >
                        {/* Tabs */}
                        <div className="flex justify-center pt-4 pb-2">
                            <div className="flex gap-8">
                                <button
                                    onClick={() => setTab('stays')}
                                    className={`text-base font-medium pb-2 relative ${tab === 'stays' ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Stays
                                    {tab === 'stays' && <motion.div layoutId="searchTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
                                </button>
                                <button
                                    onClick={() => setTab('experiences')}
                                    className={`text-base font-medium pb-2 relative ${tab === 'experiences' ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Experiences
                                    {tab === 'experiences' && <motion.div layoutId="searchTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />}
                                </button>
                            </div>
                        </div>

                        {/* Search Inputs Grid */}
                        <div className="flex items-center bg-white rounded-[32px] border border-gray-200 m-2 shadow-sm divide-x divide-gray-200">

                            {/* Location */}
                            <div className="flex-1 px-8 py-3.5 hover:bg-gray-100 rounded-l-[30px] cursor-pointer group relative">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">Where</label>
                                <input
                                    type="text"
                                    placeholder="Search destinations"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full bg-transparent border-none p-0 text-sm placeholder-gray-500 text-gray-900 focus:ring-0 truncate font-medium"
                                />
                            </div>

                            {/* Check In */}
                            <div className="flex-1 px-6 py-3.5 hover:bg-gray-100 cursor-pointer group">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">Check in</label>
                                <input
                                    type="text"
                                    placeholder="Add dates"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full bg-transparent border-none p-0 text-sm placeholder-gray-500 text-gray-900 focus:ring-0 truncate font-medium"
                                />
                            </div>

                            {/* Check Out */}
                            <div className="flex-1 px-6 py-3.5 hover:bg-gray-100 cursor-pointer group">
                                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">Check out</label>
                                <input
                                    type="text"
                                    placeholder="Add dates"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full bg-transparent border-none p-0 text-sm placeholder-gray-500 text-gray-900 focus:ring-0 truncate font-medium"
                                />
                            </div>

                            {/* Guests & Button */}
                            <div className="flex-[1.3] pl-6 pr-2 py-2 hover:bg-gray-100 rounded-r-[30px] cursor-pointer flex items-center justify-between group relative">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-800">Who</label>
                                    <div className="text-sm text-gray-500 font-medium">
                                        {guests > 0 ? `${guests} guests` : 'Add guests'}
                                    </div>
                                </div>

                                {/* Big Search Button */}
                                <button className="bg-gradient-to-br from-ocean-600 to-ocean-700 text-white rounded-full h-12 px-6 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                                    <svg viewBox="0 0 32 32" className="w-4 h-4 fill-none stroke-current stroke-[4px]" aria-hidden="true" role="presentation" focusable="false"><path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9" strokeLinecap="round" /></svg>
                                    <span className="font-bold">Search</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
