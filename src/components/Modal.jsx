import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function Modal({ open, onClose, children, labelledBy }){
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const previouslyFocused = useRef(null)
  const reduce = useReducedMotion()

  useEffect(()=>{
    if (open) {
      previouslyFocused.current = document.activeElement
      document.body.style.overflow = 'hidden'
      setTimeout(()=> contentRef.current?.focus(), reduce ? 0 : 30)
    } else {
      document.body.style.overflow = ''
      try { previouslyFocused.current?.focus() } catch(e){}
    }
    return () => { document.body.style.overflow = '' }
  },[open, reduce])

  useEffect(()=>{
    function onKey(e){ if (e.key==='Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  },[onClose])

  // basic focus trap
  useEffect(()=>{
    if (!open) return
    const focusable = contentRef.current.querySelectorAll('a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])')
    if (!focusable.length) return
    const first = focusable[0], last = focusable[focusable.length-1]
    function handler(e){
      if (e.key !== 'Tab') return
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handler)
    return ()=> document.removeEventListener('keydown', handler)
  },[open])

  const transition = reduce ? { duration: 0 } : { duration: 0.22, ease: [0.2,0.8,0.2,1] }

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={transition} className="fixed inset-0 z-50 flex items-center justify-center">
          <div ref={overlayRef} className="absolute inset-0 bg-black/45" onClick={onClose} aria-hidden />
          <motion.div ref={contentRef} role="dialog" aria-modal="true" aria-labelledby={labelledBy} tabIndex={-1} initial={{ y: reduce ? 0 : 12, opacity:0, scale: reduce ? 1 : 0.995 }} animate={{ y:0, opacity:1, scale:1 }} exit={{ y: reduce ? 0 : 8, opacity:0, scale: reduce ? 1 : 0.995 }} transition={transition} className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full p-4">
            <button type="button" onClick={onClose} className="absolute right-3 top-3 text-gray-500" aria-label="Close modal">Close</button>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
