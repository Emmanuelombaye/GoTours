import React, { useState } from 'react'

export default function LazyImage({ src, alt, className='', style={}, srcSet, sizes }){
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
      <rect fill='%23e6e6e6' width='100%' height='100%'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='28'>Image</text>
    </svg>
  `)

  const handleError = (e) => { setError(true); e.target.onerror = null; e.target.src = PLACEHOLDER }
  return (
    <img
      loading="lazy"
      src={error ? PLACEHOLDER : src || PLACEHOLDER}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      className={`${className} ${loaded ? 'lazy-loaded' : 'lazy-loading'}`}
      role="img"
      style={style}
      onLoad={() => setLoaded(true)}
      onError={handleError}
    />
  )
}
