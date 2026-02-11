import React from 'react'

export default function Filters({ filters, onChange }){
  return (
    <aside className="w-full md:w-64 p-4 bg-white rounded-lg shadow-sm">
      <h3 className="text-sm font-semibold mb-3">Filters</h3>
      <div className="space-y-3">
        <label className="block text-xs">Price max</label>
        <input type="range" min="5000" max="50000" value={filters.maxPrice} onChange={e=>onChange({ ...filters, maxPrice: Number(e.target.value) })} />
        <div className="flex items-center justify-between text-xs text-gray-500"><span>Ksh {filters.minPrice}</span><span>Ksh {filters.maxPrice}</span></div>

        <div>
          <label className="block text-xs">Bedrooms</label>
          <select value={filters.bedrooms} onChange={e=>onChange({ ...filters, bedrooms: Number(e.target.value) })} className="w-full mt-1 p-2 border rounded text-sm">
            <option value={0}>Any</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </div>

        <div>
          <label className="block text-xs">Guests</label>
          <select value={filters.guests} onChange={e=>onChange({ ...filters, guests: Number(e.target.value) })} className="w-full mt-1 p-2 border rounded text-sm">
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={4}>4+</option>
            <option value={6}>6+</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={filters.freeWifi} onChange={e=>onChange({ ...filters, freeWifi: e.target.checked })} /> Free Wi‑Fi</label>
        </div>

        <button type="button" onClick={()=>onChange({ minPrice:5000, maxPrice:50000, bedrooms:0, guests:1, freeWifi:false })} className="mt-2 text-sm text-ocean-600">Reset filters</button>
      </div>
    </aside>
  )
}
