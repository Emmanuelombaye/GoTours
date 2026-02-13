import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LazyImage from './LazyImage'

import { item } from '../motion/variants'

const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
    <rect fill='%23e6e6e6' width='100%' height='100%'/>
    <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='28'>No image</text>
  </svg>
`)

export default function VillaCard({ villa, onOpen, index = 0 }) {
  const shouldReduce = useReducedMotion()
  const sampleSnippets = [
    'Fantastic stay — perfect location and friendly host.',
    'Beautiful villa, very clean and great pool.',
    'Highly recommend for families — spacious and quiet.',
    'Excellent service and great views. Will return!',
    'Cozy place with modern amenities and fast Wi‑Fi.'
  ]

  const reviewCount = villa.reviewCount ?? ((villa.id * 37) % 180) + 5
  const reviewSnippet = villa.reviewSnippet ?? sampleSnippets[villa.id % sampleSnippets.length]

  return (
    <motion.li className="group cursor-pointer" variants={item(index)} initial="hidden" animate="visible" custom={index} role="article" aria-label={villa.title}>
      <div className="w-full text-left">
        <Link to={`/villa/${villa.id}`} className="block">
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-gray-200">
            <LazyImage src={villa.image} alt={villa.title} className="w-full h-full object-cover card-img" />
            <div className="overlay" aria-hidden />

            {/* Guest Favorite Badge - Top Left */}
            {villa.rating >= 4.9 && (
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-black/5 z-10">
                <span className="text-xs font-bold text-gray-900">Guest favorite</span>
              </div>
            )}

            {/* Heart Icon - Top Right */}
            <div className="absolute top-3 right-3 z-10">
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors group/heart">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" className="block h-6 w-6 stroke-white stroke-[2px] fill-black/50 group-hover/heart:scale-110 transition-transform"><path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z"></path></svg>
              </button>
            </div>
          </div>
          <div className="p-3">
            <div className="flex items-start justify-between mt-1">
              <div className="w-full">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900 truncate pr-4">{villa.title}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" className="block h-3 w-3 fill-current"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.54 1.736l7.293 6.652-1.98 9.674a1 1 0 0 0 1.465 1.063L16 26.131l8.652 4.728a1 1 0 0 0 1.465-1.063l-1.98-9.674 7.293-6.652a1 1 0 0 0-.54-1.736l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.798 0z"></path></svg>
                    <span>{villa.rating ?? '4.9'}</span>
                  </div>
                </div>
                <div className="text-[15px] text-gray-500">{villa.location.includes("County") ? villa.location : `${villa.location} region`}</div>
                <div className="text-[15px] text-gray-500">{villa.available || 'Feb 10 - 15'}</div>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="font-bold text-gray-900">Ksh {Number(villa.price).toLocaleString()}</span>
                  <span className="text-gray-900">night</span>
                </div>
              </div>
            </div>

          </div>
        </Link>
        <div className="p-3 pt-0 flex justify-end">
          <button type="button" onClick={() => onOpen?.(villa)} className="text-xs px-2 py-1 bg-white border rounded shadow-sm">Quick view</button>
        </div>

        <div className="review-overlay" aria-hidden>
          <div className="text-sm text-gray-700">{reviewSnippet}</div>
          <div className="text-xs text-gray-500 mt-2">Rated {villa.rating ?? '4.9'} · {reviewCount} reviews</div>
        </div>
      </div>
    </motion.li>
  )
}
