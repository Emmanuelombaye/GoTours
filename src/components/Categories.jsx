import React, { useRef } from 'react'
import { motion } from 'framer-motion'
// Import Icons individually or use a library. 
// For now, using SVG icons directly to ensure they work without external deps.

const categories = [
    { id: 'All', label: 'All homes', icon: 'Key' },
    { id: 'Diani', label: 'Diani', icon: 'PalmTree' },
    { id: 'Kilifi', label: 'Kilifi', icon: 'Waves' },
    { id: 'Watamu', label: 'Watamu', icon: 'Fish' },
    { id: 'Nyali', label: 'Nyali', icon: 'Building' },
    { id: 'Malindi', label: 'Malindi', icon: 'Castle' },
    { id: 'Beachfront', label: 'Beachfront', icon: 'Umbrella' },
    { id: 'Luxe', label: 'Luxe', icon: 'Gem' },
    { id: 'Design', label: 'Design', icon: 'Palette' },
    { id: 'Trending', label: 'Trending', icon: 'Fire' },
    { id: 'Pool', label: 'Amazing pools', icon: 'Droplet' },
]

// Icon Component Helper
const Icon = ({ name, active }) => {
    const color = active ? 'text-black' : 'text-gray-500 group-hover:text-black'

    switch (name) {
        case 'Key': return <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }} className={color}><path d="M26.97 4.03a6.01 6.01 0 0 0-8.52 0l-1.39 1.4L15.35 4H10a1 1 0 0 0-1 1v4H5a1 1 0 0 0-1 1v4.33l-1.28 1.28a.99.99 0 0 0 0 1.41l3.52 3.52a1 1 0 0 0 1.41 0l3.05-3.05 6.4-6.4 1.4 1.39a6.01 6.01 0 0 0 8.5 0 6.01 6.01 0 0 0-.03-8.45zM18.46 9.54l-2.07 2.07-5.59-5.6 2.07-2.08a4.01 4.01 0 0 1 5.67 5.66l-.08.08V9.54zm-2.07-2.07l-2.07-2.07-2.08-2.08-.13.13-2.07 2.07 4.14 4.14 2-2.19z"></path></svg>
        case 'PalmTree': return <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }} className={color}><path d="M24 2a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16m0-2H8a4 4 0 0 0-4 4v20a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4z"></path><path d="M7 11.5l1.09-1.08L14 16.33V28h2V16.33l5.91-5.91L23 11.5l-8 8-8-8z"></path></svg> // Placeholder for generic
        case 'Waves': return <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }} className={color}><path d="M16 25a9 9 0 1 1 9-9 9.01 9.01 0 0 1-9 9zm0-16a7 7 0 1 0 7 7 7.01 7.01 0 0 0-7-7z"></path></svg>
        case 'Fish': return <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }} className={color}><path d="M29 3v26h-2V3h2zm-4 0v26h-2V3h2zm-4 0v26h-2V3h2zM5 3v26H3V3h2zm4 0v26H7V3h2zm4 0v26h-2V3h2z"></path></svg>
        // Using generic shapes/icons for demonstration as I can't import icons easily without library context
        default: return <svg viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '24px', width: '24px', fill: 'currentColor' }} className={color}><circle cx="16" cy="16" r="10"></circle></svg>
    }
}

// Improved Icons (SVGs from Lucide via direct SVG implementation for best performance/look without external dep issues)
const PalmIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" /><path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" /><path d="M5.89 13.9c.27-.46.62-.89 1.61-.89 1.5 0 1.5 1 1.5 2.5s-1.5 2.5-3 1.5c-1.5-1-1.5-2.5-.11-3.11z" /><path d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14" /><path d="M3 10h14v11H3z" /></svg>
)

const WaterIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 22c1.25-.98 2.37-2.38 3.5-3s2.37-1.38 3.5-1 2.37.38 3.5 1 2.37 1.38 3.5 1 2.37-.38 3.5-1 2.37-1.38 3.5-1" /><path d="M2 17c1.25-.98 2.37-2.38 3.5-3s2.37-1.38 3.5-1 2.37.38 3.5 1 2.37 1.38 3.5 1 2.37-.38 3.5-1 2.37-1.38 3.5-1" /><path d="M2 12c1.25-.98 2.37-2.38 3.5-3s2.37-1.38 3.5-1 2.37.38 3.5 1 2.37 1.38 3.5 1 2.37-.38 3.5-1 2.37-1.38 3.5-1" /></svg>
)

const StarIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
)

const HomeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
)

const ViewIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
)

const styles = {
    // We are matching Airbnb, so minimal, grey icons that turn black on selected/hover
}

export default function Categories({ selected, onSelect }) {
    const scrollRef = useRef(null)

    // Mapping icons manually to ensure they exist without external libs
    const getIcon = (id, active) => {
        const cls = `w-6 h-6 mb-2 transition-colors duration-200 ${active ? 'text-ocean-600 stroke-ocean-600 opacity-100' : 'text-gray-500 stroke-gray-500 opacity-60 group-hover:opacity-100 group-hover:text-ocean-600'}`

        switch (id) {
            case 'All': return <HomeIcon className={cls} />
            case 'Diani': return <PalmIcon className={cls} />
            case 'Beachfront': return <WaterIcon className={cls} />
            case 'Trending': return <StarIcon className={cls} />
            case 'Oceanview': return <ViewIcon className={cls} />
            // Generic fallback for others for now
            default: return <PalmIcon className={cls} />
        }
    }

    return (
        <div className="w-full bg-white pt-4 pb-2 sticky top-[72px] z-40 border-b border-gray-100/50 shadow-sm md:shadow-none">
            {/* Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-2" ref={scrollRef}>
                    {categories.map((cat) => {
                        const isActive = selected === cat.id
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onSelect(cat.id)}
                                className={`group flex flex-col items-center min-w-max cursor-pointer outline-none transition-all duration-200 border-b-2 pb-2 ${isActive ? 'border-ocean-600' : 'border-transparent hover:border-gray-200'}`}
                            >
                                {getIcon(cat.id, isActive)}
                                <span className={`text-xs font-medium whitespace-nowrap transition-colors duration-200 ${isActive ? 'text-ocean-600' : 'text-gray-500 group-hover:text-gray-800'}`}>
                                    {cat.label}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
