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

export default function VillaCard({ villa, onOpen, index = 0 }){
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
    <motion.li className="card bg-white rounded-lg overflow-hidden" variants={item(index)} initial="hidden" animate="visible" custom={index} whileHover={shouldReduce ? {} : { y: -4 }} transition={{ duration: 0.18, ease: 'easeOut' }} role="article" aria-label={villa.title}>
      <div className="w-full text-left">
        <Link to={`/villa/${villa.id}`} className="block">
          <div className="relative h-36 w-full">
            <LazyImage src={villa.image} alt={villa.title} className="w-full h-full object-cover card-img" />
            <div className="overlay" aria-hidden />
          </div>
          <div className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium">{villa.title}</div>
                <div className="text-xs text-gray-500 mt-1">{villa.location}</div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 bg-white px-2 py-1 rounded shadow-sm">
                  <span className="text-sm font-semibold">Ksh {Number(villa.price).toLocaleString()}</span>
                  <span className="text-xs text-gray-500">/ night</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-ocean-600 text-white rounded text-xs">★ {villa.rating ?? '4.9'}</span>
                <span className="text-xs">{villa.bedrooms} bd · {villa.guests} guests</span>
              </div>
              <div className="text-xs text-gray-400">{villa.available || 'See calendar'}</div>
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
