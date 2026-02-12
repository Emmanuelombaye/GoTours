import React from 'react'
import Home from './Home'
export default function Listings({ query, setQuery, guests, setGuests }) {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<h1 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">Explore all luxury stays</h1>
			<Home showFilters={true} query={query} setQuery={setQuery} guests={guests} setGuests={setGuests} />
		</div>
	)
}
