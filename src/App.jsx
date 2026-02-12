import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Listings from './pages/Listings'
import VillaDetail from './pages/VillaDetail'
import About from './pages/About'
import Services from './pages/Services'
import Host from './pages/Host'

export default function App() {
  const [query, setQuery] = React.useState('')
  const [guests, setGuests] = React.useState(2)

  return (
    <div>
      <Nav query={query} setQuery={setQuery} guests={guests} setGuests={setGuests} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home query={query} setQuery={setQuery} guests={guests} setGuests={setGuests} />} />
          <Route path="/listings" element={<Listings query={query} setQuery={setQuery} guests={guests} setGuests={setGuests} />} />
          <Route path="/services" element={<Services />} />
          <Route path="/villa/:id" element={<VillaDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/host" element={<Host />} />
          <Route path="*" element={<div className="p-8">Page not found. Go <Link to="/">home</Link>.</div>} />
        </Routes>
      </main>
    </div>
  )
}
