import { useEffect, useRef } from 'react'

// Pointer-driven 3D tilt with a soft glare and inner parallax.
// Only runs on devices that can hover, and never if the user prefers reduced motion.
const canTilt = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches

export default function Tilt({ as: Tag = 'div', max = 8, className = '', children, ...rest }) {
  const ref = useRef(null)
  const raf = useRef(0)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const handleMove = (event) => {
    if (!canTilt()) return
    const { clientX, clientY } = event
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = (clientX - rect.left) / rect.width
      const y = (clientY - rect.top) / rect.height
      el.classList.add('is-active')
      el.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`)
      el.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`)
      el.style.setProperty('--px', (x - 0.5).toFixed(3))
      el.style.setProperty('--py', (y - 0.5).toFixed(3))
      el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
      el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
    })
  }

  const handleLeave = () => {
    cancelAnimationFrame(raf.current)
    const el = ref.current
    if (!el) return
    el.classList.remove('is-active')
    ;['--rx', '--ry', '--px', '--py'].forEach((name) => el.style.setProperty(name, '0'))
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <Tag
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  )
}
