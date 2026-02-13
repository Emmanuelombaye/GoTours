import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from '../components/Hero'
import Categories from '../components/Categories'
import ListingSection from '../components/ListingSection'
import SkeletonCard from '../components/SkeletonCard'
import MapButton from '../components/MapButton'
import MapView from '../components/MapView'
import Filters from '../components/Filters'
import VillaCard from '../components/VillaCard'
import Modal from '../components/Modal'
import ModalContent from '../components/ModalContent'
import villasData from '../data/villas.json'
import { container } from '../motion/variants'

export default function Home({ showFilters = false, query, setQuery, guests, setGuests }) {
	const [sort, setSort] = useState('recommended')
	const [filters, setFilters] = useState({ minPrice: 5000, maxPrice: 50000, bedrooms: 0, guests: 1, freeWifi: false })
	const [activeCategory, setActiveCategory] = useState('All')
	const [showMap, setShowMap] = useState(false)
	const [selected, setSelected] = useState(null)
	const [page, setPage] = useState(1)
	const [data, setData] = useState(villasData)
	const [loading, setLoading] = useState(false)
	const sentinelRef = useRef(null)

	const villas = useMemo(() => data, [data])
	const filtered = useMemo(() => {
		let filteredVillas = villas

		// 1. Text Search
		if (query) {
			filteredVillas = filteredVillas.filter(v =>
				v.title.toLowerCase().includes(query.toLowerCase()) ||
				v.location.toLowerCase().includes(query.toLowerCase())
			)
		}

		// 2. Category Filter
		if (activeCategory !== 'All') {
			filteredVillas = filteredVillas.filter(v =>
				v.categories && v.categories.includes(activeCategory)
			)
		}

		return filteredVillas
	}, [villas, query, activeCategory])

	const perPage = 15
	let sorted = filtered.slice()
	if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
	else if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
	else if (sort === 'rating') sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
	const visible = sorted.filter(v => v.price <= filters.maxPrice && v.bedrooms >= filters.bedrooms && v.guests >= filters.guests && (!filters.freeWifi || true)).slice(0, page * perPage)

	useEffect(() => {
		let cancelled = false
		async function load() {
			setLoading(true)
			try {
				const res = await fetch('/api/villas')
				if (!res.ok) throw new Error('no api')
				const json = await res.json()
				if (!cancelled) setData(Array.isArray(json) ? json : villasData)
			} catch (e) { if (!cancelled) setData(villasData) }
			finally { if (!cancelled) setLoading(false) }
		}
		load()
		return () => cancelled = true
	}, [])

	useEffect(() => {
		if (!sentinelRef.current) return
		const obs = new IntersectionObserver((entries) => {
			entries.forEach(en => {
				if (en.isIntersecting && visible.length < filtered.length) setPage(p => p + 1)
			})
		}, { root: null, rootMargin: '200px', threshold: 0.1 })
		obs.observe(sentinelRef.current)
		return () => obs.disconnect()
	}, [sentinelRef.current, visible.length, filtered.length])

	return (
		<div className="-mt-1"> {/* Tighten up against the header border */}
			<Hero
				query={query}
				setQuery={setQuery}
				guests={guests}
				setGuests={setGuests}
			/>



			<Categories selected={activeCategory} onSelect={setActiveCategory} />

			{/* Map Toggle Button */}
			<MapButton showMap={showMap} onClick={() => setShowMap(!showMap)} />

			{/* Main Content Area */}
			{showMap ? (
				<div className="h-[calc(100vh-140px)] w-full relative z-0">
					<MapView villas={filtered} />
				</div>
			) : (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
					<section>
						<div className="flex items-center justify-between mb-8">
							<div className="flex items-center gap-6">
								<div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{filtered.length} stays found</div>
								<div className="flex items-center gap-2">
									<label className="text-sm font-semibold text-gray-700">Sort by:</label>
									<select value={sort} onChange={e => setSort(e.target.value)} className="p-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-ocean-400 outline-none transition-all">
										<option value="recommended">Recommended</option>
										<option value="price-asc">Price: low to high</option>
										<option value="price-desc">Price: high to low</option>
										<option value="rating">Top rated</option>
									</select>
								</div>
							</div>
						</div>

						{loading && (
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8 mt-4">
								{[...Array(10)].map((_, i) => (
									<SkeletonCard key={i} />
								))}
							</div>
						)}

						{/* Discovery Sections Mode (Default when no search/filter) */}
						{!query && activeCategory === 'All' && !showFilters ? (
							<div className="space-y-8 -mt-4">
								<ListingSection
									title="Popular homes in Diani"
									villas={villas.filter(v => v.categories?.includes('Diani') || v.location.includes('Diani')).slice(0, 10)}
								/>
								<ListingSection
									title="Stay in Kilifi County"
									villas={villas.filter(v => v.categories?.includes('Kilifi') || v.location.includes('Kilifi')).slice(0, 10)}
								/>
								<ListingSection
									title="Available in Mombasa this weekend"
									villas={villas.filter(v => v.categories?.includes('Nyali') || v.location.includes('Mombasa')).slice(0, 10)}
								/>
								<ListingSection
									title="Beachfront Luxury"
									villas={villas.filter(v => v.categories?.includes('Beachfront')).slice(0, 10)}
								/>
								<ListingSection
									title="Guest Favorites"
									villas={villas.filter(v => v.rating >= 4.9).slice(0, 10)}
								/>
							</div>
						) : (
							/* Filtered Grid Mode */
							<div className="grid grid-cols-1 md:grid-cols-12 gap-8">
								{showFilters ? (
									<div className="hidden md:block md:col-span-3">
										<Filters filters={filters} onChange={setFilters} />
									</div>
								) : null}

								<div className={showFilters ? 'md:col-span-9' : 'md:col-span-12'}>
									<motion.ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-dense" variants={container} initial="hidden" animate="visible">
										<AnimatePresence>
											{visible.map((v, i) => (
												<VillaCard key={v.id} index={i} villa={v} onOpen={(vv) => setSelected(vv)} />
											))}
										</AnimatePresence>
									</motion.ul>
								</div>
							</div>
						)}

						{/* Load More only in grid mode */}
						{(query || activeCategory !== 'All' || showFilters) && (
							<div className="mt-12 text-center">
								{visible.length < filtered.length ? (
									<button onClick={() => setPage(p => p + 1)} className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-xl border border-gray-200 font-bold transition-all shadow-sm hover:shadow-md">
										Load more experiences
									</button>
								) : null}
								<div ref={sentinelRef} aria-hidden style={{ height: 1 }} />
							</div>
						)}
					</section>
				</div>
			)}

			<Modal open={!!selected} onClose={() => setSelected(null)} labelledBy={selected ? `villa-${selected.id}` : undefined}>
				{selected && <ModalContent villa={selected} />}
			</Modal>
		</div>
	)
}
