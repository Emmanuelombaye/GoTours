import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Listings from './pages/Listings'
import VillaDetail from './pages/VillaDetail'
import About from './pages/About'
import Host from './pages/Host'

export default function App(){
  return (
    <div>
      <Nav />
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/villa/:id" element={<VillaDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/host" element={<Host />} />
          <Route path="*" element={<div className="p-8">Page not found. Go <Link to="/">home</Link>.</div>} />
        </Routes>
      </main>
    </div>
  )
}
