import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import SearchExpanded from './SearchExpanded'
// Logo component
const Logo = ({ scrolled }) => {
  return (
    <Link to="/" className="flex items-center">
      <motion.img
        animate={{ scale: scrolled ? 0.85 : 1 }}
        src="/images/gotourbookings-logo.png"
        alt="Company Logo"
        className="w-40 h-auto origin-left"
      />
    </Link>
  )
}

// Premium Illustrative Icons
const HomeIcon = ({ active }) => (
  <div className="relative w-8 h-8 flex items-center justify-center translate-y-[-2px]">
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
      {/* Tree behind house */}
      <path d="M48 40a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" fill="#4ade80" />
      <path d="M50 44a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" fill="#22c55e" />
      <rect x="47" y="38" width="2" height="12" fill="#78350f" />

      {/* House Body */}
      <path d="M14 26 L14 52 L44 52 L44 26 Z" fill="#e2e8f0" />
      <path d="M14 26 L44 26 L44 52 L14 52 Z" fill="#f1f5f9" />

      {/* Roof */}
      <path d="M10 28 L48 20 L48 24 L10 32 Z" fill="#334155" />
      <rect x="18" y="16" width="4" height="12" fill="#475569" /> {/* Chimney */}

      {/* Door */}
      <rect x="25" y="38" width="10" height="14" rx="1" fill="#ef4444" />
      <circle cx="33" cy="45" r="0.8" fill="#fbbf24" />

      {/* Window */}
      <rect x="34" y="28" width="6" height="6" rx="1" fill="#fff" />
      <rect x="34" y="28" width="6" height="0.5" fill="#cbd5e1" />
      <rect x="37" y="28" width="0.5" height="6" fill="#cbd5e1" />

      {/* Grass */}
      <path d="M12 52h34v2H12z" fill="#86efac" rx="1" />
    </svg>
  </div>
)

const ListingsIcon = ({ active }) => (
  <div className="relative w-8 h-8 flex items-center justify-center">
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
      <rect x="12" y="12" width="18" height="18" rx="4" fill="#60a5fa" />
      <rect x="34" y="12" width="18" height="18" rx="4" fill="#3b82f6" />
      <rect x="12" y="34" width="18" height="18" rx="4" fill="#2563eb" />
      <rect x="34" y="34" width="18" height="18" rx="4" fill="#1e40af" />
      <circle cx="32" cy="32" r="6" fill="#fff" stroke="#1d4ed8" strokeWidth="2" />
    </svg>
  </div>
)

const HostIcon = ({ active }) => (
  <div className="relative w-8 h-8 flex items-center justify-center">
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
      <path d="M12 20 L52 20 L52 50 L12 50 Z" fill="#fef08a" />
      <path d="M10 22 L54 12 L54 18 L10 28 Z" fill="#ca8a04" />
      <circle cx="32" cy="35" r="8" fill="#fff" opacity="0.5" />
      <path d="M28 35 L36 35 M32 31 L32 39" stroke="#854d0e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  </div>
)

const AboutIcon = ({ active }) => (
  <div className="relative w-8 h-8 flex items-center justify-center">
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
      <path d="M16 12h32v40H16z" fill="#93c5fd" />
      <path d="M16 12 L20 10 L52 10 L48 12 Z" fill="#3b82f6" />
      <rect x="22" y="20" width="20" height="2" rx="1" fill="#fff" />
      <rect x="22" y="26" width="20" height="2" rx="1" fill="#fff" />
      <rect x="22" y="32" width="12" height="2" rx="1" fill="#fff" />
      <circle cx="40" cy="40" r="5" fill="#f87171" />
    </svg>
  </div>
)

const ServicesIconCustom = ({ active }) => (
  <div className="relative w-8 h-8 flex items-center justify-center translate-y-[2px]">
    <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md">
      <rect x="12" y="44" width="40" height="6" rx="2" fill="#475569" />
      <path d="M14 44 C14 20 50 20 50 44 Z" fill="#cbd5e1" />
      <path d="M14 44 C14 24 50 24 50 44 Z" fill="#94a3b8" opacity="0.5" />
      <circle cx="32" cy="20" r="3" fill="#64748b" />
      <rect x="31" y="16" width="2" height="6" fill="#475569" />
    </svg>
  </div>
)

