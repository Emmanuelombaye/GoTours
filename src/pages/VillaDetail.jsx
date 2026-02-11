import React from 'react'
import { useParams } from 'react-router-dom'
import villasData from '../data/villas.json'

export default function VillaDetail(){
  const { id } = useParams()
  const villa = villasData.find(v => String(v.id) === String(id))
  if(!villa) return (
    <div className="p-8">Villa not found</div>
  )
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{villa.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{villa.location}</p>
      <img src={villa.image} alt={villa.title} className="w-full rounded-lg mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">About this villa</h3>
          <p className="text-gray-600 mt-2">Beautiful villa perfect for a getaway. Sleeps {villa.guests} and has {villa.bedrooms} bedrooms.</p>
        </div>
        <div>
          <h3 className="font-medium">Details</h3>
          <ul className="text-gray-600 mt-2 list-disc ml-5">
            <li>Price: ${villa.price} / night</li>
            <li>Rating: {villa.rating}</li>
            <li>Available: {villa.available ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
