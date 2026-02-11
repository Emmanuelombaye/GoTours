export const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.06 } }
}

export const item = (customIndex = 0) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: (customIndex || 0) * 0.05,
      duration: 0.48,
      ease: 'easeOut'
    }
  }
})

export const fadeDown = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.2,0.8,0.2,1] } }
}

export const modal = {
  hidden: { opacity: 0, scale: 0.995, y: 6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: [0.2,0.8,0.2,1] } }
}
