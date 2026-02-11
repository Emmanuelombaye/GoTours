import React from 'react'
import Home from './Home'
export default function Listings(){
	return (
		<main>
			<h1 className="text-2xl font-semibold mb-4">All listings</h1>
			<Home showFilters />
		</main>
	)
}
