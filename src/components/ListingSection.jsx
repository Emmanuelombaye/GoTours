import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import VillaCard from './VillaCard'
import { Link } from 'react-router-dom'

export default function ListingSection({ title, villas }) {
    const scrollRef = useRef(null)

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef
            const scrollAmount = direction === 'left' ? -300 : 300
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }

    if (!villas || villas.length === 0) return null

    return (
        <div className="py-6 border-b border-gray-100 last:border-0">
            <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
                <div className="flex gap-2">
                    <button onClick={() => scroll('left')} className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:shadow-md transition-all">
                        <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible' }}><g fill="none"><path d="m20 28-11.29289322-11.2928932c-.39052429-.3905243-.39052429-1.0236893 0-1.4142136l11.29289322-11.2928932"></path></g></svg>
                    </button>
                    <button onClick={() => scroll('right')} className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:shadow-md transition-all">
                        <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '12px', width: '12px', stroke: 'currentcolor', strokeWidth: '5.33333', overflow: 'visible' }}><g fill="none"><path d="m12 4 11.2928932 11.2928932c.3905243.3905243.3905243 1.0236893 0 1.4142136l-11.2928932 11.2928932"></path></g></svg>
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-6 px-4 no-scrollbar snap-x snap-mandatory sm:px-0"
            >
                {villas.map((villa, index) => (
                    <div key={villa.id} className="min-w-[280px] md:min-w-[300px] snap-start">
                        <VillaCard villa={villa} index={index} />
                    </div>
                ))}
            </div>
        </div>
    )
}
