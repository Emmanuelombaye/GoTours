import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const ExploreIcon = ({ active }) => (
    <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        className={`block h-6 w-6 stroke-[2.5px] ${active ? 'stroke-ocean-600' : 'stroke-gray-400'}`}
        style={{ fill: active ? 'currentColor' : 'none', color: active ? 'var(--color-ocean-600, #0ea5e9)' : 'currentColor' }}
    >
        <g fill="none">
            {/* Search Icon / Magnifying Glass */}
            <path d="M13 24a11 11 0 1 0 0-22 11 11 0 0 0 0 22zm8-3 9 9"></path>
        </g>
    </svg>
)

const WishlistIcon = ({ active }) => (
    <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        className={`block h-6 w-6 stroke-[2px] ${active ? 'stroke-ocean-600 fill-ocean-600' : 'stroke-gray-400 fill-none'}`}
        style={{ color: active ? 'var(--color-ocean-600, #0ea5e9)' : 'currentColor' }}
    >
        <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path>
    </svg>
)

const TripsIcon = ({ active }) => (
    <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        className={`block h-6 w-6 stroke-[2px] ${active ? 'stroke-ocean-600' : 'stroke-gray-400'}`}
        style={{ color: active ? 'var(--color-ocean-600, #0ea5e9)' : 'currentColor' }}
    >
        {/* Trips Logo / Airbnb Icon ish */}
        <g fill="none">
            <path d="M16 31c8.28 0 15-6.72 15-15S24.28 1 16 1 1 7.72 1 16s6.72 15 15 15z" opacity=".1"></path>
            <path d="M16 1c8.28 0 15 6.72 15 15s-6.72 15-15 15S1 24.28 1 16 7.72 1 16 1zm0 2C8.82 3 3 8.82 3 16s5.82 13 13 13 13-5.82 13-13S23.18 3 16 3z" fill={active ? "currentColor" : "none"} stroke="none"></path>

            {/* Simple Diamond/Trip shape */}
            <path d="M16 6l7 7-7 7-7-7 7-7z" fill="none" stroke="currentColor"></path>
        </g>
        {/* Actually let's use a simpler suitcase or Airbnb trip logo style if possible, 
         but Airbnb uses their logo for "Trips" sometimes or just the word. 
         Let's use a classic suitcase or map icon for clarity if we can't match perfectly without assets.
         Airbnb actually uses the Airbnb logo for "Trips" in some versions, or the specialized logo.
         Let's use a stylish suitcase.
     */}
        <path d="M6 10v17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10M9 10V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" fill="none" stroke="currentColor"></path>
    </svg>
)

const InboxIcon = ({ active }) => (
    <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        className={`block h-6 w-6 stroke-[2px] ${active ? 'stroke-ocean-600 fill-ocean-600' : 'stroke-gray-400 fill-none'}`}
        style={{ color: active ? 'var(--color-ocean-600, #0ea5e9)' : 'currentColor' }}
    >
        <path d="M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 8l10 7 10-7"></path>
    </svg>
)

const ProfileIcon = ({ active }) => (
    <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        className={`block h-6 w-6 stroke-[2px] ${active ? 'stroke-ocean-600 fill-ocean-600' : 'stroke-gray-400 fill-none'}`}
        style={{ color: active ? 'var(--color-ocean-600, #0ea5e9)' : 'currentColor' }}
    >
        <path d="M16 2a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 18c-6.1 0-11.4 3.3-14 8.3a1 1 0 0 0 1.8.8C6.1 26.6 10.7 24 16 24s9.9 2.6 12.2 7.1a1 1 0 0 0 1.8-.8c-2.6-5-7.9-8.3-14-8.3z" fill={active ? "currentColor" : "currentColor"} stroke="none"></path>
        <circle cx="16" cy="11" r="5" stroke={active ? "none" : "currentColor"} fill={active ? "currentColor" : "none"}></circle>
        <path d="M26.2 28.5c-2.3-4.2-6.5-6.5-10.2-6.5s-7.9 2.3-10.2 6.5" stroke="currentColor" fill="none"></path>
    </svg>
)


export default function MobileBottomNav() {
    const location = useLocation()
    const currentPath = location.pathname

    const navItems = [
        { label: 'Explore', path: '/', icon: ExploreIcon },
        { label: 'Wishlists', path: '/listings', icon: WishlistIcon },
        { label: 'Trips', path: '/services', icon: TripsIcon },
        { label: 'Inbox', path: '/about', icon: InboxIcon },
        { label: 'Profile', path: '/host', icon: ProfileIcon },
    ]

    return (
        <div
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-[100] md:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
            <div className="flex justify-around items-center h-[65px] px-2">
                {navItems.map((item) => {
                    const isActive = currentPath === item.path
                    const Icon = item.icon
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="flex flex-col items-center justify-center w-full h-full gap-[2px] active:scale-95 transition-transform duration-100 ease-in-out cursor-pointer"
                        >
                            <div className={`transition-colors duration-200 ${isActive ? 'text-ocean-600' : 'text-gray-400'}`}>
                                <Icon active={isActive} />
                            </div>
                            <span className={`text-[10px] font-[500] tracking-tight ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                {item.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
