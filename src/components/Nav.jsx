import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

// Logo component
const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="/images/gotourbookings-logo.png"  // ✅ Fixed logo path
        alt="Company Logo"
        className="w-40 h-auto"
      />
    </Link>
  )
}

// Nav component
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const loc = useLocation()
  const linkClass = (path) =>
    `text-sm ${
      loc.pathname === path
        ? 'text-ocean-600 font-semibold'
        : 'text-gray-700 hover:text-ocean-600'
    }`

  return (
    <motion.header
      animate={{
        boxShadow: scrolled ? '0 8px 30px rgba(2,6,23,0.08)' : 'none',
        padding: scrolled ? '10px 0' : '18px 0',
      }}
      transition={{ duration: 0.24 }}
      className="fixed w-full z-50 top-0 left-0 bg-white/90 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-6 text-sm"
        >
          <Link
            to="/"
            aria-current={loc.pathname === '/' ? 'page' : undefined}
            className={linkClass('/')}
          >
            Home
          </Link>
          <Link
            to="/listings"
            aria-current={loc.pathname === '/listings' ? 'page' : undefined}
            className={linkClass('/listings')}
          >
            Listings
          </Link>
          <Link
            to="/host"
            aria-current={loc.pathname === '/host' ? 'page' : undefined}
            className={linkClass('/host')}
          >
            Host
          </Link>
          <Link
            to="/about"
            aria-current={loc.pathname === '/about' ? 'page' : undefined}
            className={linkClass('/about')}
          >
            About
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm px-3 py-2 rounded-md hidden md:inline text-gray-700"
          >
            Log in
          </Link>
          <Link
            to="/host"
            className="text-sm px-3 py-2 rounded-md bg-ocean-600 text-white"
          >
            List your villa
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
