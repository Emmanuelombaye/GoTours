import React from 'react'

export default function MapView({ villas }) {
    // Simulating a map view with a static image and price markers
    // In a real app, this would use Google Maps or Mapbox

    return (
        <div className="w-full h-[calc(100vh-180px)] md:h-[calc(100vh-80px)] bg-gray-100 relative overflow-hidden rounded-xl md:rounded-none">
            {/* Background Map Image (Static Placeholder) */}
            <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop"
                alt="Map background"
                className="w-full h-full object-cover opacity-80 grayscale-[20%]"
            />

            <div className="absolute inset-0 bg-ocean-900/10 pointer-events-none"></div>

            {/* Simulated Price Pins */}
            {villas.slice(0, 8).map((villa, i) => {
                // Random positions for demo
                const top = `${20 + (i * 15) % 60}%`
                const left = `${10 + (i * 23) % 80}%`

                return (
                    <div
                        key={villa.id}
                        className="absolute bg-white text-gray-900 font-bold text-sm px-3 py-1.5 rounded-full shadow-md hover:scale-110 hover:bg-black hover:text-white transition-all cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                        style={{ top, left }}
                    >
                        Ksh {Number(villa.price).toLocaleString()}
                    </div>
                )
            })}

            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-xs font-medium shadow-sm">
                Map data ©2025 Google
            </div>
        </div>
    )
}
