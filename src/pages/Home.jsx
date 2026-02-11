import React, { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Filters from '../components/Filters'
import VillaCard from '../components/VillaCard'
import Modal from '../components/Modal'
import ModalContent from '../components/ModalContent'
import villasData from '../data/villas.json'
import { container } from '../motion/variants'

export default function Home({ showFilters=false }){
	const [query, setQuery] = useState('')
	const [guests, setGuests] = useState(2)
	const [sort, setSort] = useState('recommended')
	const [filters, setFilters] = useState({ minPrice:5000, maxPrice:50000, bedrooms:0, guests:1, freeWifi:false })
	const [selected, setSelected] = useState(null)
	const [page, setPage] = useState(1)
	const [data, setData] = useState(villasData)
	const [loading, setLoading] = useState(false)
	const sentinelRef = useRef(null)

	const villas = useMemo(()=>data,[data])
	const filtered = useMemo(()=>{
		if (!query) return villas
		return villas.filter(v => v.title.toLowerCase().includes(query.toLowerCase()) || v.location.toLowerCase().includes(query.toLowerCase()))
	},[villas, query])

	const perPage = 15
	let sorted = filtered.slice()
	if (sort === 'price-asc') sorted.sort((a,b)=>a.price-b.price)
	else if (sort === 'price-desc') sorted.sort((a,b)=>b.price-a.price)
	else if (sort === 'rating') sorted.sort((a,b)=>(b.rating||0)-(a.rating||0))
	const visible = sorted.filter(v=> v.price <= filters.maxPrice && v.bedrooms >= filters.bedrooms && v.guests >= filters.guests && (!filters.freeWifi || true)).slice(0, page * perPage)

	useEffect(()=>{
		let cancelled = false
		async function load(){
			setLoading(true)
			try{
				const res = await fetch('/api/villas')
				if (!res.ok) throw new Error('no api')
				const json = await res.json()
				if (!cancelled) setData(Array.isArray(json)? json : villasData)
			}catch(e){ if (!cancelled) setData(villasData) }
			finally{ if (!cancelled) setLoading(false) }
		}
		load()
		return ()=> cancelled = true
	},[])

	useEffect(()=>{
		if (!sentinelRef.current) return
		const obs = new IntersectionObserver((entries)=>{
			entries.forEach(en=>{
				if (en.isIntersecting && visible.length < filtered.length) setPage(p=>p+1)
			})
		},{ root:null, rootMargin:'200px', threshold:0.1 })
		obs.observe(sentinelRef.current)
		return ()=> obs.disconnect()
	},[sentinelRef.current, visible.length, filtered.length])

	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">Discover curated villas and getaways</h1>
			<section className="mb-6">
				<div className="flex items-center gap-3">
					<div className="w-full max-w-2xl">
						<motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32 }}>
							<div className="bg-white rounded-lg p-3 shadow-sm flex items-center gap-3">
								<input aria-label="Search location" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search Ukunda, Diani or villa name" className="flex-1 px-3 py-2 rounded focus-ring" />
								<div className="hidden sm:flex items-center gap-2">
									<input aria-label="Guests" type="number" min={1} value={guests} onChange={e=>setGuests(e.target.value)} className="w-20 px-3 py-2 rounded" />
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<section>
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-4">
						<div className="text-sm text-gray-600">{filtered.length} stays</div>
						<label className="text-sm">Sort:</label>
						<select value={sort} onChange={e=>setSort(e.target.value)} className="p-2 border rounded text-sm">
							<option value="recommended">Recommended</option>
							<option value="price-asc">Price: low to high</option>
							<option value="price-desc">Price: high to low</option>
							<option value="rating">Top rated</option>
						</select>
					</div>
				</div>

				{loading && <div role="status" aria-live="polite" className="text-sm text-gray-500 mb-3">Loading listings…</div>}

				<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
					{showFilters ? (
						<div className="hidden md:block md:col-span-3">
							<Filters filters={filters} onChange={setFilters} />
						</div>
					) : null}

					<div className={showFilters ? 'md:col-span-9' : 'md:col-span-12'}>
									<motion.ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 grid-dense" variants={container} initial="hidden" animate="visible">
										<AnimatePresence>
											{visible.map((v,i)=> (
												<VillaCard key={v.id} index={i} villa={v} onOpen={(vv)=>setSelected(vv)} />
											))}
										</AnimatePresence>
									</motion.ul>
							</div>
						</div>
				<div className="mt-6 text-center">
					{visible.length < filtered.length ? (
						<button onClick={()=>setPage(p=>p+1)} className="px-4 py-2 bg-white rounded border">Load more</button>
					) : null}
					<div ref={sentinelRef} aria-hidden style={{height:1}} />
				</div>
			</section>

			<Modal open={!!selected} onClose={()=>setSelected(null)} labelledBy={selected ? `villa-${selected.id}` : undefined}>
				{selected && <ModalContent villa={selected} />}
			</Modal>
		</div>
	)
}