// Nav component
export default function Nav({ query, setQuery, guests, setGuests }) {
  const [scrolled, setScrolled] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const loc = useLocation()
  const linkClass = (path) =>
    `text-xs transition-colors flex flex-col items-center gap-1.5 ${loc.pathname === path
      ? 'text-ocean-600 font-bold'
      : 'text-gray-500 hover:text-ocean-600'
    }`

  return (
    <motion.header
      animate={{
        boxShadow: scrolled && !expanded ? '0 8px 30px rgba(2,6,23,0.06)' : 'none',
        height: expanded ? 180 : (scrolled ? 80 : 110),
        backgroundColor: scrolled || expanded ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,1)',
      }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed w-full z-50 top-0 left-0 transition-colors ${scrolled && !expanded ? 'backdrop-blur-md border-b border-gray-100' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-50">
        {/* Left: Logo */}
        <div className="flex-1 lg:flex-none">
          <Logo scrolled={scrolled || expanded} />
        </div>

        {/* Center: Navigation */}
        <div className="flex-1 flex justify-center min-w-0 px-4">
          <AnimatePresence mode="wait">
            {!scrolled && !expanded ? (
              <motion.nav
                key="nav-links"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                aria-label="Main navigation"
                className="hidden md:flex items-center gap-10 flex-shrink-0"
              >
                <Link to="/" className={linkClass('/')}>
                  <HomeIcon active={loc.pathname === '/'} />
                  <span>Homes</span>
                </Link>

                <Link to="/listings" className={linkClass('/listings')}>
                  <ListingsIcon active={loc.pathname === '/listings'} />
                  <span>Explore</span>
                </Link>

                <Link to="/services" className={linkClass('/services') + " relative"}>
                  <ServicesIconCustom active={loc.pathname === '/services'} />
                  <span>Services</span>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-1 -right-4 bg-ocean-600 text-[6px] font-black text-white px-1 py-0.5 rounded shadow-sm uppercase tracking-tighter"
                  >
                    New
                  </motion.div>
                </Link>

                <Link to="/host" className={linkClass('/host')}>
                  <HostIcon active={loc.pathname === '/host'} />
                  <span>Hosting</span>
                </Link>

                <Link to="/about" className={linkClass('/about')}>
                  <AboutIcon active={loc.pathname === '/about'} />
                  <span>About</span>
                </Link>
              </motion.nav>
            ) : (
              !expanded && (
                <motion.div
                  key="search-pill"
                  layoutId="search-pill"
                  onClick={() => setExpanded(true)}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  className="flex items-center bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md transition-shadow py-1.5 pl-5 pr-2 gap-3 cursor-pointer"
                >
                  {/* Search pill content remains the same */}
                  <div className="flex flex-col border-r border-gray-100 pr-4 max-w-[140px] relative group/input">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Where</span>
                    <div className="text-xs font-semibold text-gray-800 truncate pr-5 w-full">
                      {query || 'Search destination'}
                    </div>
                  </div>
                  <div className="flex flex-col pr-2">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Who</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-gray-800">{guests}</span>
                      <span className="text-[10px] text-gray-500">Guests</span>
                    </div>
                  </div>
                  <button className="bg-ocean-600 text-white p-2 rounded-full hover:bg-ocean-700 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>

        {/* Right Actions */}
        <div className="flex-1 lg:flex-none flex items-center justify-end gap-3 translate-y-[-1px]">
          <Link to="/host" className="hidden lg:block text-xs font-bold text-gray-700 hover:bg-gray-50 px-4 py-3 rounded-full transition-colors">
            List your villa
          </Link>
          <div className="relative">
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center border border-gray-200 p-1.5 rounded-full hover:shadow-md transition-shadow bg-white gap-3 pl-3 cursor-pointer"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden border border-gray-50">
                <svg className="w-5 h-5 translate-y-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <AnimatePresence>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)}></div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute right-0 top-12 w-[240px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-2 z-20 overflow-hidden"
                  >
                    <div className="flex flex-col">
                      <Link to="#" className="px-4 py-3 hover:bg-gray-50 text-sm font-bold text-gray-900">Sign up</Link>
                      <Link to="#" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-600">Log in</Link>
                      <div className="h-[1px] bg-gray-200 my-2"></div>
                      <Link to="/host" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-600">Airbnb your home</Link>
                      <Link to="#" className="px-4 py-3 hover:bg-gray-50 text-sm text-gray-600">Help Center</Link>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Expanded Search Overlay */}
      <SearchExpanded active={expanded} onClose={() => setExpanded(false)} />

    </motion.header>
  )
}
