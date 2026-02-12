import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { modal } from '../motion/variants'
import PhotoModal from './PhotoModal'
import AmenitiesModal from './AmenitiesModal'

export default function ModalContent({ villa }) {
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState(1)
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false)

  const nights = checkin && checkout ? Math.max(1, Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24))) : 5
  const subtotal = villa.price * nights
  const cleaning = 2500
  const service = Math.round(subtotal * 0.12)
  const total = subtotal + cleaning + service

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={modal}
        className="max-h-[90vh] overflow-y-auto bg-white rounded-3xl"
      >
        <div className="p-6 md:p-10 space-y-8">

          {/* Top Header Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Photos & Details (Left) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="relative group rounded-2xl overflow-hidden aspect-[4/3] md:aspect-video cursor-pointer" onClick={() => setIsPhotoModalOpen(true)}>
                <img
                  src={villa.image}
                  alt={villa.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setIsPhotoModalOpen(true); }}
                  className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-slate-900 rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm hover:bg-white transition-colors"
                >
                  View all photos
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{villa.title}</h2>
                    <p className="text-slate-600 font-medium">{villa.location} • {villa.guests} guests • {villa.bedrooms} bedrooms</p>
                  </div>
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-100 flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200" alt="Host" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="py-6 border-y border-slate-100 space-y-6">
                  <div className="flex gap-4">
                    <svg viewBox="0 0 32 32" className="w-5 h-5 text-slate-900 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 2v28M2 16h28" /></svg>
                    <div>
                      <h3 className="text-sm font-bold">Fast Wi-Fi</h3>
                      <p className="text-sm text-slate-500">At 250 Mbps, you can take video calls and stream videos for your whole group.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <svg viewBox="0 0 32 32" className="w-5 h-5 text-slate-900 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 2v28M2 16h28" /></svg>
                    <div>
                      <h3 className="text-sm font-bold">Free cancellation for 48 hours</h3>
                      <p className="text-sm text-slate-500">Get a full refund if you change your mind.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold">About this home</h3>
                  <p className="text-slate-700 leading-7 text-sm">
                    This stunning property in {villa.location} offers the perfect blend of luxury and comfort.
                    Featuring {villa.bedrooms} bedrooms and world-class amenities, it's the ideal spot for your next coastal getaway.
                  </p>
                  <button
                    onClick={() => setIsAmenitiesModalOpen(true)}
                    className="mt-2 text-sm font-bold underline flex items-center gap-1 hover:text-ocean-600 transition-colors"
                  >
                    Show all amenities
                    <svg viewBox="0 0 32 32" className="w-3 h-3 translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="4"><path d="M12 4l10 12-10 12" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky Booking (Right) */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-xl font-bold text-slate-900">Ksh {villa.price.toLocaleString()}</span>
                    <span className="text-slate-500 text-sm ml-1">night</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold">
                    <svg viewBox="0 0 32 32" className="w-2.5 h-2.5 fill-current"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.551 1.748l7.214 6.847-1.726 9.77a1 1 0 0 0 1.465 1.065L16 26.233l8.492 4.933a1 1 0 0 0 1.465-1.065l-1.726-9.77 7.214-6.847a1 1 0 0 0-.551-1.748l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z" /></svg>
                    <span>{villa.rating}</span>
                  </div>
                </div>

                <div className="border border-slate-400 rounded-xl overflow-hidden divide-y divide-slate-400">
                  <div className="grid grid-cols-2 divide-x divide-slate-400">
                    <div className="p-2">
                      <div className="text-[8px] font-bold uppercase text-slate-900">Check-in</div>
                      <div className="text-xs text-slate-500">Add date</div>
                    </div>
                    <div className="p-2">
                      <div className="text-[8px] font-bold uppercase text-slate-900">Checkout</div>
                      <div className="text-xs text-slate-500">Add date</div>
                    </div>
                  </div>
                  <div className="p-2 flex justify-between items-center">
                    <div>
                      <div className="text-[8px] font-bold uppercase text-slate-900">Guests</div>
                      <div className="text-xs text-slate-500">1 guest</div>
                    </div>
                    <svg viewBox="0 0 32 32" className="w-2 h-2 stroke-current" fill="none" strokeWidth="5"><path d="M8 12l8 8 8-8" /></svg>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-ocean-600 to-ocean-700 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95">
                  Reserve
                </button>

                <div className="pt-2 space-y-2 text-[13px]">
                  <div className="flex justify-between text-slate-700 underline underline-offset-2">
                    <span>Ksh {villa.price.toLocaleString()} x {nights} nights</span>
                    <span>Ksh {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 underline underline-offset-2">
                    <span>Cleaning fee</span>
                    <span>Ksh 2,500</span>
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-slate-100 flex justify-between items-center font-extrabold text-slate-900 text-sm">
                  <span>Total</span>
                  <span>Ksh {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      <PhotoModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        gallery={villa.gallery}
      />

      <AmenitiesModal
        isOpen={isAmenitiesModalOpen}
        onClose={() => setIsAmenitiesModalOpen(false)}
        amenities={villa.fullAmenities || []}
      />
    </>
  )
}
