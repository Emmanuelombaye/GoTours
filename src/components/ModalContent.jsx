import React, { useState } from 'react'
import LazyImage from './LazyImage'
import { motion, useReducedMotion } from 'framer-motion'
import { modal } from '../motion/variants'

export default function ModalContent({ villa }){
  const [main, setMain] = useState(villa.image)
  const shouldReduce = useReducedMotion()
  const amenities = []
  if (villa.bedrooms >= 3) amenities.push('Pool')
  if (villa.price > 25000) amenities.push('Private chef')
  amenities.push('Wi‑Fi')

  return (
    <motion.div initial="hidden" animate="visible" variants={modal} transition={{ duration: 0.2 }}>
      <div className="space-y-3">
        <h2 id={`villa-${villa.id}`} className="text-xl font-semibold">{villa.title}</h2>
        <div className="text-sm text-gray-500">{villa.location} · ★ {villa.rating}</div>

        <div className="grid grid-cols-2 gap-3 mt-2">
          <LazyImage src={main} alt={villa.title} className="w-full h-40 object-cover rounded" />
          <div className="flex flex-col gap-2">
            {[villa.image, villa.image, villa.image].map((src,i)=> (
              <button key={i} type="button" onClick={()=>setMain(src)} className="w-full h-12 overflow-hidden rounded focus-ring" aria-label={`Show image ${i+1}`}>
                <LazyImage src={src} alt={`${villa.title} thumb ${i+1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap mt-2">
          {amenities.map(a=> <span key={a} className="px-2 py-1 bg-gray-100 text-xs rounded">{a}</span>)}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm">Price: <strong>Ksh {villa.price.toLocaleString()}</strong></div>
          <div className="text-sm text-gray-500">Available: {villa.available}</div>
        </div>

        <div className="mt-3">
          <button className="px-4 py-2 bg-ocean-600 text-white rounded">Reserve</button>
        </div>
      </div>
    </motion.div>
  )
}
