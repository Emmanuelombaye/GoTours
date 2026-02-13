import React from 'react'
import { motion } from 'framer-motion'

export default function MapButton({ showMap, onClick }) {
    return (
        <div className="fixed bottom-24 md:bottom-12 left-1/2 transform -translate-x-1/2 z-[50]">
            <motion.button
                onClick={onClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-900 hover:bg-black text-white px-5 py-3.5 rounded-full shadow-xl flex items-center gap-2 transition-colors font-semibold text-sm tracking-wide"
            >
                {showMap ? (
                    <>
                        <span>Show list</span>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}>
                            <g fill="none">
                                <path d="M4 8h24M4 16h24M4 24h24" />
                            </g>
                        </svg>
                    </>
                ) : (
                    <>
                        <span>Show map</span>
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: 4, overflow: 'visible' }}>
                            <g fill="none">
                                <path d="M16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051C12.583 4.683 10.792 4 9 4 7.208 4 5.417 4.683 4.05 6.05 2.683 7.417 2 9.208 2 11c0 7 7 12.267 14 17z" style={{ display: 'none' }} /> {/* Heart hidden */}
                                <path d="M31.245 8.4l-11.23-6.24a.5.5 0 0 0-.485.004l-10.42 6.06a.5.5 0 0 0-.25.43V23.5a.5.5 0 0 0 .254.434l11 6.286a.5.5 0 0 0 .492 0l10.5-6a.5.5 0 0 0 .254-.434V8.835a.5.5 0 0 0-.115-.336z" style={{ display: 'none' }} /> {/* Hexagon hidden */}
                                <path d="M27 13.85v11.4l-11 6.3-11-6.3v-11.4l11-6.25z" style={{ display: 'none' }} />
                                <circle cx="16" cy="16" r="14" />
                                <path d="M16 8v8l6 6" /> {/* Clock hidden */}
                                {/* Map icon */}
                                <path d="M27 11.23v16.14l-9.87 4.54-10.37-4.63L2 29.56V13.6l9.64-5.22 8.78 4.78L27 11.23z" style={{ display: 'none' }} />
                                <path d="M9 4L2 7v20l7-3 8 3 8-3v-20l-8 3-8-3z M9 27v-20 M17 27v-20" />
                            </g>
                        </svg>
                    </>
                )}
            </motion.button>
        </div>
    )
}
