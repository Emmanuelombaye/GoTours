import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import villasData from '../data/villas.json'
import Gallery from '../components/Gallery'
import AmenitiesModal from '../components/AmenitiesModal'
import PhotoModal from '../components/PhotoModal'

export default function VillaDetail() {
  const { id } = useParams()
  const villa = villasData.find(v => String(v.id) === String(id))

  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false)

  if (!villa) return (
    <div className="p-8 text-center max-w-7xl mx-auto py-24">
      <h2 className="text-2xl font-bold">Villa not found</h2>
      <Link to="/" className="text-ocean-600 mt-4 inline-block underline">Return home</Link>
    </div>
  )

  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{villa.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <div className="flex items-center gap-1">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                  <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.551 1.748l7.214 6.847-1.726 9.77a1 1 0 0 0 1.465 1.065L16 26.233l8.492 4.933a1 1 0 0 0 1.465-1.065l-1.726-9.77 7.214-6.847a1 1 0 0 0-.551-1.748l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z" />
                </svg>
                <span>{villa.rating}</span>
              </div>
              <span className="text-slate-300">•</span>
              <button className="underline hover:text-ocean-600 transition-colors">12 reviews</button>
              <span className="text-slate-300">•</span>
              <button className="underline hover:text-ocean-600 transition-colors uppercase tracking-tight font-bold">{villa.location}</button>
            </div>

            <div className="flex items-center gap-4 text-sm font-bold">
              <button className="flex items-center gap-2 underline hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 12a5 5 0 1 0-5 5 5 5 0 0 0 5-5zm-5 8c7 0 11 4 11 7v2H7v-2c0-3 4-7 11-7z" /></svg>
                Share
              </button>
              <button className="flex items-center gap-2 underline hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 28c7-4.73 14-10 14-17a9 9 0 1 0-18 0 9 9 0 1 0-18 0c0 7 7 12.27 14 17z" /></svg>
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <Gallery
          images={[villa.image]}
          gallery={villa.gallery}
          onOpenPhotos={() => setIsPhotoModalOpen(true)}
        />

        {/* Content Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-16 relative">

          {/* Main Info (Left) */}
          <div className="md:col-span-8">
            <div className="border-b border-slate-100 pb-8 flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Entire villa hosted by Emmanuel</h2>
                <p className="text-slate-600 mt-1">{villa.guests} guests • {villa.bedrooms} bedrooms • {villa.bedrooms} beds • 3 baths</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-slate-100 flex-shrink-0 border border-slate-50 overflow-hidden relative">
                <img src={villa.host?.image || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"} alt="Host" className="w-full h-full object-cover" />
                {villa.host?.superhost && (
                  <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-sm">
                    <svg viewBox="0 0 32 32" className="w-3 h-3 fill-rose-500"><path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832l.555-.37z" /></svg>
                  </div>
                )}
              </div>
            </div>

            {/* Highlights */}
            <div className="py-8 space-y-6 border-b border-slate-100">
              <div className="flex gap-4">
                <div className="mt-1">
                  <svg viewBox="0 0 32 32" className="w-6 h-6 text-slate-900"><path d="M16 2v28M2 16h28" stroke="currentColor" strokeWidth="2" /></svg>
                </div>
                <div>
                  <h3 className="font-bold">Dedicated workspace</h3>
                  <p className="text-sm text-slate-500 mt-1">A private room with wifi that’s well-suited for working.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1">
                  <svg viewBox="0 0 32 32" className="w-6 h-6 text-slate-900"><path d="M16 2v28M2 16h28" stroke="currentColor" strokeWidth="2" /></svg>
                </div>
                <div>
                  <h3 className="font-bold">Self check-in</h3>
                  <p className="text-sm text-slate-500 mt-1">Check yourself in with the keypad.</p>
                </div>
              </div>
            </div>

            {/* AI Generated / Template Description */}
            <div className="py-8 border-b border-slate-100">
              <p className="text-slate-800 leading-8">
                Experience the magic of the Kenyan coast in this stunning {villa.title}. Located in the heart of {villa.location},
                this property offers breathtaking views, modern Swahili architecture, and direct access to white sandy beaches.
                <br /><br />
                Whether you're looking for a peaceful family retreat or a luxury getaway with friends, this {villa.bedrooms}-bedroom villa
                is designed to provide ultimate comfort and privacy. Enjoy outdoor dining, a private infinity pool, and world-class service.
              </p>
              <button className="mt-6 font-bold underline flex items-center gap-1 group">
                Show more
                <svg viewBox="0 0 32 32" className="w-3 h-3 translate-y-0.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="4"><path d="M12 4l10 12-10 12" /></svg>
              </button>
            </div>

            {/* Amenities Section */}
            <div className="py-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12">
                {(villa.fullAmenities?.[7]?.items || [
                  "Kitchen", "Private infinity pool", "Beach access", "Wifi", "Free parking", "Chef services"
                ]).slice(0, 6).map((amenity, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-700">
                    <svg viewBox="0 0 32 32" className="w-6 h-6 opacity-80" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 16h24M16 4v24" />
                    </svg>
                    <span className="text-base">{amenity}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsAmenitiesModalOpen(true)}
                className="mt-10 px-6 py-3 border border-slate-900 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors"
              >
                Show all {villa.fullAmenities?.reduce((acc, curr) => acc + curr.items.length, 0) || 45} amenities
              </button>
            </div>

            {/* Reviews Section */}
            <div className="py-12 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-8">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" aria-hidden="true"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.551 1.748l7.214 6.847-1.726 9.77a1 1 0 0 0 1.465 1.065L16 26.233l8.492 4.933a1 1 0 0 0 1.465-1.065l-1.726-9.77 7.214-6.847a1 1 0 0 0-.551-1.748l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z" /></svg>
                <h2 className="text-2xl font-bold text-slate-900">{villa.rating} · {villa.reviews?.length || 12} reviews</h2>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-8">
                {['Cleanliness', 'Accuracy', 'Communication', 'Location', 'Check-in', 'Value'].map((metric, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-base text-slate-700">{metric}</span>
                    <div className="flex items-center gap-3 w-1/2">
                      <div className="h-1 bg-slate-200 rounded-full flex-1 overflow-hidden">
                        <div className="h-full bg-slate-900 rounded-full" style={{ width: `${90 + Math.random() * 10}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-900">{(4.8 + Math.random() * 0.2).toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {(villa.reviews || [
                  { id: 1, user: "John Doe", date: "Oct 2024", text: "Amazing place!", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
                  { id: 2, user: "Jane Smith", date: "Sep 2024", text: "Lovely villa.", avatar: "https://randomuser.me/api/portraits/women/2.jpg" }
                ]).map((review, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                        <img src={review.avatar} alt={review.user} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{review.user}</h4>
                        <div className="text-sm text-slate-500">{review.date}</div>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-base">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div className="py-12 border-t border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Where you'll be</h2>
              <div className="text-slate-700 mb-6 text-base">{villa.location}, Kenya</div>
              <div className="w-full h-[480px] bg-slate-100 rounded-xl overflow-hidden relative">
                {/* Static Map Placeholder */}
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop"
                  alt="Map location"
                  className="w-full h-full object-cover grayscale-[20%]"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rose-500 rounded-full p-4 shadow-xl text-white outline outline-4 outline-rose-500/30">
                  <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current"><path d="M16 2a10 10 0 0 0-10 10c0 9 10 20 10 20s10-11 10-20A10 10 0 0 0 16 2z" /></svg>
                </div>
              </div>
            </div>

            {/* Host Section */}
            <div className="py-12 border-t border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100">
                  <img src={villa.host?.image || "/images/host.jpg"} alt="Host" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Hosted by {villa.host?.name || "Emmanuel"}</h2>
                  <div className="text-slate-500 text-sm">Joined in {villa.host?.joined || "2021"}</div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 space-y-4">
                  <div className="flex gap-3">
                    <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-current stroke-[2] text-slate-800"><path d="M16 31l-3-6-6-3 6-3 3-6 3 6 6 3-6 3-3 6zM31 16l-3-6-6-3 6-3 3-6 3 6 6 3-6 3-3 6z" /></svg>
                    <div>
                      <span className="font-bold block">1,234 Reviews</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-current stroke-[2] text-slate-800"><path d="M16 2a14 14 0 1 0 0 28 14 14 0 0 0 0-28zM16 8v8l6 4" /></svg>
                    <div>
                      <span className="font-bold block">Identity verified</span>
                    </div>
                  </div>
                  {villa.host?.superhost && (
                    <div className="flex gap-3">
                      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-none stroke-current stroke-[2] text-slate-800"><path d="M16 2l4 9 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1 4-9z" /></svg>
                      <div>
                        <span className="font-bold block">Superhost</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-6">
                  <p className="text-slate-700">
                    Typically responds within an hour.
                  </p>
                  <button className="border border-slate-900 px-6 py-3 rounded-xl font-bold text-slate-900 hover:bg-slate-50 transition-colors">
                    Contact Host
                  </button>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <svg viewBox="0 0 32 32" className="w-4 h-4 fill-current"><path d="M14 22a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-4-6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM14 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" /></svg>
                    <span>To protect your payment, never transfer money or communicate outside of the Airbnb website or app.</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 relative">
              <div className="sticky top-28 bg-white border border-slate-200 rounded-2xl p-6 shadow-xl space-y-4">
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

                {/* Date Picker Template */}
                <div className="border border-slate-400 rounded-xl overflow-hidden divide-y divide-slate-400">
                  <div className="grid grid-cols-2 divide-x divide-slate-400">
                    <div className="p-3">
                      <div className="text-[9px] font-bold uppercase text-slate-900">Check-in</div>
                      <div className="text-xs text-slate-600">Add date</div>
                    </div>
                    <div className="p-3">
                      <div className="text-[9px] font-bold uppercase text-slate-900">Checkout</div>
                      <div className="text-xs text-slate-600">Add date</div>
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <div className="text-[9px] font-bold uppercase text-slate-900">Guests</div>
                      <div className="text-xs text-slate-600">1 guest</div>
                    </div>
                    <svg viewBox="0 0 32 32" className="w-3 h-3 stroke-current" fill="none" strokeWidth="4"><path d="M8 12l8 8 8-8" /></svg>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-ocean-600 to-ocean-700 text-white py-3.5 rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all active:scale-95">
                  Reserve
                </button>

                <p className="text-center text-xs text-slate-500 font-medium">You won't be charged yet</p>

                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-sm text-slate-700 underline underline-offset-2">
                    <span>Ksh {villa.price.toLocaleString()} x 5 nights</span>
                    <span>Ksh {(villa.price * 5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-700 underline underline-offset-2">
                    <span>Cleaning fee</span>
                    <span>Ksh 2,500</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-700 underline underline-offset-2">
                    <span>GoTours service fee</span>
                    <span>Ksh 3,200</span>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-100 flex justify-between items-center font-bold text-slate-900 text-base">
                  <span>Total before taxes</span>
                  <span>Ksh {(villa.price * 5 + 5700).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500 font-bold underline cursor-pointer hover:text-slate-900 transition-colors">
                <svg viewBox="0 0 32 32" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3"><path d="M2 16h28M16 2v28" /></svg>
                Report this listing
              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        <PhotoModal
          isOpen={isPhotoModalOpen}
          onClose={() => setIsPhotoModalOpen(false)}
          gallery={villa.gallery || { "Main": [villa.image] }}
        />

        <AmenitiesModal
          isOpen={isAmenitiesModalOpen}
          onClose={() => setIsAmenitiesModalOpen(false)}
          amenities={villa.fullAmenities || []}
        />
      </div>
    </div>
  )
}
